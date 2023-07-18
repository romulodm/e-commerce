import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import Widgets from "../../components/admin/Widgets";

import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
`;

const ProductsContainer = styled.div`
    flex: 5;
`;

const AdminProducts = () => {
  return (
    <Wrapper>
        <Sidebar />
        <Navbar />
        <ProductsContainer>
            <Navbar />
            <Widgets />
        </ProductsContainer>
    </Wrapper>
  );
};

export default AdminProducts;