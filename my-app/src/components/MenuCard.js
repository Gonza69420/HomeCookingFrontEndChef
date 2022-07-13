import React, { useState } from "react";
import './MenuCard.css';
import { Popup } from "./Popup/Popup";
import { Stack } from "react-bootstrap";
import { ReviewCard } from "./reviewCard";
export const MenuCard = props => {
    const [menuPopUp , setmenuPopUp] = useState(false);
    const [eliminar, setEliminar] = useState(props.eliminar);
    const [menuid , setMenuId] = useState(props.menuid);


    const handleEliminar = () => {
        setEliminar(false);
        setmenuPopUp(false);
        var raw = "";

        var requestOptions = {
        method: 'POST',
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:8080/dbInfo/DeleteMenu/" + menuid, requestOptions)
        .then(response => response.text())
        .then(result =>{ 
            console.log(result);
            window.location.reload()
        })
        .catch(error => console.log('error', error));
    }

    return (
        <>
            {!eliminar &&
            <>
            {!menuPopUp &&
            <div className="card" onClick={() => setmenuPopUp(true)}>
                <img className="card-img-top" src={props.url} alt='Card image cap'/>
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text">{props.shortdescription}</p>
                </div>
            </div>
            }

            {menuPopUp &&
                <Popup setTrigger={setmenuPopUp} trigger={menuPopUp} type="popup-inner">
                    <Stack direction="horizontal" className='justify-content-start mt-4' gap={3}>
                    <h1 className="topright">{props.name}</h1>
                    <img className ="MenuImage" src={props.url}/>
                    </Stack>
                    <h3 className='d-flex justify-content-start mt-4 mb-4'>Descripcion:</h3>
                    <p className='totheright'>{props.description}</p>
                    <br/>




                    <h3 className='d-flex justify-content-start mt-4 mb-4'>Reviews:</h3>
                    <ReviewCard firstname="Raul" lastname="Salvio" review="Interesante el concepto. Mercado Libre es una herramienta" src="https://pbs.twimg.com/media/BcFrAwtIYAAsqsE.jpg" stars={3}/>
                </Popup>
            
            }
            </>
        }

        {eliminar &&
            <>
            {!menuPopUp &&
            <div className="card" onClick={() => setmenuPopUp(true)}>
                <img className="card-img-top" src={props.url} alt='Card image cap'/>
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text">{props.shortdescription}</p>
                </div>
            </div>
            }

            {menuPopUp &&
                <Popup setTrigger={setmenuPopUp} trigger={menuPopUp} type="popup-innerAdd">
                        <h1> Estas seguro de querer eliminarlo?</h1>

                    <button type="button" onClick={handleEliminar} className="btn btn-success btn-lg">
                    Si
                    </button>
                    <button type="button" onClick={() => {setEliminar(false); setmenuPopUp(false)}} className="btn btn-danger btn-lg"> 
                    No
                    </button>
                </Popup>
            
            }
            </>
            }   

        </>
    )
}