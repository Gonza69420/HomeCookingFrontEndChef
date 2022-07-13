import React, {useEffect, useState} from "react";
import "./PedidosCard.css"
export const PedidosCard = props => {
    const[eliminable, setEliminable] = useState();
    const [pedidoID, setpedidoID] = useState(props.id);
    useEffect(() => {
        setEliminable(props.eliminable);
    }, [])

    const handleEliminar = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("http://localhost:8080/solicitude/deleteSolicitude/" + pedidoID, requestOptions)
        .then(response => response.text())
        .then(result => {
            window.location.reload(false);
        })
        .catch(error => console.log('error', error));
    }

    return(
        <>
        {!eliminable &&
        <div className="containerPedidos">
            <div className="TittlePart">
            <div className="info">
                <h5 className="NameCliente"> Nombre: {props.name}</h5>
                <h5>Menu: {props.Menu}</h5>
                <h5>Fecha: {props.Fecha}</h5>
                <h5>Localizacion: {props.Localizacion}</h5>
                <h5>Hora: {props.hora}</h5>
            </div>
            <img className="cardimg" src={props.url} alt='Card image'/>
            </div>
            <h3 className="monto">Monto: ${props.Monto}</h3>

        </div>
        }

        {eliminable &&
        <>
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
            <button type="button" class="btn btn-danger" onClick={handleEliminar}>X</button>

        </div> 
        </>
        }

        </>
    )
}