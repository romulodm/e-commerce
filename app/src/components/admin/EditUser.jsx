import "./styles/adduser.scss";

import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';

import React, { useState } from "react";

import { registerUser, checkEmail } from "../../axios/apiCalls";

import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";

const EditUser = (prop) => {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [username, setUsername] = useState(prop.user.username);
    const [email, setEmail] = useState(prop.user.email);
    const [password, setPassword] = useState(prop.user.username);

    const [typePassowrd, setTypePassword] = useState("password");

    const validateRegistration = () => {
        const usernameRegex = /^[a-zA-Z\s]{3,}$/; 
        if (!usernameRegex.test(username)) {
          setErrorMessage("The name must be at least three characters long (no numbers or special symbols).");
          setTimeout(() => { setErrorMessage("") }, 5500)
    
          return false;
        }
        return true;
      };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateRegistration()) {

            const testEmail = checkEmail({"email":email});

            testEmail.then(response => {
            if (response.status === 200){
                
                const tryRegister = registerUser({"username": username, "email": email, "password": password});
      
                tryRegister.then(response => {
                if (response.status === 201) {
                    restartRegister();
                    setSuccessMessage("Informations changed!")
                    setTimeout(() => { setSuccessMessage("") }, 5500);
                } else {
                    setErrorMessage("Something went wrong with your registration, please try again later!");
                    setTimeout(() => { setErrorMessage("") }, 7000);
                    restartRegister();
                }
                    }).catch(error => {
                        console.error(error)});
            }
            if (response.status === 404) {
                setErrorMessage("There is already an account registered with this email. Please enter a valid email!");
                setTimeout(() => { setErrorMessage("") }, 7000)
                restartRegister()
            }
                }).catch(error => {
                    console.error(error)});
        } 
        else {
            setErrorMessage("Something wrong happened with the registration!");
            setTimeout(() => { setErrorMessage() }, 5500)
        }
    };

    function changeTypePassword() {
        if (typePassowrd == "password") {
            setTypePassword("text")
            return true
        } else {
            setTypePassword("password")
            return true
        }
    };

    function restartRegister() {
        setUsername("");
        setEmail("");
        setPassword("");
    };

    function closeWindow() {
        prop.setOpen(false)
        prop.setSelectedUser(false)
    }

    return (
        <div className="add">
        <div className="modal">
            <span className="close" onClick={() => closeWindow()}>
            <CloseIcon style={{ color: "gray"}}/>
            </span>
            <form className="forms">
                <h1>Edit User</h1>

                <React.Fragment>
                    {successMessage !== "" && 
                    <SuccessMessage Message = {successMessage} successHeight = {"6vh"} successWidth = {"100%"} marginMessage = {"0 0 15px 0"}></SuccessMessage>}
                </React.Fragment>

                <form className="input-container">
                    <PersonIcon style={{ color: "lightgray"}}/>
                    <input className="inputs" value={username} type="username" placeholder="Userame"
                    onChange={(e) => setUsername(e.target.value)}/>
                </form>

                <form className="input-container">
                    <EmailIcon style={{ color: "lightgray"}}/>
                    <input className="inputs" value={email} type="E-mail" placeholder="E-mail"
                    onChange={(e) => setEmail(e.target.value)}/>
                </form>

                <form className="input-container">
                    <LockIcon style={{ color: "lightgray"}}/>
                    <input className="inputs" value={password} type={typePassowrd} placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}/>

                    <React.Fragment>
                        {typePassowrd == "password" && (
                            <VisibilityIcon style={{ color: "#CECECE", marginRight: "10px", marginLeft: "10px", fontSize: "1.2em", cursor: "pointer"}} onClick={changeTypePassword}/>
                        )}
                    </React.Fragment>

                    <React.Fragment>
                        {typePassowrd == "text" && (
                            <VisibilityOffIcon style={{ color: "#CECECE", marginRight: "10px", marginLeft: "10px", fontSize: "1.2em", cursor: "pointer"}} onClick={changeTypePassword}/>
                        )}
                    </React.Fragment>
                </form>

                <React.Fragment>
                    {errorMessage !== "" && 
                    <ErrorMessage Message = {errorMessage} errorHeight = {"6vh"} errorWidth = {"91%"} marginMessage={"0px 0px 15px 0px"}></ErrorMessage>}
                </React.Fragment>

                <button onClick={handleSubmit}>Send</button>
                </form>
        </div>
        </div>
    );
};

export default EditUser;