import styled from "styled-components";
import {mobile} from "../responsive";
import { Link } from "react-router-dom"
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import CodeIcon from '@mui/icons-material/Code';

import React, { useState, useEffect } from "react";
import { registerUser, confirmationEmail, codeEmail, checkEmail } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { setMsg, resetMsg, setSucess, resetSucess } from "../redux/registerRedux";

const ContainerRegister = styled.div`

`;

const Wrapper = styled.div`
  height: 500px;
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
  background-color: teal;
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

const AlertContainer = styled.div`
  display: ${props => (props.visible ? "flex" : "none")};
  align-items: center;
  margin-bottom: 15px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  margin-bottom: 15px;
  height: 50px;
  text-align: center;
`;

const AlertMessage = styled.div`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  border: none;
`;

const SucessContainer =  styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
  background-color: #d7f8d9;
  color: #2a791a;
  border: 1px solid #acffa8;
  border-radius: 4px;
  margin-bottom: 15px;
  height: 50px;
  text-align: center;
`;

const SucessMessage = styled.div`
      flex: 1;
      min-width: 40%;
      margin: 10px 0;
      padding: 10px;
      border: none;
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
  const register = useSelector((state) => state.register);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateRegistration = () => {
    const usernameRegex = /^[a-zA-Z\s]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!usernameRegex.test(username)) {
      dispatch(setMsg("O seu nome deve ter pelo menos três caracteres (sem números ou símbolos especiais)."));
      setTimeout(() => { dispatch(resetMsg()) }, 5500)

      return false;
    }
    if (!emailRegex.test(email)) {
      dispatch(setMsg("O email precisa ter pelo menos cinco caracteres e estar com a formatação correta."));
      setTimeout(() => { dispatch(resetMsg()) }, 5500)

      return false;
    }
    if (password.length < 5) {
      dispatch(setMsg("A sua senha deve ter pelo menos cinco caracteres."));
      setTimeout(() => { dispatch(resetMsg()) }, 5500)

      return false;
    }
    return true;
  };

  const registerButton = (e) => {
    e.preventDefault();
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
    if (code != false){
      const testEmail = checkEmail({"email":email});

      testEmail.then(response => {
        if (response.status === 200){
          codeEmail({"email":email, "code":code});
          setEmailConfirmationMessage(true);
        } else {
          dispatch(setMsg("Já existe uma conta registrada com este e-mail. Por gentileza, insira um e-mail válido!"));
          setTimeout(() => { dispatch(resetMsg()) }, 7000)
          restartRegister()
        }}
        ).catch(error => {
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
      const tryRegister = registerUser({"username":username, "email":email, "password":password})

      tryRegister.then(response => {
        if (response.status === 201){
          confirmationEmail({"username":username, "email":email})
          restartRegister()
          dispatch(setSucess());
          setTimeout(() => { dispatch(resetSucess()) }, 5500)

        } else {
          dispatch(setMsg("Algo de errado aconteceu com o seu cadastro, tente novamente mais tarde!"));
          setTimeout(() => { dispatch(resetMsg()) }, 7000)
          restartRegister()
        }}

      ).catch(error => {
        console.error(error)});
    }

    else {
      dispatch(setMsg("Infelizmente o código informado é inválido."));
      setTimeout(() => { dispatch(resetMsg()) }, 5500)
    }
  };

  const cancelRegister = () => {
    setCode(false)
    setEmailConfirmationMessage(false);
    dispatch(resetMsg());
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
            {register.sucess && (
              <SucessContainer>
                <SucessMessage>Sua conta foi criada com sucesso!</SucessMessage>
              </SucessContainer>
            )}
          </React.Fragment>

          <InputContainer>
            <PersonIcon style={{ color: "gray"}}/>
            <Input placeholder="Nome" onChange={(e) => setUsername(e.target.value)}/>
          </InputContainer>
          <InputContainer>
            <EmailIcon style={{ color: "gray"}}/>
            <Input placeholder="E-mail" onChange={(e) => setEmail(e.target.value)}/>
          </InputContainer>
          <InputContainer>
            <LockIcon style={{ color: "gray"}}/>
            <Input type='password' placeholder="Senha" onChange={(e) => setPassword(e.target.value)}/>
          </InputContainer>

          <React.Fragment>
            {register.showMsg && (
              <AlertContainer visible={register.showMsg}>
                <AlertMessage>{register.errorMsg}</AlertMessage>
              </AlertContainer>
            )}
          </React.Fragment>

          <ConfirmationContainer visible={showEmailConfirmationMessage}>
            <ConfirmationMessage>Insira o código que foi enviado para o seu e-mail:</ConfirmationMessage>
            <InputContainer>
              <CodeIcon style={{ color: "gray"}}/>
              <Input placeholder="Código" onChange={(e) => setEmailConfirmationCode(e.target.value)}/>
            </InputContainer>
            <ConfirmationButtons>
              <ConfirmationButton style={{backgroundColor:"lightgreen"}} onClick={checkEmailConfirmation}>Confirmar</ConfirmationButton>
              <ConfirmationButton style={{backgroundColor:"red"}}  onClick={cancelRegister}>Cancelar</ConfirmationButton>
            </ConfirmationButtons>
          </ConfirmationContainer>

          <Button onClick={registerButton}>Cadastrar-se</Button>
        
        </Form>
        <LinkContainer>
          <Link to={`/login`} style={{color: 'inherit', textDecoration: 'none'}} >Entre na sua conta</Link>
        </LinkContainer>
      </Wrapper>
    </ContainerRegister>
  );
};

export default Register;