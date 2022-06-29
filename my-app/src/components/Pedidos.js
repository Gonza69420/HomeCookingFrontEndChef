import React from "react";
import "./PedidosCard.css"
export const PedidosCard = props => {


    return(
        <div className="containerPedidos">
            <div className="TittlePart">
            <div className="info">
                <h5 className="NameCliente"> Nombre: {props.name}</h5>
                <h5>Menu: {props.Menu}</h5>
                <h5>Fecha: {props.Fecha}</h5>
                <h5>Localizacion: {props.Localizacion}</h5>
            </div>
            <img className="cardimg" src={props.url} alt='Card image'/>
            </div>
            <h3 className="monto">Monto: ${props.Monto}</h3>

        </div>
    )
}