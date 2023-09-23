import styled from "styled-components";
import {mobile} from "../responsive";
import { Link } from "react-router-dom"
import EmailIcon from '@mui/icons-material/Email';
import CodeIcon from '@mui/icons-material/Code';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import React, { useState, useEffect } from "react";

import { checkEmail, resetPasswordEmail, modifyPassword } from "../axios/apiCalls";


import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";


const ResetContainer = styled.div`
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
  //object-fit: cover;
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

const TextContainer = styled.form`
  height: 40px;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  color: #939393;
  text-align: center;
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
};

const ResetPassword = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [code, setCode] = useState(false);
  const [showResetPassword, setResetPassword] = useState(false); // Exibir caixa de código
  const [codeResetPassword, setCodeResetPassword] = useState(""); // Código a ser digitado

  const [showNewPasswordMessage, setNewPasswordMessage] = useState(false); // Exibir caixa de alteração de senha
  const [newPassword, setNewPassword] = useState(""); // Senha a a ser digitada

  const [typePassowrd, setTypePassword] = useState("password");

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsLoading(false);
      setErrorMessage("Insira um e-mail válido, por gentileza.");
      setTimeout(() => { setErrorMessage("") }, 5500)
      return false;
    }
    return true
  };

  const resetButton = (e) => {
    e.preventDefault();
    if ((showNewPasswordMessage !== false) || (showResetPassword !== false)){
      return false
    }

    setIsLoading(true);
    
    if (validateEmail() && code === false) {
      const randomCode = generateRandomCode();
      setCode(randomCode);
    }
  }

  useEffect(() => {
    testCode();
  }, [code]);


  const testCode = () => {

    if (code !== false){
      const testEmail = checkEmail({ "email": email });
        testEmail.then(response => {
        if (response.status === 200){
          setIsLoading(false);
          setErrorMessage("Não existe uma conta cadastrada com este e-mail.");
          setTimeout(() => { setErrorMessage("") }, 7000)
          setEmail("")
        } else {
          setIsLoading(false);
          resetPasswordEmail({"email":email, "code":code});
          setResetPassword(true);
        }}
        ).catch(error => {
          console.error(error)});
    }
    
  };

  const checkResetCode = () => {
    if (code === codeResetPassword) {
      setCode(false);
      setResetPassword(false);
      setCodeResetPassword("");

      setNewPasswordMessage(true)
    }
    else {
      setErrorMessage("O código informado não é válido!");
      setTimeout(() => { setErrorMessage("") }, 7000)
    }
  };

  const checkNewPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (newPassword.length < 5) {
      setErrorMessage("A senha precisa ter pelo menos 5 caracteres.");
      setTimeout(() => { setErrorMessage("") }, 5500)
      setIsLoading(false);
      return false
    }

    const testReset = modifyPassword({ "email": email, "password":newPassword});
    testReset.then(response => {
      if (response.status === 200){
        setIsLoading(false);
        restartResetPassword()
        setSuccessMessage("Senha resetada com sucesso!")
        setTimeout(() => { setSuccessMessage("") }, 5500)

        } else {
          setIsLoading(false);
          setErrorMessage("Algo de errado aconteceu com a tentativa de mudança de senha, tente novamente mais tarde.");
          setTimeout(() => { setErrorMessage("") }, 7000)
          restartResetPassword()
        }}
    ).catch(error => {
      setIsLoading(false);
      console.error(error);
    });

  };

  function restartResetPassword() {
    setCode(false);
    setResetPassword(false);
    setCodeResetPassword("");
    setEmail("");
    setNewPasswordMessage(false)
    setNewPassword("")
  };

  function changeTypePassword() {
    if (typePassowrd == "password") {
      setTypePassword("text")
      return true
    } else {
      setTypePassword("password")
      return true
    }
  };

  const cancelReset = () => {
    setCode(false);
    setResetPassword(false);
    setNewPassword("");
    setNewPasswordMessage(false);
  }

  return ( 
    <ResetContainer>
      <Wrapper>
        <Link to={`/`} style={{color: 'inherit', textDecoration: 'none'}}>
          <Image src="https://i.ibb.co/thQcBw8/image-1.png" style={{cursor: "pointer"}}/>
        </Link>
        <Title>ESQUECEU A SUA SENHA?</Title>
        <Form>

          <TextContainer>
            Insira o seu endereço de e-mail para receber uma mensagem com as informações necessárias para a redefinição de sua senha.
          </TextContainer>

          <React.Fragment>
            {successMessage !== "" && 
            <SuccessMessage Message = {successMessage} successHeight = {"6vh"} successWidth = {"100%"} marginMessage = {"0 0 15px 0"}></SuccessMessage>}
          </React.Fragment>

          <InputContainer>
            <EmailIcon style={{ color: "gray"}}/>
            <Input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </InputContainer>

          <React.Fragment>
              {errorMessage !== "" && 
              <ErrorMessage Message = {errorMessage} errorHeight = {"6vh"} errorWidth = {"100%"} marginMessage={"0px 0px 15px 0px"}></ErrorMessage>}
          </React.Fragment>
          
          <ConfirmationContainer visible={showResetPassword}>
            <ConfirmationMessage>Insira o código que foi enviado para o seu e-mail:</ConfirmationMessage>
            <InputContainer>
              <CodeIcon style={{ color: "gray"}}/>
              <Input placeholder="Código" value={codeResetPassword} onChange={(e) => setCodeResetPassword(e.target.value)}/>
            </InputContainer>
            <ConfirmationButtons>
              <ConfirmationButton style={{backgroundColor:"green"}} onClick={checkResetCode}>Confirmar</ConfirmationButton>
              <ConfirmationButton style={{backgroundColor:"red"}}  onClick={cancelReset}>Cancelar</ConfirmationButton>
            </ConfirmationButtons>
          </ConfirmationContainer>

          <ConfirmationContainer visible={showNewPasswordMessage}>
            <ConfirmationMessage>Insira a sua nova senha desejada:</ConfirmationMessage>
            <InputContainer>
              <LockIcon style={{ color: "gray"}}/>
              <Input type={typePassowrd} placeholder="Nova senha" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>

              <React.Fragment>
                {typePassowrd == "password" && (
                  <VisibilityIcon style={{ color: "#CECECE", marginRight: "10px", marginLeft: "10px", fontSize: "1.2em", cursor: "pointer"}} onClick={changeTypePassword}/>
                )}
              </React.Fragment>

              <React.Fragment>
                {typePassowrd == "text" && (
                  <VisibilityOffIcon style={{ color: "#CECECE", marginRight: "10px", marginLeft: "10px", fontSize: "1.2em", cursor: "pointer"}} onClick={changeTypePassword}/>
                )}
              </React.Fragment>


            </InputContainer>
            <ConfirmationButtons>
              <ConfirmationButton style={{backgroundColor:"green"}} onClick={checkNewPassword}>Confirmar</ConfirmationButton>
              <ConfirmationButton style={{backgroundColor:"red"}}  onClick={cancelReset}>Cancelar</ConfirmationButton>
            </ConfirmationButtons>
          </ConfirmationContainer>

          <Button onClick={resetButton}>Enviar</Button>

          <React.Fragment>
            {isLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                <CircularProgress />
              </Box>
            )}
          </React.Fragment>
        
        </Form>
        <LinkContainer>
          <Link to={`/login`} style={{color: 'inherit', textDecoration: 'none'}} >Voltar</Link>
        </LinkContainer>
      </Wrapper>
    </ResetContainer>
  );
};

export default ResetPassword;