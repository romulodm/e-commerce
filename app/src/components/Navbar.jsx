import { Badge } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 90px;
  ${mobile({ height: "50px" })}
`;

const ContainerCategory = styled.div`
  display: flex;
  align-items: center;
  ${mobile({ height: "50px" })}
`;

const Categories = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CategoryItem = styled.div`
  cursor: pointer;
  align-items: center;
  padding-right: 23px;
  &:hover {
      //color: #1976D2;
      color: #A67C00;
    }
`

const Wrapper = styled.div`
  height: 90%;
  padding: 10px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 0.37;
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  ${mobile({ display: "none" })}
`;

const Image = styled.img`
  width: 55%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  border-radius: 15px;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  background-attachment: #e7e6e6;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 15px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
            <ImageContainer>
              <Link to={`/`} style={{color: 'inherit', textDecoration: 'none'}}>
                <Image src="https://i.ibb.co/thQcBw8/image-1.png" style={{cursor: "pointer"}}/>
              </Link>   
            </ImageContainer>
        </Left>
        <Center>
        <ContainerCategory>
          <Categories>
            <Link to={`/products/ofertas`} style={{color: 'inherit', textDecoration: 'none'}}>
              <CategoryItem>Ofertas</CategoryItem>
            </Link>

            <Link to={`/products/feminino`} style={{color: 'inherit', textDecoration: 'none'}}>
              <CategoryItem>Feminino</CategoryItem>
            </Link>

            <Link to={`/products/Masculino`} style={{color: 'inherit', textDecoration: 'none'}}>
              <CategoryItem>Masculino</CategoryItem>
            </Link>
            
            <Link to={`/products/infantil`} style={{color: 'inherit', textDecoration: 'none'}}>
              <CategoryItem>Infantil</CategoryItem>
            </Link>

            <Link to={`/products/adidas`} style={{color: 'inherit', textDecoration: 'none'}}>
              <CategoryItem>Adidas</CategoryItem>
            </Link> 

            <Link to={`/products/nike`} style={{color: 'inherit', textDecoration: 'none'}}>
              <CategoryItem>Nike</CategoryItem>
            </Link>

            <Link to={`/products/puma`} style={{color: 'inherit', textDecoration: 'none'}}>
              <CategoryItem>Puma</CategoryItem>
            </Link>
          </Categories>
      </ContainerCategory>
        </Center>
        <Right>
          <SearchContainer>
            <Input placeholder="Buscar" />
            <SearchIcon style={{ color: "black", fontSize: 16 }} />
          </SearchContainer>
          <MenuItem>
            <Link to={`/login`} style={{color: 'inherit'}}>
              <AccountCircleOutlinedIcon />
            </Link>
          </MenuItem>
          <MenuItem><FavoriteBorderOutlinedIcon/></MenuItem>
          <MenuItem>
            <Badge badgeContent={0} color="primary">
              <Link to={`/cart`} style={{color: 'inherit'}}>
                <ShoppingCartOutlinedIcon/>
              </Link>
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;