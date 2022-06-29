import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Button } from '../../components/Button'
import { TbPencil } from "react-icons/tb";
import { Stack } from 'react-bootstrap';
import {MenuCard} from '../../components/MenuCard'
import AnadirCard from '../../components/anadirCard';
import {Profileimage} from '../../components/profileimage';
import {RestaurantCard} from "../../components/RestaurantCard"
export const ProfileChef = () => {
    const [personalizar , setPersonalizar] = useState(false);

/*
    useEffect(() => {
        if(sessionStorage.getItem('token') === null){
            window.location.href = '/';
        }
    }, [])

    
    useEffect(() => { //conseguir datos de Perfil
        fetch("")
      .then(response => response.json())
      .then(data => {
        //setData(data)
      })
    }, [])
    */

    const handlePersonalizar = () => {
        setPersonalizar(!personalizar);
    }

    const añadirRestaurante =()=>{
        console.log("3");
    }

    return (
        <div className='bg-dark'>
            <Navbar/>
            <div className='container mt-5 bg-white'>
                <Stack direction="horizontal" className='justify-content-start' gap={3}>
                    <Profileimage src="https://dalstrong.com/s/files/1/1728/9189/files/Guga-Dalstrong_1024x1024.jpg?v=1608322553&em-origin=cdn.shopify.com"/>
                    <h1>Guga Foods  </h1> 
                    <button type="button" onClick={handlePersonalizar} className="btn btn-secondary btn-lg">
                        <TbPencil/> 
                    </button>
                </Stack>
                <h2 className='d-flex justify-content-start mt-4 mb-4'>Restaurantes</h2>
                <Stack direction="horizontal" className='justify-content-start mt-4' gap={3}>
                    <RestaurantCard url="https://media-cdn.tripadvisor.com/media/photo-s/05/ae/df/ab/1000-rosa-negra.jpg" name="1000 Rosa Negra"  />
                    {personalizar &&
                    <AnadirCard/>
                    }
                    
                </Stack>
                <h2 className='d-flex justify-content-start mt-4 mb-4'>Menus</h2>
                <Stack direction="horizontal" className='justify-content-start mt-4' gap={3}>
                <div className='wrapper'>
                    <MenuCard url="https://assets.unileversolutions.com/recipes-v2/218401.jpg" name="Hamburguesa completa" description="Plato elaborado con tira de asado 80-20" />
                    <MenuCard url='https://dorius.com.ar/wp-content/uploads/2020/09/20220122_111911.jpg' name="Sushi Salmon" description="Mix de distintas piezas de salmon a eleccion del chef. Cantidades hablar con el chef"/>
                    <MenuCard url='https://images.rappi.com.ar/products/1026847-1597672728160.jpg' name="Ribs con Barbacoa" description="Ribs de Cerdo ahumadas con leña por 8 hs"/>
                    {personalizar &&
                    <AnadirCard/>
                    }
                </div>
                </Stack>
                <br/>
            </div>
            <br/>
        </div>
        )
}