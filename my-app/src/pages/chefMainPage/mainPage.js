import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import { BsCheckSquare,  BsFillXSquareFill} from "react-icons/bs";
import { Stack } from 'react-bootstrap';


export  const MainPage = () => {
  const [data , setData] = useState();
  const [buscar, setBuscar] = useState();



    useEffect(() => {
      setBuscar(true)
        if(sessionStorage.getItem('token') === null){
            window.location.href = '/';
        }
    }, [])

    useEffect(() => { //conseguir datos de 
        fetch("")
      .then(response => response.json())
      .then(data => {
        setData(data)
      })
    }, [])

    useEffect(() => { //conseguir datos de usuario
      fetch("")
    .then(response => response.json())
    .then(data => {
    })
    }, [])

    const handleClic = () => {
      setBuscar(!buscar);
    }

    const botonToggle = () => {
      return() => {
        if(buscar){
          return <BsCheckSquare/>
        }else{
          return <BsFillXSquareFill/>
        }
      }
    }
    
    return(
        <div>
          <Navbar/>
          <div className='container mt-5'>
          <Stack direction="horizontal" className='justify-content-start mt-2' gap={3}>
            <h1>MainPage</h1> 
              <button type="button" onClick={handleClic} className={buscar ? "btn btn-success btn-lg" : "btn btn-danger btn-lg"}>
                {botonToggle()()}
              </button>     
          </Stack>

          <Stack direction="horizontal" className='justify-content-start mt-2' gap={3}>
          <h2>Pedidos Pendientes</h2>
          </Stack>

          <Stack direction="horizontal" className='justify-content-start mt-2' gap={3}>
          <h2>Pedidos Realizados</h2>
          </Stack>

          <Stack direction="horizontal" className='justify-content-start mt-2' gap={3}>
          <h2>Pedidos Pasados</h2>
          </Stack>
          </div>
        </div>
    )
}
