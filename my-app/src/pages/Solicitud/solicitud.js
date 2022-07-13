import React, {useState, useEffect} from "react";
import Navbar from "../../components/Navbar";
import {Form, Button, Container, InputGroup, Row, Col} from 'react-bootstrap'

export const Solicitud = () => {
    const [data, setData] = useState({
        mail: '',
        menu: '',
        localizacion: '',
        dia: '1',
        mes: '1',
        anio: '2022',
        horas: '1',
        minutos: '1',
        monto: ''
    })

    const[dia, setDia] = useState([1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]);

    const [mes, setMes] = useState([1, 2, 3,4,5,6,7,8,9,10,11,12]);

    const [anio, setAnio] = useState([2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]);

    const [hour, sethours] = useState([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]);

    const [minute, setminute] = useState([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]);


    const onSubmit = () => {
        console.log(data);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        chefMail: sessionStorage.getItem('mail'),
        clientMail: data.mail,
        date: data.dia + "/" + data.mes + "/" + data.anio,
        price: data.monto,
        hour: data.horas + ":" + data.minutos,
        address: data.localizacion,
        menuName: data.menu
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:8080/solicitude/newSolicitude/", requestOptions)
        .then(response => response.text())
        .then(result => 
            {
            console.log(result)
            window.location.reload(false);
            }
            )
        .catch(error => console.log('error', error));        
    }

    const handleChange = (e) => {
        console.log(e.target.value);
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        console.log(data);
    }


    return(
        <div>
            <Navbar/>
            <div className='container mt-5 bg-white'>
                <div className="containerTittles">
                    <h1 className='Tittles'>Crear Solicitud</h1>
                </div>

                <div className="containerForm">
                    <Form onSubmit={onSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <h5>Mail de Cliente</h5>
                            <Form.Control type="email" placeholder="Enter email..." onChange={handleChange} name="mail"/>
                        </Form.Group>
                        <br/>

                        <Form.Group controlId="formBasicEmail">
                            <h5>Menu</h5>
                            <Form.Control type="text" placeholder="Enter Menu..." onChange={handleChange} name="menu"/>
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="formBasicEmail">

                            <h5>Localizacion</h5>

                            <Form.Control type="text" placeholder="Enter Localizacion..." onChange={handleChange} name="localizacion"/>
                        </Form.Group>

                        <br/> <br/>
                        <h5>Fecha</h5>
                        <Form>
                            <Row>
                                <Col>
                                <Form.Select aria-label="Default select example" onChange={handleChange} name="dia">
                                           { dia?.map((item, index) => {
                                                return (<option key={item}>{item}</option>)
                                            })}
                                    </Form.Select>   
                                </Col>
                                <Col>
                                <h2>/</h2>
                                </Col>
                                <Col>
                                <Form.Select aria-label="Default select example" onChange={handleChange} name="mes">
                                           { mes?.map((item, index) => {
                                                return (<option key={item}>{item}</option>)
                                            })}
                                    </Form.Select>   
                                </Col>
                                <Col>
                                <h2>/</h2>
                                </Col>
                                <Col>
                                <Form.Select aria-label="Default select example" onChange={handleChange} name="anio">
                                           { anio?.map((item, index) => {
                                                return (<option key={item}>{item}</option>)
                                            })}
                                    </Form.Select>   
                                </Col>
                            </Row>
                        </Form>

                        <br/> <br/>
                        <h5>Hora</h5>
                        <Form>
                            <Row>
                                <Col>
                                <Form.Select aria-label="Default select example" onChange={handleChange} name="horas">
                                           { hour.map((item, index) => {
                                                return (<option key={item}>{item}</option>)
                                            })}
                                </Form.Select>  
                                </Col>
                                <Col>
                                <h2>:</h2>
                                </Col>
                                <Col>
                                    <Form.Select aria-label="Default select example" onChange={handleChange} name="minutos">
                                           { minute?.map((item, index) => {
                                                return (<option key={item}>{item}</option>)
                                            })}
                                    </Form.Select>                                
                                </Col>
                            </Row>
                        </Form>

                        <br/><br/>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control type="text" placeholder="Enter Monto..." onChange={handleChange} name="monto"/>
                        </InputGroup>
                    </Form>
                    
                </div>
                <br/>
                <Button variant="success" size="lg" onClick={onSubmit}>Submit</Button>{' '}
            </div>
        </div>
    )
}