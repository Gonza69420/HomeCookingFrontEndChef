import React from "react";
import "./añadirCard.css"
import {AiFillPlusCircle} from "react-icons/ai";
const AnadirCard = () => {
    return(
        <div className="card">
            <div className="anadirLabel">
            <AiFillPlusCircle size={200} />
            </div>
        </div>
    )
}

export default AnadirCard;