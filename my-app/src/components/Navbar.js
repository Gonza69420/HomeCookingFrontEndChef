import React, { Component, useEffect, useState } from 'react'
import {MenuItems} from './MenuItems';
import './Navbar.css';
import { Button } from './Button';


const Navbar = ()=> {
  const [clicked , setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  }

  const logOutClick = () => {
    sessionStorage.removeItem('token');
    window.location.href = '/';
  }

    return (
      <nav className='NavbarItems'>
          <h1 className='navbar-logo'>HomeCooking<i className='fab fa-react'></i></h1>
          <div className='menu-icons' onClick={handleClick}>
            <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
          <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
            {MenuItems.map((item, index) => {
              return (
                <li key={index}>
                  <a className={item.cName} href={item.url}>
                    {item.title}
                  </a>
                </li>
              )
            })}
          </ul>
          <Button onClick={logOutClick}>Log Out</Button>
      </nav>
    )
  }
  


export default Navbar

