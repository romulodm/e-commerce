import React from "react";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import styled from "styled-components";

import LogoutIcon from '@mui/icons-material/Logout';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import InventoryIcon from '@mui/icons-material/Inventory';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userRedux";

const Container = styled.div`
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const ProfileSession = styled.div`
    border: 0.5px solid lightgray;
    border-radius: 10px;
    width: 130vh;
    margin-bottom: 50px;
    margin-top: 30px;
`;

const ProfileCover = styled.div`
    position: relative;
    margin-bottom: 120px;
    padding: 10px;
`;

const ProfileUserImg = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 10px;
    border: 3px solid white;
`;

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
    padding: 10px;
`;

const ProfileInfoItens = styled.div`
    font-size: 24px;
`;

const Name = styled.h1`
  font-weight: 300;
  font-size: 29px;
  text-align: center;
`;

const Suport = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const SuportItem = styled.div`
    flex: 1;
    margin: 3vh 3vh;
    width: 12vh;
    height: 12vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000000;
    position: relative;
    border-radius: 5px;
`; 

const ItemInfo = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer
`;

const ItemIcon = styled.div`
`;

const ItemName = styled.div`
    color: white;
    font-weight: 300;
    font-size: 1.8vh;
    text-align: center;
    margin-top: 5px;
`;

const Button = styled.button`
  width: 20vh;
  height: 40px;
  border: none;
  display: flex;
  justify-content: center;
  border-radius: 5px;
  padding: 1vh 1vh;
  background-color: #800000;
  color: white;
  align-items: center;
  cursor: pointer;
  margin-top: 3vh;
`;


const Profile = () => {
    const user = useSelector((state) => state.user.currentUser);

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div>
        <Announcement />
        <Navbar />
        <Container>
        <Wrapper>
            <ProfileSession>
                <ProfileCover>


                    <ProfileUserImg src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"/>

                </ProfileCover>
                <ProfileInfo>
                    <ProfileInfoItens>
                        <Name>{user.username}</Name>
                    </ProfileInfoItens>
                    <Suport>
                        <SuportItem>
                            <ItemInfo>
                                <ItemIcon><AssignmentIndOutlinedIcon style={{color: 'white', fontSize: '6vh'}}/></ItemIcon>
                                <ItemName>Informações</ItemName>
                            </ItemInfo>
                        </SuportItem>
                        <SuportItem>
                            <ItemInfo>
                                <ItemIcon><InventoryIcon style={{color: 'white', fontSize: '6vh'}}/></ItemIcon>
                                <ItemName>Pedidos</ItemName>
                            </ItemInfo>
                        </SuportItem>
                        <SuportItem>
                            <ItemInfo>
                                <ItemIcon><SupportAgentIcon style={{color: 'white', fontSize: '6vh'}}/></ItemIcon>
                                <ItemName>Suporte</ItemName>
                            </ItemInfo>
                        </SuportItem>
                        <SuportItem>
                            <ItemInfo>
                                <ItemIcon><LoyaltyIcon style={{color: 'white', fontSize: '6vh'}}/></ItemIcon>
                                <ItemName>Cupons</ItemName>
                            </ItemInfo>
                        </SuportItem>
                        <React.Fragment>
                            {user.isAdmin === true && (
                            <Link to={`/admin`} style={{color: 'inherit', textDecoration: 'none'}}>
                                <SuportItem style={{ color: 'teal' }}>
                                    <ItemInfo>
                                        <ItemIcon><AdminPanelSettingsIcon style={{color: 'white', fontSize: '6vh'}}/></ItemIcon>
                                        <ItemName>Admin</ItemName>     
                                    </ItemInfo>
                                </SuportItem>
                            </Link>
                            )}
                        </React.Fragment>

                    </Suport>

                        <Button onClick={handleLogout}><LogoutIcon style={{marginRight: '15px'}}/>Sair</Button>
                </ProfileInfo>
            </ProfileSession>
        </Wrapper>
        </Container>
        <Newsletter />
        <Footer />
        </div>
    );
};

export default Profile;