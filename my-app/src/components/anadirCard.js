import React from "react";
import "./añadirCard.css"
import {AiFillPlusCircle} from "react-icons/ai";
const AnadirCard = props => {
    return(
        <div className="card" onClick={props.onClick}>
            <div className="anadirLabel">
            <AiFillPlusCircle size={200} />
            </div>
        </div>
    )
}

export default AnadirCard;