import React, { Component } from 'react'
import {MenuItems} from '../components/MenuItems';
import './Navbar.css';
import { Nav } from 'react-bootstrap';
export const Navbar = ()=> {
    return (
      <nav className='NavbarItems'>
          <h1 className='navbar-logo'>HomeCooking<i className='fab fa-react'></i></h1>
          <div className='menu-icons'>
          </div>
          <ul>
            {MenuItems.map((item, index) => {
              return (
                <li key={index}>
                  <a className={MenuItems.cName} href={item.url}>
                    {item.title}

                  </a>
                </li>
              )
            })}
          </ul>
      </nav>
    )
  }


export default Navbar

