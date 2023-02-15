import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar';
import { BsCheckSquare,  BsFillXSquareFill} from "react-icons/bs";
import { Stack } from 'react-bootstrap';
import {PedidosCard} from "../../components/Pedidos"
import "./mainPage.css"
export  const MainPage = () => {
  const [data , setData] = useState();
  const [buscar, setBuscar] = useState();
  const [chefData , setChefData] = useState({});
  const [solicitudes, setSolicitudes] = useState([]);
  const [isSolicitudesEmpty , setIsSolicitudesEmpty] = useState(false);
  const [solicitudesPasadas, setSolicitudesPasadas] = useState([]);
  const [isSolicitudesPasadasEmpty , setIsSolicitudesPasadasEmpty] = useState(false);

    useEffect(() => {
        if(sessionStorage.getItem('token') === null){
            window.location.href = '/';
        }
    }, [])

    useEffect(() => {
      

    }, [])

    useEffect(() => {
      var raw = "";

      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("http://localhost:8080/api/auth/getAvailableStatus/" + sessionStorage.getItem("mail"), requestOptions)
        .then(response => response.text())
        .then(result => {
          setBuscar(result)
          console.log(result);
        }
        )
        .catch(error => console.log('error', error));
    }, [])

    
    useEffect(() => {
      fetch(`http://localhost:8080/api/auth/getChef/${sessionStorage.getItem('mail')}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${sessionStorage.getItem('token')}`
        }
    }).then(response => response.json())
    .then(data => {
      console.log(data);
      setChefData(data);
      sessionStorage.setItem('fullNameChef', data.fullNameChef);

    }).catch(error => {
      console.log(error);
    })
    },[]);

    useEffect(() => {
      
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      fetch("http://localhost:8080/solicitude/getPendingSolicitudesByChef/" + sessionStorage.getItem("mail"), requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result)
          solicitudes[0] = JSON.parse(result);

          console.log(solicitudes[0]);

          if(solicitudes[0][0].idclient != null){
            setIsSolicitudesEmpty(true);
          }

      })
        .catch(error => console.log('error', error));

    }, []);

    useEffect(() => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      console.log("consiguiendo solicitudes")
      fetch("http://localhost:8080/solicitude/getAcceptedSolicitudesByChef/" +  sessionStorage.getItem("mail"), requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log("conseguido")
          console.log(JSON.parse(result))
          solicitudesPasadas[0] = JSON.parse(result);
          
          console.log(solicitudesPasadas[0]);
          if(solicitudesPasadas[0][0].idclient != null){
            setIsSolicitudesPasadasEmpty(true);
          }


        })
        .catch(error => console.log('error', error));
    }, [])


    
    const handleClic = () => {
      setBuscar(!buscar);
      if(buscar){
        setBuscarChef();
      }else{
        setNoBuscarChef();
      }
    }

    const setNoBuscarChef = () => {
      var raw = "";

      var requestOptions = {
        method: 'POST',
        body: raw,
        redirect: 'follow'
      };
      fetch("http://localhost:8080/api/auth/setChefAvailable/"+ sessionStorage.getItem("mail"), requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
        }



      const setBuscarChef = () => {
            var raw = "";

            var requestOptions = {
              method: 'POST',
              body: raw,
              redirect: 'follow'
            };
            fetch("http://localhost:8080/api/auth/setChefNotAvailable/" + sessionStorage.getItem("mail"), requestOptions)
              .then(response => response.text())
              .then(result => console.log(result))
              .catch(error => console.log('error', error));
                }


          const botonToggle = () => {
            return() => {
              if(buscar){
                return <BsCheckSquare/>
              }else{
                return <BsFillXSquareFill/>
              }
            }
    }



    
    return(
        <div>
          <Navbar/>

          <div className='container mt-5'>
          <Stack direction="horizontal" className='justify-content-startmt-2' gap={3}>
            <div className="containerTittles">
              <h1 className='Tittles'>Welcome {chefData?.chefProfile?.firstName} {chefData?.chefProfile?.lastName}!</h1> 
            </div>
              <button type="button" onClick={handleClic} className={buscar ? "btn btn-success btn-lg" : "btn btn-danger btn-lg"}>
                {botonToggle()()}
              </button>     
          </Stack>
          <h2 className='d-flex justify-content-start mt-4 mb-4'>Pedidos Pendientes</h2>
          <div className='containercards'>
            <Stack direction="horizontal" className='justify-content-start mt-2' gap={3}>
              {isSolicitudesEmpty &&
                <>
                {solicitudes[0].map((solicitud) => {
                  return(
                      <PedidosCard eliminable={false} name={solicitud.fullNameClient} Menu={solicitud.menuName} Fecha={solicitud.date} Localizacion={solicitud.hour} Monto={solicitud.price} url={solicitud.clientPhoto} hora= {solicitud.hour} id={solicitud.id} />
                  )
                })}
                </>
              }
            </Stack>
          </div>
          <h2 className='d-flex justify-content-start mt-4 mb-4'>Pedidos Aceptados</h2>
          <div className='containercards'>

            <Stack direction="horizontal" className='justify-content-start mt-2' gap={3}>
              {isSolicitudesPasadasEmpty &&
              <>
              {solicitudesPasadas[0].map((solicitud) => {
                return(
                <PedidosCard name={solicitud.fullNameClient} Menu={solicitud.menuName} Fecha={solicitud.date} Localizacion={solicitud.hour} Monto={solicitud.price} url={solicitud.clientPhoto} eliminable={true} hora= {solicitud.hour} id={solicitud.id} />
                )
              })}
              </>
              }
            </Stack>
          </div>
          
          </div>
        </div>
    )
}
