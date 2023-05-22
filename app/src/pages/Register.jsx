import styled from "styled-components";
import {mobile} from "../responsive";
import { Link } from "react-router-dom"
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import CodeIcon from '@mui/icons-material/Code';
import React from "react";

import { useState, useEffect } from "react";
import { registerUser, confirmationEmail, codeEmail } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { setCode, resetCode, setMsg, resetMsg } from "../redux/registerRedux";

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
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showEmailConfirmationMessage, setEmailConfirmationMessage] = useState(false);
  const [codeEmailConfirmation, setEmailConfirmationCode] = useState("");
  
  const register = useSelector((state) => state.register);
  const dispatch = useDispatch();

  const validateRegistration = () => {
    const usernameRegex = /^[a-zA-Z\s]{5,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!usernameRegex.test(username)) {
      dispatch(setMsg("O seu nome deve ter pelo menos cinco caracteres (sem números ou símbolos especiais)."));
      return false;
    }
    if (!emailRegex.test(email)) {
      dispatch(setMsg("O email deve ter pelo menos cinco caracteres e estar no formato correto."));
      return false;
    }
    if (password.length < 5) {
      dispatch(setMsg("A senha deve ter pelo menos cinco caracteres."));
      return false;
    }
    return true;
  };

  useEffect(() => {
    testCode();
  }, [register.code]);

  const testCode = () => {
    if (register.code) {
      codeEmail({"email":email, "code":register.code})
      setEmailConfirmationMessage(true);
    } 
  };

  const handleClick = (e) => {
    e.preventDefault();
  
    if (validateRegistration() && !register.code) {
      console.log("to aqui")
      const randomCode = generateRandomCode();
      dispatch(setCode(randomCode));
    }
  };

  const checkEmailConfirmation = () => {
    if (register.code === codeEmailConfirmation) {
      const tryRegister = registerUser({"username":username, "email":email, "password":password})
      console.log(tryRegister)
      confirmationEmail({"name":username, "email":email})
    } 
    else {
      dispatch(setMsg("Infelizmente o código informado é inválido."))
    }
  };

  const cancelRegister = () => {
    dispatch(resetCode());
    setEmailConfirmationMessage(false)
    dispatch(resetMsg())
  }

  return (  
    <ContainerRegister>
      <Wrapper>
        <Link to={`/`} style={{color: 'inherit', textDecoration: 'none'}}>
          <Image src="https://i.ibb.co/thQcBw8/image-1.png" style={{cursor: "pointer"}}/>
        </Link>
        <Title>TORNE-SE UM MEMBRO</Title>
        <Form>

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

          <AlertContainer visible={register.showMsg}>
            <AlertMessage>{register.errorMsg}</AlertMessage>
          </AlertContainer>

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

          <Button onClick={handleClick}>Cadastrar-se</Button>
        
        </Form>
        <LinkContainer>
          <Link to={`/login`} style={{color: 'inherit', textDecoration: 'none'}} >Entre na sua conta</Link>
        </LinkContainer>
      </Wrapper>
    </ContainerRegister>
  );
};

export default Register;