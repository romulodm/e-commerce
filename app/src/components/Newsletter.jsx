import SendIcon from '@mui/icons-material/Send';
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 30vh;
  background-color: #EDE734;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Desc = styled.div`
  font-size: 28px;
  margin-bottom: 20px;
  font-weight: bold;
  ${mobile({ textAlign: "center" })}

`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 0.5;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 100%;
  background-color: transparent;
`;

const Newsletter = () => {
  return (
    <Container>
      <Desc>ENTRE PARA O CLUBE E FIQUE POR DENTRO DAS NOVIDADES:</Desc>
      <InputContainer>
        <Input placeholder="Seu email" />
        <Button>
          <SendIcon style={{ color: "#000000", cursor: "pointer"}}/>
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;