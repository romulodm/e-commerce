import "./styles/adduser.scss";

import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import React, { useState } from "react";

import { registerUser, checkEmail } from "../../axios/apiCalls";

import SuccessMessage from "../SuccessMessage";
import ErrorMessage from "../ErrorMessage";

const AddUser = (prop) => {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [typePassowrd, setTypePassword] = useState("password");

    const validateRegistration = () => {
        const usernameRegex = /^[a-zA-Z\s]{3,}$/; 
        if (!usernameRegex.test(username)) {
          setErrorMessage("Your name must be at least three characters long (no numbers or special symbols).");
          setTimeout(() => { setErrorMessage("") }, 5000);
    
          return false;
        }
        return true;
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (validateRegistration()) {

            const testEmail = checkEmail({"email":email});

            testEmail.then(response => {
            if (response.status === 200){
                const tryRegister = registerUser({"username": username, "email": email, "password": password});
      
                tryRegister.then(response => {
                if (response.status === 201) {
                    setIsLoading(false);
                    restartRegister();
                    setSuccessMessage("Account created!")
                    setTimeout(() => { setSuccessMessage("") }, 5000);
                } else {
                    setIsLoading(false);
                    setErrorMessage("Something went wrong, try again later.");
                    setTimeout(() => { setErrorMessage("") }, 5000);
                    restartRegister();
                }
                    }).catch(error => {
                        console.error(error)});
            }
            if (response.status === 404) {
                setIsLoading(false);
                setErrorMessage("This email is already being used.");
                setTimeout(() => { setErrorMessage("") }, 5000);
                restartRegister()
            }
                }).catch(error => {
                    setIsLoading(false);
                    console.error(error)});
        } 
        else {
            setIsLoading(false);
            setErrorMessage("Fill in the fields correctly.");
            setTimeout(() => { setErrorMessage("") }, 5000);
        }
    };

    function changeTypePassword() {
        if (typePassowrd === "password") {
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

    return (
        <div className="add">
        <div className="modal">
            <span className="close" onClick={() => prop.setOpen(false)}>
            <CloseIcon style={{ color: "gray"}}/>
            </span>
            <form className="forms">
                <h1>Add new User</h1>

                <React.Fragment>
                    {successMessage !== "" && 
                    <SuccessMessage Message = {successMessage} successHeight = {"6vh"} successWidth = {"90%"} marginMessage = {"0 0 15px 0"}></SuccessMessage>}
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
                        {typePassowrd === "password" && (
                            <VisibilityIcon style={{ color: "#CECECE", marginRight: "10px", marginLeft: "10px", fontSize: "1.2em", cursor: "pointer"}} onClick={changeTypePassword}/>
                        )}
                    </React.Fragment>

                    <React.Fragment>
                        {typePassowrd === "text" && (
                            <VisibilityOffIcon style={{ color: "#CECECE", marginRight: "10px", marginLeft: "10px", fontSize: "1.2em", cursor: "pointer"}} onClick={changeTypePassword}/>
                        )}
                    </React.Fragment>
                </form>

                <React.Fragment>
                    {errorMessage !== "" && 
                    <ErrorMessage Message = {errorMessage} errorHeight = {"6vh"} errorWidth = {"90%"} marginMessage={"0px 0px 15px 0px"}></ErrorMessage>}
                </React.Fragment>

                <button onClick={handleSubmit}>Send</button>

                <React.Fragment>
                    {isLoading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                        <CircularProgress />
                    </Box>
                    )}
                </React.Fragment>
            </form>
        </div>
        </div>
    );
};

export default AddUser;