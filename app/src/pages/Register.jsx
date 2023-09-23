import styled from "styled-components";
import {mobile} from "../responsive";
import { Link } from "react-router-dom"
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import CodeIcon from '@mui/icons-material/Code';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import React, { useState, useEffect } from "react";
import { registerUser, confirmationEmail, codeEmail, checkEmail } from "../axios/apiCalls";

import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";

const ContainerRegister = styled.div`
`;

const Wrapper = styled.div`
  height: 100%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: BOLD;
`;

const Image = styled.img`
  width: 25vh;
  height: 10vh;
  ${mobile({ height: "20vh" })}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  border: 0.5px solid lightgray;
  border-radius: 5px;
  justify-content: center;
  padding: 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15), -2px -2px 4px rgba(255, 255, 255, 0.15);
`;

const InputContainer = styled.form`
  height: 40px;
  border: 0.5px solid lightgray;
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  border: none;
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 5px;
  padding: 15px 20px;
  background-color: #0F71F2;
  color: white;
  cursor: pointer;
`;

const LinkContainer = styled.div`
  margin-top: 10px;
  width: 400px;
  height: 2px;
  border: 0.5px solid lightgray;
  border-radius: 5px;
  justify-content: center;
  padding: 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15), -2px -2px 4px rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  color: gray;
`;

const ConfirmationContainer = styled.div`
  display: ${props => (props.visible ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
  background-color: #ffffff;
  color: gray;
  border: 1px solid lightgray;
  border-radius: 4px;
  text-align: center;
`;

const ConfirmationMessage = styled.div`
  flex: 0.5;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  border: none;
`;

const ConfirmationButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ConfirmationButton = styled.div`
  border: none;
  height: 20px;
  width: 70px;
  padding: 7px;
  margin-bottom: 15px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
`;

function generateRandomCode() {
  let code = "";
  const possibleDigits = "0123456789";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * 10);
    const randomDigit = possibleDigits[randomIndex];
    code += randomDigit;
  }
  return code;
}

const Register = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [typePassowrd, setTypePassword] = useState("password");

  const validateRegistration = () => {
    const usernameRegex = /^[a-zA-Z\s]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!usernameRegex.test(username)) {
      setErrorMessage("O seu nome deve ter pelo menos três caracteres (sem números ou símbolos especiais).");
      setTimeout(() => { setErrorMessage("") }, 5500)
      
      return false;
    }
    if (!emailRegex.test(email)) {
      setErrorMessage("O email precisa ter pelo menos cinco caracteres e estar com a formatação correta.");
      setTimeout(() => { setErrorMessage("") }, 5500)
      
      return false;
    }
    if (password.length < 5) {
      setErrorMessage("A sua senha deve ter pelo menos cinco caracteres.");
      setTimeout(() => { setErrorMessage("") }, 5500)

      return false;
    }
    return true;
  };

  const registerButton = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (validateRegistration() && code === false) {
      const randomCode = generateRandomCode();
      setCode(randomCode);
    }
  };

  // Lógica dos códigos enviados ao e-mail:
  const [code, setCode] = useState(false);

  const [showEmailConfirmationMessage, setEmailConfirmationMessage] = useState(false); // Exibir caixa de código
  const [codeEmailConfirmation, setEmailConfirmationCode] = useState(""); // código a ser digitado

  useEffect(() => {
    testCode();
  }, [code]);

  const testCode = () => {
    if (code !== false){
      if (isLoading === false) {
        setIsLoading(true);
      }
      const testEmail = checkEmail({"email":email});

      testEmail.then(response => {
        if (response.status === 200){
          setIsLoading(false);
          codeEmail({"email":email, "code":code});
          setEmailConfirmationMessage(true);
        }
        if (response.status === 404) {
          setIsLoading(false);
          setErrorMessage("Já existe uma conta registrada com este e-mail. Insira um e-mail válido.");
          setTimeout(() => { setErrorMessage("") }, 7000)
          restartRegister()
        }
        if (response.status === 500) {
          setIsLoading(false);
          setErrorMessage("Algo de errado aconteceu com a sua tentativa de criar uma conta. Tente novamente mais tarde.");
          setTimeout(() => { setErrorMessage() }, 7000)
          restartRegister()
        }}
        ).catch(error => {
          setIsLoading(false);
          console.error(error)});
      }
  };

  function restartRegister() {
    setCode(false);
    setEmailConfirmationMessage(false);
    setEmailConfirmationCode("");
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const checkEmailConfirmation = () => {
    if (code === codeEmailConfirmation) {
      if (isLoading === false) {
        setIsLoading(true);
      }
      const tryRegister = registerUser({"username":username, "email":email, "password":password})

      tryRegister.then(response => {
        if (response.status === 201){
          setIsLoading(false);
          confirmationEmail({"username":username, "email":email})
          restartRegister()
          setSuccessMessage("Conta criada com sucesso!")
          setTimeout(() => { setSuccessMessage("") }, 5500)

        } else {
          setIsLoading(false);
          setErrorMessage("Algo de errado aconteceu com o seu cadastro, tente novamente mais tarde!");
          setTimeout(() => { setErrorMessage("") }, 7000)
          restartRegister()
        }}

      ).catch(error => {
        console.error(error)});
    }

    else {
      setErrorMessage("Infelizmente o código informado é inválido.");
      setTimeout(() => { setErrorMessage("") }, 5500)
    }
  };

  function changeTypePassword() {
    if (typePassowrd === "password") {
      setTypePassword("text")
      return true
    } else {
      setTypePassword("password")
      return true
    }
  };

  const cancelRegister = () => {
    setCode(false)
    setEmailConfirmationMessage(false);
  }

  return (  
    <ContainerRegister>
      <Wrapper>
        <Link to={`/`} style={{color: 'inherit', textDecoration: 'none'}}>
          <Image src="https://i.ibb.co/thQcBw8/image-1.png" style={{cursor: "pointer"}}/>
        </Link>
        <Title>TORNE-SE UM MEMBRO</Title>
        <Form>

          <React.Fragment>
              {successMessage !== "" && 
              <SuccessMessage Message = {successMessage} successHeight = {"6vh"} successWidth = {"100%"} marginMessage = {"0 0 15px 0"}></SuccessMessage>}
          </React.Fragment>

          <InputContainer>
            <PersonIcon style={{ color: "gray"}}/>
            <Input placeholder="Usuário"  value={username} onChange={(e) => setUsername(e.target.value)}/>
          </InputContainer>
          <InputContainer>
            <EmailIcon style={{ color: "gray"}}/>
            <Input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </InputContainer>
          <InputContainer>
            <LockIcon style={{ color: "gray"}}/>
            <Input type={typePassowrd} value={password} placeholder="Senha" onChange={(e) => setPassword(e.target.value)}/>


            <React.Fragment>
              {typePassowrd === "password" && (
                 <VisibilityIcon style={{ color: "#CECECE", marginRight: "10px", marginLeft: "10px", fontSize: "1.2em", cursor: "pointer"}} onClick={changeTypePassword}/>
              )}
            </React.Fragment>

            <React.Fragment>
              {typePassowrd === "text" && (
                 <VisibilityOffIcon style={{ color: "#CECECE", marginRight: "10px", marginLeft: "10px", fontSize: "1.2em", cursor: "pointer"}} onClick={changeTypePassword}/>
              )}
            </React.Fragment>
          </InputContainer>

          <React.Fragment>
              {errorMessage !== "" && 
              <ErrorMessage Message = {errorMessage} errorHeight = {"6vh"} errorWidth = {"100%"} marginMessage={"0px 0px 15px 0px"}></ErrorMessage>}
          </React.Fragment>

          <ConfirmationContainer visible={showEmailConfirmationMessage}>
            <ConfirmationMessage>Insira o código que foi enviado para o seu e-mail:</ConfirmationMessage>
            <InputContainer>
              <CodeIcon style={{ color: "gray"}}/>
              <Input placeholder="Código" value={codeEmailConfirmation} onChange={(e) => setEmailConfirmationCode(e.target.value)}/>
            </InputContainer>
            <ConfirmationButtons>
              <ConfirmationButton style={{backgroundColor:"lightgreen"}} onClick={checkEmailConfirmation}>Confirmar</ConfirmationButton>
              <ConfirmationButton style={{backgroundColor:"red"}}  onClick={cancelRegister}>Cancelar</ConfirmationButton>
            </ConfirmationButtons>
          </ConfirmationContainer>

          <Button onClick={registerButton}>Cadastrar-se</Button>

          <React.Fragment>
            {isLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                <CircularProgress />
              </Box>
            )}
          </React.Fragment>
        
        </Form>
        <LinkContainer>
          <Link to={`/login`} style={{color: 'inherit', textDecoration: 'none'}} >Entre na sua conta</Link>
        </LinkContainer>
      </Wrapper>
    </ContainerRegister>
  );
};

export default Register;