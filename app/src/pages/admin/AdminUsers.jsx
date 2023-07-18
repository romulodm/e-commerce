import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";

import styled from "styled-components";
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import React, { useEffect, useState } from 'react';

import { DataGrid,  GridColDef, GridToolbar } from "@mui/x-data-grid";

import { getUsers } from "../../axios/apiCalls";
import AddUser from "../../components/admin/AddUsers";
import DataTable from "../../components/admin/DataTable";

const Wrapper = styled.div`
    display: flex;
    felx-direction: row;
`;

const Container = styled.div`
    flex: 5;
`;

const UsersContainer = styled.div`
    display: flex;
    margin: 5vh 5vh;
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

const Info = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
`;

const InfoButton = styled.button`
    width: 12vh;
    height: 4vh;
    border: none;
    display: flex;
    border-radius: 5px;
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
    gap: 20px;
`;

const ActionButton = styled.div`
    width: 14vh;
    height: 4vh;
    border: none;
    display: flex;
    margin: 10px 0px;
    border-radius: 5px;
    align-items: center;
    cursor: pointer;
`;

const ActionTitle = styled.div`
`;

const ActionIcon = styled.div`
    padding: 15px;
    border-radius: 10px;
    align-content: center;
    cursor: pointer;
`;



const empList = [
    { id: 1, username: "Neeraj", email: 'neeraj@gmail.com', isAdmin: 1, createdAt:"teste"},
    { id: 2, username: "Raj", email: 'raj@gmail.com', isAdmin: 0, createdAt:"teste"},
    { id: 3, username: "David", email: 'david342@gmail.com', isAdmin: 0, createdAt:"teste"},
    { id: 4, username: "Vikas", email: 'vikas75@gmail.com', isAdmin: 0, createdAt:"teste"},
  ];

const AdminUsers = () => {

  const [data, setData] = useState(empList)

  const actionColumn = [
    {
        field: "action",
        headerName: "Action",
        width: 350,
        renderCell: (params) => {
        return (
            <Action>
                <ActionButton style={{ backgroundColor: "#d7f8d9"}}>
                    <ActionIcon>
                        <EditOutlinedIcon style={{color: "green" }}/>
                    </ActionIcon>
                    <ActionTitle>Edit</ActionTitle>
                </ActionButton>

                <ActionButton style={{ backgroundColor: "#f8d7da"}}>
                    <ActionIcon>
                        <DeleteOutlineOutlinedIcon style={{color: "red" }}/>
                    </ActionIcon>
                    <ActionTitle>Delete</ActionTitle>
                </ActionButton>
            </Action>
        );
        },
},];

  const columns = [
    { field: "id", headerName: "ID", editable: false, width: 80 },
    {
        field: "img",
        headerName: "Avatar",
        width: 100,
        renderCell: (params) => {
          return <UserImage src={params.row.img || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"} alt="" />;
        },
      },
    { field: "username", headerName: "Username",width: 170 },
    { field: "email", headerName: "E-mail", width: 250 },
    { field: "isAdmin", headerName: 'Admin', width: 120 },
    { field: "createdAt", headerName: "Created At", width: 220 }
  ]

    const [open, setOpen] = useState(false);
    
    const [users, setUsers] = useState(false);

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
    
        fetchUsers();
    }, []);


  return (
    <Wrapper>
    <Sidebar />
        <Container>
        <Navbar />
            <UsersContainer>
                <UsersGrid>
                    <Info>
                        <h1>Users</h1>
                        <InfoButton onClick={() => setOpen(true)}><AddIcon/>New User</InfoButton>
                    </Info>

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
            {open && <AddUser setOpen={setOpen} />}
        </Container>
    </Wrapper>
  );
}

export default AdminUsers;