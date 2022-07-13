import React, { useState} from "react";
import './MenuCard.css';
import { Popup } from "./Popup/Popup";

export const RestaurantCard = props => {
    const [eliminable , setEliminable] = useState(props.eliminable);
    const [restaurantID, setrestaurantID] = useState(props.id);
    const [restaurantPopUp, setrestaurantPopUp] = useState(false);

    const handleEliminar = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("http://localhost:8080/dbInfo/DeleteRestaurant/" + restaurantID, requestOptions)
        .then(response => response.text())
        .then(result =>{ console.log(result)
            window.location.reload(false);
        })
        .catch(error => console.log('error', error));
            }

    return (
        <>
        {!eliminable &&
        <div className="cardRestaurant">
            <img className="card-img-top" src={props.url} alt='Card image cap'/>
            <div className="card-body">
                <h5 className="cardtitle">{props.name}</h5>
            </div>
        </div>
        }

        {eliminable &&
        <>
        
        <div className="cardRestaurantEliminable" onClick={() => {setrestaurantPopUp(true)}}>
            <img className="card-img-top-eliminable" src={props.url} alt='Card image cap'/>
            <div className="card-body">
                <h5 className="cardtitle">{props.name}</h5>
            </div>
        </div>
        {restaurantPopUp &&
        <>
                <Popup setTrigger={setrestaurantPopUp} trigger={restaurantPopUp} type="popup-innerAdd">
                    <h1> Estas seguro de querer eliminarlo?</h1>

                    <button type="button" onClick={handleEliminar} className="btn btn-success btn-lg">
                    Si
                    </button>
                    <button type="button" onClick={() => {setEliminable(false); setrestaurantPopUp(false)}} className="btn btn-danger btn-lg"> 
                    No
                    </button>
                </Popup>
        </>
        }

        </>
        }
        </>
    )
}