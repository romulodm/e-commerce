import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import PinterestIcon from '@mui/icons-material/Pinterest';
import RoomIcon from '@mui/icons-material/Room';
import TwitterIcon from '@mui/icons-material/Twitter';

import styled from "styled-components";
import { mobile } from "../responsive";
  
const Container = styled.div`
    display: flex;
    ${mobile({ flexDirection: "column" })}
`;
  
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;
  
const Logo = styled.h1``;
  
const Desc = styled.p`
    margin: 20px 0px;
`;
  
const SocialContainer = styled.div`
    display: flex;
`;
  
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
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
  
const Payment = styled.img`
      width: 50%;
`;
  
const Footer = () => {
    return (
      <Container>
        <Left>
          <Logo>REP</Logo>
          <Desc>
            This site was created by FURG students, without commercial intentions. 
            We put into practice concepts obtained in the classes and also try to extend them to create this e-commerce.
          </Desc>
          <SocialContainer>
            <SocialIcon color="000000">
              <FacebookIcon />
            </SocialIcon>
            <SocialIcon color="000000">
              <InstagramIcon />
            </SocialIcon>
            <SocialIcon color="000000">
              <TwitterIcon />
            </SocialIcon>
            <SocialIcon color="000000">
              <PinterestIcon />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Man Fashion</ListItem>
            <ListItem>Woman Fashion</ListItem>
            <ListItem>Accessories</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Terms</ListItem>
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
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>
      </Container>
    );
};
  
export default Footer;