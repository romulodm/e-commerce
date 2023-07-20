import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";

import styled from "styled-components";
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import React, { useEffect, useState } from 'react';

import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { getUsers } from "../../axios/apiCalls";
import AddUser from "../../components/admin/AddUsers";
import EditUser from "../../components/admin/EditUSer";
import DeleteUser from "../../components/admin/DeleteUser";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
    display: flex;
    felx-direction: row;
`;

const Container = styled.div`
    flex: 5;
`;

const UsersContainer = styled.div`
    display: flex;
    margin: 20px 20px;
`;

const UsersGrid = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    flex: 1;
    padding: 10px;
    border: 0.5px solid lightgray;
    border-radius: 5px;
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
    border-radius: 10px;
`;

const TopButtons = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
`;

const TopButton = styled.button`
    width: 20vh;
    height: 5vh;
    border: none;
    display: flex;
    border-radius: 5px;
    justify-content: center;
    padding: 1vh;
    align-items: center;
    background-color: teal;
    color: white;
    cursor: pointer;
`;

const Table = styled.div`
`;

const UserImage = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
`;

const Action = styled.div`
    display: flex;
    align-items: center;
    font-size: 12px;
    
`;

const ActionButton = styled.div`
    width: 90px;
    height: 4vh;
    border: none;
    display: flex;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-right: 7px;
`;

const ActionTitle = styled.div`
    margin-left: 5px;
`;

const ActionIcon = styled.div`
  
`;


const AdminUsers = () => {

  const actionColumn = [
    {
        field: "action",
        headerName: "Action",
        width: 207,
        renderCell: (params) => {
        return (
            <Action>
                <ActionButton style={{ backgroundColor: "#d7f8d9"}} onClick={() => editUser(params.row.id)} >
                    <ActionIcon>
                        <EditOutlinedIcon style={{color: "green", fontSize: "20px" }}/>
                    </ActionIcon>
                    <ActionTitle>Edit</ActionTitle>
                </ActionButton>

                <ActionButton style={{ backgroundColor: "#f8d7da"}} onClick={() => deleteUser((params.row.id))}>
                    <ActionIcon>
                        <DeleteOutlineOutlinedIcon style={{color: "red", fontSize: "20px" }}/>
                    </ActionIcon>
                    <ActionTitle>Delete</ActionTitle>
                </ActionButton>
            </Action>
        );
        },
},];

  const columns = [
    { field: "id", headerName: "ID", editable: false, width: 30 },
    {
        field: "img",
        headerName: "Avatar",
        width: 100,
        renderCell: (params) => {
          return <UserImage src={params.row.img || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"} alt="" />;
        },
      },
    { field: "username", headerName: "Username",width: 130 },
    { field: "email", headerName: "E-mail", width: 200 },
    { field: "isAdmin", headerName: 'Admin', width: 100 },
    { field: "createdAt", headerName: "Created At", width: 200 }
  ]

    const adminLogged = useSelector((state) => state.user.currentUser);

    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    
    const [users, setUsers] = useState(false);
    const [selectedUser, setSelectedUser] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const req = getUsers();
            req.then(response => {
                const usersData = response.data;
                setUsers(usersData);
              }).catch(error => {
                console.log(error)
              });
          } catch (error) {
            console.log(error);
          }
        };

        if (!users){
          fetchUsers();
        }

    }, []);


    function editUser (userId) {
      setSelectedUser(users.find(user => user.id === userId))
      setOpenEdit(true)
    };

    function deleteUser (userId) {
      console.log(userId, adminLogged.id)
      if (userId !== adminLogged.id) {
        setSelectedUser(users.find(user => user.id === userId))
        setOpenDelete(true)
      } else {
        console.log("Você não pode se deletar, amigão!")
      }
    }; 

  return (
    <Wrapper>
    <Sidebar />
        <Container>
        <Navbar />
            <UsersContainer>
                <UsersGrid>
                  
                    <h1>Users Table</h1>

                    <TopButtons>
                        <TopButton onClick={() => setOpenAdd(true)}><AddIcon/>New User</TopButton>
                        <TopButton onClick={() => window.location.reload()}><RefreshIcon/>Refresh Table</TopButton>
                    </TopButtons>

                    <Table>
                        <DataGrid className="datagrid"
                            rows={users}
                            columns={columns.concat(actionColumn)}
                            initialState={{
                                pagination: {
                                  paginationModel: {
                                    pageSize: 10,
                                  },
                                },
                              }}
                              slotProps={{
                                toolbar: {
                                  showQuickFilter: true,
                                  quickFilterProps: { debounceMs: 500 },
                                },
                              }}
                              slots={{ toolbar: GridToolbar }}
                        />
                    </Table>

            </UsersGrid>
            </UsersContainer>

            {openAdd && <AddUser setOpen={setOpenAdd}/>}
            {openEdit && <EditUser setOpen={setOpenEdit} setSelectedUser={setSelectedUser} user={selectedUser} />}
            {openDelete && <DeleteUser setOpen={setOpenDelete} setSelectedUser={setSelectedUser} user={selectedUser}/>}
        </Container>
    </Wrapper>
  );
}

export default AdminUsers;