import React, {useState, useEffect} from "react";
import { Form, Container } from "react-bootstrap";
import {Button} from "@mui/material";
import "./Login.css";
import toast from "react-hot-toast";
import {iframeEnabled} from "sockjs-client/lib/utils/iframe";
import {useNavigate} from "react-router";

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
        if(data.username === '' || data.password === '') {
            toast.error('Please fill all the fields');
            return;
        }

        (fetch("http://localhost:8080/api/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                mail: data.username,
                password: data.password,
                role : "ROLE_CHEF"
            })
        })
            .then(res =>{

                if (res.status === 401 || res.status === 400 || data.username === '' || data.password === '') {
                    toast.error( 'Invalid Credentials');
                }
                else {
                    res.json().then(data => {
                        sessionStorage.setItem("mail", data.email);
                        sessionStorage.setItem('token', data.accessToken);
                        sessionStorage.setItem("id", data.id);
                        navigate('/mainPage');
                    }).catch(err => toast.error(err));
                }
            })
            .catch(err => toast.error(err)));
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

    return(
        <div className={"backgroundColorLogin"}>
            <div className={"containerLogin"}>
                <div className={"containerLoginForm"}>
                    <h1>HomeCooking | Login Chef</h1>
                    <div className={"formLogin"}>
                     <Form.Group className="userNameLogin" controlId="exampleForm.ControlInput0">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" onChange={(e) =>changeUserName(e)} name="username"/>
                    </Form.Group>
                    <Form.Group className="userNameLogin" controlId="exampleForm.ControlInput1" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => changePassword(e)} name="password"/>
                    </Form.Group>

                    <Button variant={"contained"} className={"LogInButtonChef"} onClick={(e) => onSubmit(e)}>
                        Log In
                    </Button>

                    <Button variant={"contained"} className={"LogInButtonChef"} onClick={handleRegister}>
                        Register
                    </Button>
                    </div>
                </div>
           </div>
        </div>
    )
}

