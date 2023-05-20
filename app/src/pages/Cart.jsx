import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useSelector } from "react-redux";
import { clearCart, incrementQuantity, decrementQuantity, removeProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div`
`;

const Wrapper = styled.div`
  min-height: 600px;
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  font-size: 29px;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 59.2vh;
`;

const SummaryTitle = styled.h1`
  font-size: 29px;
  font-weight: 200;
  text-align: center;
`;

const SummaryItem = styled.div`
  
  margin-top: 35px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span`
`;

const SummaryItemPrice = styled.span`
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 8vh;
  background-color: black;
  color: white;
  font-weight: 600;
  justify-content: center;
`;

const IconsButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background-color: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`; 

const Cart = () => {

  const cart = useSelector((state) => state.cart);
  
  const dispatch = useDispatch();

  //remove all products of the cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  //add quantity
  const handleIncrement = (productId, size) => {
    dispatch(incrementQuantity({ productId, size }));
  };

  //dec quantity
  const handleDecrement = (productId, size, quantity) => {
    if (quantity === 1) {
      handleRemoveProduct(productId, size);
    } else {
      dispatch(decrementQuantity({ productId, size }));
    }
  };

  //remove product (if you drecrement product when quantity = 1)
  const handleRemoveProduct = (productId) => {
    dispatch(removeProduct({ productId }));
  };

  //att subtotal
  const subtotal = cart.products.reduce((acc, product) => {
    return acc + (product.Price * product.quantity);
  }, 0);

  const infoStyles = cart.quantity === 0
  ? { border: "0.5px solid lightgray", borderRadius: "10px", marginRight: "10px"}
  : { border: "none", marginRight: "0px" };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
      <Title>SEU CARRINHO {cart.quantity === 0 ? "ESTÁ VAZIO" : `(${cart.quantity})`}</Title>
        <Top>
          <TopButton type="filled" onClick={() => handleClearCart()}>LIMPAR CARRINHO</TopButton>
          <TopButton>CONTINUAR COMPRANDO</TopButton>
        </Top>
        <Bottom>

        <Info style={infoStyles}>
            {cart.products.map((product) => (
              <Product>
                <Link to={`/product/${product.Id}`} style={{color: 'inherit', textDecoration: 'none'}}>
                  <ProductDetail>
                    <Image src={product.Img} />
                    <Details>
                      <ProductName>
                        <b>Produto:</b> {product.Title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product.Id}
                      </ProductId>
                      <ProductSize>
                        <b>Tamanho:</b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                </Link>
                <PriceDetail>
                  <ProductAmountContainer>
                    <IconsButton onClick={() => handleDecrement(product.id, product.size, product.quantity)} >
                      <RemoveIcon />
                    </IconsButton>
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <IconsButton onClick={() => handleIncrement(product.id, product.size)} >
                      <AddIcon />
                    </IconsButton>

                  </ProductAmountContainer>
                  <ProductPrice>
                    R$ {product.Price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product> 
            ))}
          </Info>
          <Summary>
            <SummaryTitle>RESUMO DO PEDIDO</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal:</SummaryItemText>
              <SummaryItemPrice>R$ {subtotal}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Valor do frete:</SummaryItemText>
              <SummaryItemPrice>R$ 25.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Disconto do frete:</SummaryItemText>
              <SummaryItemPrice>R$ -25.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>R$ {subtotal}</SummaryItemPrice>
            </SummaryItem>

            <Button>FECHAR PEDIDO</Button>

          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;