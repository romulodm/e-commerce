import styled from "styled-components";
import {mobile} from "../responsive";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React from "react";

import { useState } from "react";
import { login, checkEmail } from "../axios/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { setMessage, resetMessage } from "../redux/messagesRedux";
import { loginSuccess } from "../redux/userRedux";


const ContainerLogin = styled.div`

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
  align-items: center;
  margin-bottom: 15px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
`;

const AlertMessage = styled.div`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  border: none;
  `;
  
  const Login = () => {
    const messages = useSelector((state) => state.messages);
    const dispatch = useDispatch();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [typePassowrd, setTypePassword] = useState("password");

    const loginButton = (e) => {
      e.preventDefault();
    
      if (checkInputs() === false) {
        return false
      }
    
      const testEmail = checkEmail({ "email": email });
    
      testEmail
        .then(response => {
          if (response.status === 200) {
            dispatch(setMessage("Não existe nenhuma conta cadastrada com este e-mail."));
            setTimeout(() => { dispatch(resetMessage()) }, 7000);
            restartLogin();
          } else {
            tryLogin();
          }
        })
        .catch(error => {
          dispatch(setMessage("Algo deu errado, tente novamente mais tarde."));
          setTimeout(() => { dispatch(resetMessage()) }, 7000);
        });
    };
    
    function tryLogin() {
      login({ "email": email, "password": password })
        .then(response => {
          if (response.status === 200) {
            dispatch(loginSuccess(response.data));
          }
          if (response.status === 201) {
            dispatch(setMessage("Credenciais inválidas."));
            setTimeout(() => { dispatch(resetMessage()) }, 5000);
          } 
          if (response.status === 500) {
            dispatch(setMessage("Algo de errado aconteceu com a sua tentativa de login, tente novamente mais tarde."));
            setTimeout(() => { dispatch(resetMessage()) }, 7000);
          }
        })
        .catch(error => {
          dispatch(setMessage("Algo deu errado, tente novamente mais tarde."));
          setTimeout(() => { dispatch(resetMessage()) }, 7000);
        });
    };
    
  function checkInputs() {
    if (email.length < 5) {
      dispatch(setMessage("Por gentileza, preencha os campos do login corretamente."));
      setTimeout(() => { dispatch(resetMessage()) }, 5500)

      return false;
    }
    return true
  }

  function changeTypePassword() {
    if (typePassowrd === "password") {
      setTypePassword("text")
      return true
    } else {
      setTypePassword("password")
      return true
    }
  };

  function restartLogin() {
    setEmail("");
    setPassword("");
  };

  return ( 
    <ContainerLogin>
      <Wrapper>
        <Link to={`/`} style={{color: 'inherit', textDecoration: 'none'}}>
          <Image src="https://i.ibb.co/thQcBw8/image-1.png" style={{cursor: "pointer"}}/>
        </Link>
        <Title>SUA CONTA PARA TUDO NA REP</Title>
        <Form>

          <InputContainer>
            <EmailIcon style={{ color: "gray"}}/>
            <Input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </InputContainer>

          <InputContainer>
            <LockIcon style={{ color: "gray"}}/>
            <Input type={typePassowrd} placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
            
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
            {messages.showMessage && (
              <AlertContainer visible={messages.showMessage}>
                <AlertMessage>{messages.errorMessage}</AlertMessage>
              </AlertContainer>
            )}
          </React.Fragment>
          
          <Button onClick={loginButton}>Entrar</Button>
        
        </Form>
        <LinkContainer>
          <Link to={`/reset-password`} style={{color: 'inherit', textDecoration: 'none'}}>Recupere sua senha</Link>
        </LinkContainer>
        <LinkContainer>
          <Link to={`/register`} style={{color: 'inherit', textDecoration: 'none'}} >Crie uma conta</Link>
        </LinkContainer>
      </Wrapper>
    </ContainerLogin>
  );
};

export default Login;