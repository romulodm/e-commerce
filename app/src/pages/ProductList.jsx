import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Title> </Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filtrar Produtos:</FilterText>
          <Select>
            <Option disabled selected>
              Tamanho
            </Option>
            <Option>37</Option>
            <Option>38</Option>
            <Option>39</Option>
            <Option>40</Option>
            <Option>41</Option>
            <Option>42</Option>
            <Option>43</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Ordenar Produtos:</FilterText>
          <Select>
            <Option>Preço (crescente)</Option>
            <Option>Preço (decrescente)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;