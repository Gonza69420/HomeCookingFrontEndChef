import {useRef , useState, useEffect, Fragment} from "react"
import React from 'react'
import {Form, Container } from 'react-bootstrap'
import "./Login.css";
import { Button } from '@mui/material'
import toast from "react-hot-toast";
import {useNavigate} from "react-router";


export const Register = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        dni: '',
        CBU: '',
        routingNum: ''

    })

    const onSubmit = (e) => {
        if( data.password !== data.confirmPassword){
            toast.error('Passwords do not match');
            return;
        }
        if(data.username === '' || data.password === '' || data.confirmPassword === '' || data.firstName === '' || data.lastName === '' || data.phone === '' || data.address === '' || data.dni === '' || data.CBU === '') {
            toast.error('Please fill all the fields');
            return;
        }
        (fetch("http://localhost:8080/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: data.username,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phone,
                address: data.address,
                dni: data.dni,
                role:"ROLE_CHEF",
                accountNumber: data.CBU,
                routingNumber: data.routingNum
            })
             })
            .then(res => {
                if (res.status === 401 || res.status === 400 || data.username === '' || data.password === '') { 
                    toast.error( 'Invalid Credentials');
                } 
                else {
                    //navigate("/")
                }
                }
            )).catch(err => toast(err.message));
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    return(
        <div className="containerLogin">
            <div className={"containerRegisterLogin"}>
                <h1 className={"registerTittle"}>Register</h1>
                <br/>
                    <Form id="sign in-form" action="" className = "text-center w-100">
                     <Form.Group className="registerFields" controlId="exampleForm.ControlInput0">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" onChange={handleChange} name="username"/>
                    </Form.Group>
                    <Form.Group className="registerFields" controlId="exampleForm.ControlInput1" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={handleChange} name="password"/>
                    </Form.Group>
                    <Form.Group className="registerFields" controlId="exampleForm.ControlInput2">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={handleChange} name="confirmPassword" />
                    </Form.Group>
                    <Form.Group className="registerFields" controlId="exampleForm.ControlInput3" >
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="First Name" name="firstName" onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="registerFields" controlId="exampleForm.ControlInput4">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" name ="lastName" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="registerFields" controlId="exampleForm.ControlInput5">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" placeholder="Phone Number" name= "phone"onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="registerFields" controlId="exampleForm.ControlInput6">
                        <Form.Label>Adress</Form.Label>
                        <Form.Control type="text" placeholder="Adress" name="address" onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="registerFields" controlId="exampleForm.ControlInput6">
                        <Form.Label>DNI</Form.Label>
                        <Form.Control type="text" placeholder="DNI" name="dni" onChange={handleChange}/>
                    </Form.Group>
                        <Form.Group className="registerFields" controlId="exampleForm.ControlInput2">
                            <Form.Label>CBU</Form.Label>
                            <Form.Control type="text" placeholder="CBU" onChange={handleChange} name="CBU" />
                        </Form.Group>
                        <Form.Group className="registerFields" controlId="exampleForm.ControlInput2">
                            <Form.Label>Numero de banco</Form.Label>
                            <Form.Control type="text" placeholder="Numero de Banco" onChange={handleChange} name="routingNum" />
                        </Form.Group>
                        <Button variant="contained" type="submit" className={"buttonSubmitRegister"} onClick={(e) => onSubmit(e)}>
                            Submit
                        </Button>
                    </Form>
            </div>
        </div>
  )
}
