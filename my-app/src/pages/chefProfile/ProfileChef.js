import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { Button } from '../../components/Button'
import { TbPencil } from "react-icons/tb";
import { Stack } from 'react-bootstrap';
import {MenuCard} from '../../components/MenuCard'
export const ProfileChef = () => {

    useEffect(() => {
        if(sessionStorage.getItem('token') === null){
            window.location.href = '/';
        }
    }, [])

    /*
    useEffect(() => { //conseguir datos de Perfil
        fetch("")
      .then(response => response.json())
      .then(data => {
        //setData(data)
      })
    }, [])
    */

    const handlePersonalizar = () => {
        window.location.href = '/personalizar';
    }

    return (
        <div>
            <Navbar/>
            <div className='container mt-5'>
                <Stack direction="horizontal" className='justify-content-start' gap={3}>
                    <h1>Perfil De  </h1> 
                    <button type="button" onClick={handlePersonalizar} className="btn btn-secondary btn-lg">
                        <TbPencil/> 
                    </button>
                </Stack>
                <h2 className='d-flex justify-content-start'>Restaurantes</h2>
                <Stack direction="horizontal" className='justify-content-start mt-2' gap={3}>
                </Stack>
                <h2 className='d-flex justify-content-start'>Menus</h2>
                <Stack direction="horizontal" className='justify-content-start mt-2' gap={3}>
                <div className='wrapper'>
                    <MenuCard url="https://static.remove.bg/remove-bg-web/f68d607e3305b1c23820eab456f9a63968772cfc/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg" name="Jorge" description="Plato elaborado de caca de ñandu" />
                    <MenuCard url='https://dam.cocinafacil.com.mx/wp-content/uploads/2019/06/Mac-n-chesee.jpg' tittle="MacandCheese" description="Los macarrones con queso son una cazuela"/>
                </div>
                </Stack>
            </div>
        </div>
        )
}