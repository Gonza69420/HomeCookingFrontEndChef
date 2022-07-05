import {useRef , useState, useEffect, Fragment} from "react"
import React from 'react'
import {Form, Button, Container } from 'react-bootstrap'



export const Register = () => {
    const [data, setData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        dni: ''

    })

    const onSubmit = (e) => {
        console.log(data);
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
                role:"ROLE_CHEF"
            })
             })
            .then(res => {
                if (res.status === 401 || res.status === 400 || data.username === '' || data.password === '') { 
                    throw new Error("Invalid credentials");
                } 
                else {
                    sessionStorage.setItem('token', res.token);
                }
                })
            .then(data => {
                console.log(sessionStorage.getItem('token'));
               
            }
            )).catch(err => console.log(err));
            
        e.preventDefault();
    }

    const handleChange = (e) => {
        console.log(e.target.value);
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    return(
        <div className="contenedor mt-5">
            <h1>Register</h1>
            <br/>
            <Container id= "main-container" className="d-grid h-100">
            <Form id="sign in-form" action="" onSubmit={onSubmit} className = "text-center w-100">
             <Form.Group className="mb-3 w-25 m-auto " controlId="exampleForm.ControlInput0">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" onChange={handleChange} name="username"/>
            </Form.Group>
            <Form.Group className="mb-3 w-25 m-auto " controlId="exampleForm.ControlInput1" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={handleChange} name="password"/>
            </Form.Group>
            <Form.Group className="mb-3 w-25 m-auto" controlId="exampleForm.ControlInput2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={handleChange} name="confirmPassword" />
            </Form.Group>
            <Form.Group className="mb-3 w-25 m-auto" controlId="exampleForm.ControlInput3" >
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First Name" name="firstName" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3 w-25 m-auto" controlId="exampleForm.ControlInput4">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last Name" name ="lastName" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3 mt-3 w-25 m-auto" controlId="exampleForm.ControlInput5">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" placeholder="Phone Number" name= "phone"onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3 w-25 m-auto" controlId="exampleForm.ControlInput6">
                <Form.Label>Adress</Form.Label>
                <Form.Control type="text" placeholder="Adress" name="address" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3 w-25 m-auto" controlId="exampleForm.ControlInput6">
                <Form.Label>DNI</Form.Label>
                <Form.Control type="text" placeholder="DNI" name="dni" onChange={handleChange}/>
            </Form.Group>
            
            
            <Button variant="primary" type="submit" className="primary">
                Submit
            </Button>

            </Form>
        </Container>
        </div>
  )
}
