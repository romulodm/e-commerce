import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import Widgets from "../../components/admin/Widgets";

import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
`;

const HomeContainer = styled.div`
    flex: 6;
`;

const AdminHome = () => {
  return (
    <Wrapper>
        <Sidebar />
        <HomeContainer>
            <Navbar />
            <Widgets />
        </HomeContainer>
    </Wrapper>
  );
};

export default AdminHome;