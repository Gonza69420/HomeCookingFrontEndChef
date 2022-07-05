import React, { useState } from "react";
import './MenuCard.css';
import { Popup } from "./Popup/Popup";
export const MenuCard = props => {
    

    return (
        <div className="card" onClick={props.onClick}>
            <img className="card-img-top" src={props.url} alt='Card image cap'/>
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">{props.description}</p>
            </div>
        </div>
    )
}