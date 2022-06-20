import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { Button } from '../../components/Button'
import { TbPencil } from "react-icons/tb";
import { Stack } from 'react-bootstrap';
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
                <Stack direction="horizontal" className='justify-content-start mt-2' gap={3}>
                <h2>Restaurantes</h2>
                </Stack>
                <Stack direction="horizontal" className='justify-content-start mt-2' gap={3}>
                <h2>Menus</h2>

                </Stack>
            </div>
        </div>
        )
}