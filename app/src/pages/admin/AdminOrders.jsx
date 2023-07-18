import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import Widgets from "../../components/admin/Widgets";

import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
`;

const OrdersContainer = styled.div`
    flex: 5;
`;

const AdminOrders = () => {
  return (
    <Wrapper>
        <Sidebar />
        <OrdersContainer>
            <Navbar />
            <Widgets />
        </OrdersContainer>
    </Wrapper>
  );
};

export default AdminOrders;