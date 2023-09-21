import "./styles/deleteuser.scss";

import CloseIcon from '@mui/icons-material/Close';

import React, { useState } from "react";

import { deleteUser } from "../../axios/apiCalls";

import ErrorMessage from "../ErrorMessage";

const DeleteUser = (prop) => {
    const [errorMessage, setErrorMessage] = useState("");
    
    const tryDeleteUser = async (e) => {
        e.preventDefault()

        const tryDelete = deleteUser(prop.user.id);
            tryDelete.then(response => {
            if (response.status === 200) {
                window.location.reload();
            } else {
                setErrorMessage("Algo de errado aconteceu com a tentativa de remoção do usuário.");
                setTimeout(() => { setErrorMessage("") }, 7000);
            }
            }).catch(error => {
                setErrorMessage("Algo deu errado, tente novamente mais tarde!");
                setTimeout(() => { setErrorMessage("") }, 7000);});
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
                {errorMessage !== "" && 
                <ErrorMessage Message = {errorMessage} errorHeight = {"6vh"} errorWidth = {"90%"} marginMessage={"0px 0px 15px 0px"}></ErrorMessage>}
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