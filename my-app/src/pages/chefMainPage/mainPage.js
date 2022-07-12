import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import { BsCheckSquare,  BsFillXSquareFill} from "react-icons/bs";
import { Stack } from 'react-bootstrap';
import {PedidosCard} from "../../components/Pedidos"
import "./mainPage.css"
export  const MainPage = () => {
  const [data , setData] = useState();
  const [buscar, setBuscar] = useState();
  const [chefData , setChefData] = useState({});

    useEffect(() => {
      console.log(sessionStorage.getItem('token'));
        if(sessionStorage.getItem('token') === null){
          console.log(sessionStorage.getItem('token'));
            window.location.href = '/';
        }
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
    }).catch(error => {
      console.log(error);
    })
    },[]);
    
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
          <Stack direction="horizontal" className='justify-content-start mt-2' gap={3}>
          <PedidosCard name="Ricardo Luis" Menu="Milanesa con papas" Fecha="3/7/2022" Localizacion="San Fernando 3330" Monto="4000" url="https://www.cippec.org/wp-content/uploads/2020/11/foto-juan-camisassa-e1605808262604.jpg" />
          </Stack>
          <h2 className='d-flex justify-content-start mt-4 mb-4'>Pedidos Aceptados</h2>
          <Stack direction="horizontal" className='justify-content-start mt-2' gap={3}>
          <PedidosCard name="Jorge Mato" Menu="Ribs con barbacoa" Fecha="15/7/2022" Localizacion="Pilar Avenida s3" Monto="6301" url="https://www.eretailday.org/2020/miami/wp-content/uploads/2019/10/msa.jpg" />
          </Stack>
          <h2 className='d-flex justify-content-start mt-4 mb-4'>Pedidos Pasados</h2> 
          <Stack direction="horizontal" className='justify-content-start mt-2 mb-4' gap={3}>
          <PedidosCard name="Paolo Estevo" Menu="Sushi 30p de Salmon" Fecha="8/6/2022" Localizacion="Martinez Avenida Libertador 2049" Monto="8500" url="https://numax.org/storage/cache/images/d81/1621955604-750_ad141411-foto-pablo-seoane.jpg" />
          <PedidosCard name="Malena Lampone" Menu="Ribs con barbacoa x2" Fecha="13/5/2022" Localizacion="Palermo Juan Maria Gutierrez 342" Monto="12602" url="https://contents.bebee.com/users/id/JJI2b6285fa7552760/_avatar-urbwC-400.png" />
          </Stack>
          </div>
        </div>
    )
}
