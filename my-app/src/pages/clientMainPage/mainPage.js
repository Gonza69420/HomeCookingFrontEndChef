import React, { Component, useEffect } from 'react'
import Navbar from '../../components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";

export  const MainPage = () => {

    useEffect(() => {
        console.log(sessionStorage.getItem('token'));
        if(sessionStorage.getItem('token') === null){
            window.location.href = '/';
        }
    })

    
    return(
        <div>
            <Navbar/>            
        </div>
    )
}
