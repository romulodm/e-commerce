import styled from "styled-components";
import {mobile} from "../responsive";
import { Link } from "react-router-dom"
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import React from "react";




const ContainerLogin = styled.div`

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


const Login = () => {
  return ( 
    <ContainerLogin>
      <Wrapper>
        <Link to={`/`} style={{color: 'inherit', textDecoration: 'none'}}>
          <Image src="https://i.ibb.co/thQcBw8/image-1.png" style={{cursor: "pointer"}}/>
        </Link>
        <Title>SUA CONTA PARA TUDO NA REP</Title>
        <Form>

          <InputContainer>
            <PersonIcon style={{ color: "gray"}}/>
            <Input placeholder="E-mail" />
          </InputContainer>
          <InputContainer>
            <LockIcon style={{ color: "gray"}}/>
            <Input type='password' placeholder="Senha" />
          </InputContainer>

          <Button>Entrar</Button>
        
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