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
        address: ''

    })

    const onSubmit = (e) => {
        console.log(data);
            fetch("http://localhost:8080/api/auth/signup", {
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
                address: data.address
            })
             })
            .then(res => res.json())
         .then(data => {
                console.log(data);
          }
           )
            .catch(err => console.log(err));
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
        <div className="contenedor">
            <h1>Register</h1>
            <br/>
            <Container id= "main-container" className="d-grid h-100">
            <Form id="sign in-form" action="" onSubmit={onSubmit} className = "text-center w-100">
             <Form.Group className="mb-3 w-25 " controlId="exampleForm.ControlInput0">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" onChange={handleChange} name="username"/>
            </Form.Group>
            <Form.Group className="mb-3 w-25 position-relative" controlId="exampleForm.ControlInput1" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={handleChange} name="password"/>
            </Form.Group>
            <Form.Group className="mb-3 w-25" controlId="exampleForm.ControlInput2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={handleChange} name="confirmPassword" />
            </Form.Group>
            <Form.Group className="mb-3 w-25" controlId="exampleForm.ControlInput3" >
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First Name" name="firstName" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3 w-25" controlId="exampleForm.ControlInput4">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last Name" name ="lastName" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3 w-25" controlId="exampleForm.ControlInput5">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" placeholder="Phone Number" name= "phone"onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3 w-25" controlId="exampleForm.ControlInput6">
                <Form.Label>Adress</Form.Label>
                <Form.Control type="text" placeholder="Adress" name="address" onChange={handleChange}/>
            </Form.Group>
            
            <Button variant="primary" type="submit" className="primary">
                Submit
            </Button>

            </Form>
        </Container>
        </div>
  )
}
