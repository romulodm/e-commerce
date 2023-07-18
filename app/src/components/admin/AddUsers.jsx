import "./styles/adduser.scss";

import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setMsg, resetMsg, setSucess, resetSucess } from "../../redux/registerRedux";

import { registerUser, checkEmail } from "../../axios/apiCalls";

const AddUser = (prop) => {
    const register = useSelector((state) => state.register);
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [typePassowrd, setTypePassword] = useState("password");

    const validateRegistration = () => {
        const usernameRegex = /^[a-zA-Z\s]{3,}$/; 
        if (!usernameRegex.test(username)) {
          dispatch(setMsg("O seu nome deve ter pelo menos três caracteres (sem números ou símbolos especiais)."));
          setTimeout(() => { dispatch(resetMsg()) }, 5500)
    
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
                    dispatch(setSucess());
                    setTimeout(() => { dispatch(resetSucess()) }, 5500);
                } else {
                    dispatch(setMsg("Algo de errado aconteceu com o seu cadastro, tente novamente mais tarde!"));
                    setTimeout(() => { dispatch(resetMsg()) }, 7000);
                    restartRegister();
                }
                    }).catch(error => {
                        console.error(error)});
            }
            if (response.status === 404) {
                dispatch(setMsg("Já existe uma conta registrada com este e-mail. Por gentileza, insira um e-mail válido!"));
                setTimeout(() => { dispatch(resetMsg()) }, 7000)
                restartRegister()
            }
                }).catch(error => {
                    console.error(error)});
        } 
        else {
            dispatch(setMsg("Algo de errado aconteceu com o cadastro!"));
            setTimeout(() => { dispatch(resetMsg()) }, 5500)
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

    return (
        <div className="add">
        <div className="modal">
            <span className="close" onClick={() => prop.setOpen(false)}>
            X
            </span>
            <form className="forms">
                <h1>Add new User</h1>

                <React.Fragment>
                    {register.sucess && (
                    <div style={{display: "flex", alignItems: "center", textAlign: "center", height: "6vh", width: "90%", marginBottom: "15px", backgroundColor: "#d7f8d9", color: "#2a791a", borderColor: "#acffa8", borderRadius: "5px"}}>
                        <div style={{textAlign: "center", flex: 1}}>Account created!</div>
                    </div>
                    )}
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
                    {register.showMsg && (
                    <div style={{display: "flex", alignItems: "center", textAlign: "center", height: "6vh", width: "90%", marginBottom: "15px", backgroundColor: "#f8d7da", color: "#721c24", borderColor: "#721c24", borderRadius: "5px"}}>
                        <div style={{textAlign: "center", flex: 1}}>{register.errorMsg}</div>
                    </div>
                    )}
                </React.Fragment>

                <button onClick={handleSubmit}>Send</button>
                </form>
        </div>
        </div>
    );
};

export default AddUser;