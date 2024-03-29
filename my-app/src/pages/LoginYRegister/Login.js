import React, {useState, useEffect} from "react";
import { Form, Container } from "react-bootstrap";
import {Button} from "@mui/material";
import "./Login.css";
import toast from "react-hot-toast";
import {iframeEnabled} from "sockjs-client/lib/utils/iframe";
import {useNavigate} from "react-router";
import axios from "axios";
import loginImage from "../../assets/login-hc.png";
export const Login = () => {
    const [data, setData] = useState({
        username: '',
        password: ''
    })

    useEffect(() => {
          if(sessionStorage.getItem('token') !== null){
              navigate('/mainPage');
          }
      }, [])

  const navigate = useNavigate();


    const onSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/api/auth/signin", {
            mail: data.username,
            password: data.password,
            role: "ROLE_CHEF"

        }).then((response) => {
            if (response.data.accessToken) {
                sessionStorage.setItem("token", response.data.accessToken);
                sessionStorage.setItem("mail", data.username);
                sessionStorage.setItem('id', response.data.id);

                navigate('/mainPage');
            }
        }).catch((error) => {
            toast.error(error.message);
        });
    }
    const changeUserName = (e) => {
        setData({
            ...data,
            username: e.target.value
        })
    }

    const changePassword = (e) => {
        setData({
            ...data,
            password: e.target.value
        })
    }
    const handleRegister = () => {
        window.location.href = '/register';
    }

    return (
        <div className="containerLogin">
            <div className="loginSplitScreen">
                <div className="loginScreenLeft" style={{ backgroundColor: 'rgb(238, 142, 64)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={loginImage} alt="Login" />
                </div>
                <div className="loginScreenRight">
                    <div className="containerLoginForm">
                        <div className="containerLoginCenter">
                            <h1 style={{ fontWeight: 'bold' }}>HomeCooking | Login Chef</h1>
                            <div className="formLogin">
                                <Form.Group className="userNameLogin" controlId="exampleForm.ControlInput0">
                                    <Form.Label style={{ textAlign: 'left' }}>Username</Form.Label>
                                    <Form.Control type="email" placeholder="name@example.com" onChange={(e) => changeUserName(e)} name="username"/>
                                </Form.Group>
                                <Form.Group className="userNameLogin" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ textAlign: 'left' }}>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={(e) => changePassword(e)} name="password"/>
                                </Form.Group>
    
                                <Button variant="contained" className="LogInButtonChef" style={{ padding: "20", margin: "10px",backgroundColor: '#FF6D2D', color: '#fff' }} onClick={(e) => onSubmit(e)}>
                                    Log In
                                </Button>

                                <Button variant="contained" className="LogInButtonChef" style={{ margin: "10px",backgroundColor: '#ffc49b', color: 'white', }} onClick={handleRegister}>
                                    Register
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
