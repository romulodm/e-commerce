import styled from "styled-components";
import {mobile} from "../responsive";
import { Link } from "react-router-dom"
import EmailIcon from '@mui/icons-material/Email';
import CodeIcon from '@mui/icons-material/Code';
import LockIcon from '@mui/icons-material/Lock';

import React, { useState, useEffect } from "react";

import { checkEmail, resetPasswordEmail, modifyPassword } from "../axios/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { setMsg, resetMsg, setSucess, resetSucess } from "../redux/resetPasswordRedux";

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
};

const ResetPassword = () => {

  const resetpasswordstate = useSelector((state) => state.resetpassword);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const [code, setCode] = useState(false);
  const [showResetPassword, setResetPassword] = useState(false); // Exibir caixa de código
  const [codeResetPassword, setCodeResetPassword] = useState(""); // Código a ser digitado

  const [showNewPasswordMessage, setNewPasswordMessage] = useState(false); // Exibir caixa de alteração de senha
  const [newPassword, setNewPassword] = useState(""); // Senha a a ser digitada

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      dispatch(setMsg("Insira um e-mail válido, por gentileza."));
      setTimeout(() => { dispatch(resetMsg()) }, 5500)
      return false;
    }
    return true
  };

  const resetButton = (e) => {
    e.preventDefault();
    
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
          dispatch(setMsg("Não existe contas cadastradas com este e-mail!"));
          setTimeout(() => { dispatch(resetMsg()) }, 7000)
          setEmail("")
        } else {
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
      dispatch(setMsg("O código informado não é válido!"));
      setTimeout(() => { dispatch(resetMsg()) }, 7000)
    }
  };

  const checkNewPassword = (e) => {
    e.preventDefault();

    if (newPassword.length < 5) {
      dispatch(setMsg("A senha precisa ter pelo menos 5 caracteres."));
      setTimeout(() => { dispatch(resetMsg()) }, 5500)
      return false
    }

    const testReset = modifyPassword({ "email": email, "password":newPassword});
    testReset.then(response => {
      if (response.status === 200){
        restartResetPassword()
        dispatch(setSucess());
        setTimeout(() => { dispatch(resetSucess()) }, 5500)

        } else {
          dispatch(setMsg("Algo de errado aconteceu com a tentativa de mudança de senha, tente novamente mais tarde."));
          setTimeout(() => { dispatch(resetMsg()) }, 7000)
          restartResetPassword()
        }}
    ).catch(error => {
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

  const cancelReset = () => {
    setCode(false)
    setResetPassword(false);
    dispatch(resetMsg());
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
            {resetpasswordstate.sucess && (
              <SucessContainer>
                <SucessMessage>Sua senha foi modificada com sucesso!</SucessMessage>
              </SucessContainer>
            )}
          </React.Fragment>

          <InputContainer>
            <EmailIcon style={{ color: "gray"}}/>
            <Input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </InputContainer>

          <React.Fragment>
            {resetpasswordstate.showMsg && (
              <AlertContainer visible={resetpasswordstate.showMsg}>
                <AlertMessage>{resetpasswordstate.errorMsg}</AlertMessage>
              </AlertContainer>
            )}
          </React.Fragment>
          
          <ConfirmationContainer visible={showResetPassword}>
            <ConfirmationMessage>Insira o código que foi enviado para o seu e-mail:</ConfirmationMessage>
            <InputContainer>
              <CodeIcon style={{ color: "gray"}}/>
              <Input placeholder="Código" value={codeResetPassword} onChange={(e) => setCodeResetPassword(e.target.value)}/>
            </InputContainer>
            <ConfirmationButtons>
              <ConfirmationButton style={{backgroundColor:"lightgreen"}} onClick={checkResetCode}>Confirmar</ConfirmationButton>
              <ConfirmationButton style={{backgroundColor:"red"}}  onClick={cancelReset}>Cancelar</ConfirmationButton>
            </ConfirmationButtons>
          </ConfirmationContainer>

          <ConfirmationContainer visible={showNewPasswordMessage}>
            <ConfirmationMessage>Insira a sua nova senha desejada:</ConfirmationMessage>
            <InputContainer>
              <LockIcon style={{ color: "gray"}}/>
              <Input type='password' placeholder="Nova senha" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
            </InputContainer>
            <ConfirmationButtons>
              <ConfirmationButton style={{backgroundColor:"lightgreen"}} onClick={checkNewPassword}>Confirmar</ConfirmationButton>
              <ConfirmationButton style={{backgroundColor:"red"}}  onClick={cancelReset}>Cancelar</ConfirmationButton>
            </ConfirmationButtons>
          </ConfirmationContainer>

          <Button onClick={resetButton}>Enviar</Button>
        
        </Form>
        <LinkContainer>
          <Link to={`/login`} style={{color: 'inherit', textDecoration: 'none'}} >Voltar</Link>
        </LinkContainer>
      </Wrapper>
    </ResetContainer>
  );
};

export default ResetPassword;