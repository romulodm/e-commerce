import React from "react";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import styled from "styled-components";
import LogoutIcon from '@mui/icons-material/Logout';

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userRedux";
import { useNavigate } from "react-router-dom"
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
    margin-bottom: 25px;
    padding: 10px;
`;

const ProfileCoverImg = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    border: 0.5px solid lightgray;
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
    top: 120px;
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

const Button = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  align-items: center;
  cursor: pointer;
`;


const Profile = () => {
    const user = useSelector((state) => state.user.currentUser);

    const name = user.json.result.Username;

    console.log(user.json.result.Username)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div>
        <Announcement />
        <Navbar />
            <Container>
                <Wrapper>
                    <ProfileSession>
                        <ProfileCover>

                            <ProfileCoverImg src="https://img.freepik.com/fotos-premium/paisagem-bonita_157744-1239.jpg" />
                            <ProfileUserImg src="https://www.arauco.cl/brasil/wp-content/uploads/sites/17/2021/08/CINZA-PURO-185x275--scaled.jpg"/>

                        </ProfileCover>
                        <ProfileInfo>
                            <ProfileInfoItens>
                                <Name>{name}</Name>
                                <Button onClick={handleLogout}><LogoutIcon style={{marginRight: '15px'}}/>Logout</Button>
                            </ProfileInfoItens>
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