import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import RoomIcon from '@mui/icons-material/Room';
import TwitterIcon from '@mui/icons-material/Twitter';

import styled from "styled-components";
import { mobile } from "../responsive";
  
const Container = styled.div`
    background-color: #000000;
    color: white;
    display: flex;
    ${mobile({ flexDirection: "column" })}
`;

const Termos = styled.div`
  background-color:#282C31;
  height: 200px;
`

const Left = styled.div`
    flex: 0.7;
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin-left: 40px;
`;
  
const Logo = styled.h1`
`;
 
const SocialContainer = styled.div`
    display: flex;
`;
  
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: left;
    margin-right: 10px;
    cursor: pointer;
`;
  
const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ display: "none" })}
`;
  
const Title = styled.h3`
    margin-bottom: 30px;
`;
  
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;
  
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`;
  
const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ backgroundColor: "#fff8f8" })}
  
`;
  
const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`;
  
const Footer = () => {
    return (
      <Container>
        <Left>
          <Logo>REP Co.</Logo>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Man Fashion</ListItem>
            <ListItem>Woman Fashion</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Terms</ListItem>
            <ListItem>Suport</ListItem>
            <ListItem>Help</ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <RoomIcon style={{marginRight:"10px"}}/> Av. Itália, KM 08, Carreiros, Rio Grande - RS
          </ContactItem>
          <ContactItem>
            <LocalPhoneOutlinedIcon style={{marginRight:"10px"}}/> +55 99624-4800
          </ContactItem>
          <ContactItem>
            <EmailOutlinedIcon style={{marginRight:"10px"}} /> demoraes.romulo@furg.br
          </ContactItem>
          <ContactItem>
            <SocialContainer>
              <SocialIcon>
                <FacebookIcon style={{ color: "#ffffff"}}/>
              </SocialIcon>
              <SocialIcon>
                <InstagramIcon style={{ color: "#ffffff"}}/>
              </SocialIcon>
              <SocialIcon>
                <TwitterIcon style={{ color: "#ffffff"}}/>
              </SocialIcon>
              <SocialIcon>
                <GitHubIcon style={{ color: "#ffffff"}}/>
              </SocialIcon>
            </SocialContainer>
          </ContactItem>
        </Right>
      </Container>
    );
};
  
export default Footer;