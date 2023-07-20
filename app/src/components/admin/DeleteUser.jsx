import "./styles/deleteuser.scss";

import CloseIcon from '@mui/icons-material/Close';

import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setMsg, resetMsg } from "../../redux/registerRedux";

import { deleteUser } from "../../axios/apiCalls";

const DeleteUser = (prop) => {
    const register = useSelector((state) => state.register);
    const dispatch = useDispatch();
    
    const tryDeleteUser = async (e) => {
        e.preventDefault()

        const tryDelete = deleteUser(prop.user.id);
            tryDelete.then(response => {
            if (response.status === 200) {
                window.location.reload();
            } else {
                dispatch(setMsg("Algo de errado aconteceu com o seu cadastro, tente novamente mais tarde!"));
                setTimeout(() => { dispatch(resetMsg()) }, 7000);
            }
            }).catch(error => {
                dispatch(setMsg("Algo deu errado, tente novamente mais tarde!"));
                setTimeout(() => { dispatch(resetMsg()) }, 7000);});
    }

    function closeWindow() {
        prop.setOpen(false)
        prop.setSelectedUser(false)
    }

    return (
        <div className="delete">
        <div className="modal">
            <span className="close" onClick={() => closeWindow()}>
            <CloseIcon style={{ color: "gray"}}/>
            </span>
            <form className="forms">
                
                <React.Fragment>
                    {register.showMsg && (
                    <div style={{display: "flex", alignItems: "center", textAlign: "center", height: "6vh", width: "80%", backgroundColor: "#f8d7da", color: "#721c24", borderColor: "#721c24", borderRadius: "5px"}}>
                        <div style={{textAlign: "center", flex: 1}}>{register.errorMsg}</div>
                    </div>
                    )}
                </React.Fragment>

                <h3>Are you sure you want to delete this user?</h3>


                <div className="buttons">
                    <button type="submit" className="yes-button" onClick={tryDeleteUser}>Yes</button>
                    <button className="no-button" onClick={closeWindow}>No</button>
                </div>

            </form>
        </div>
        </div>
    );
};

export default DeleteUser;