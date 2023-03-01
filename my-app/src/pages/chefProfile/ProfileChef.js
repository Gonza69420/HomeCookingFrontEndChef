import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Buttonn } from '../../components/Button'
import { TbPencil , TbCheck} from "react-icons/tb";
import { Stack, Button, Form } from 'react-bootstrap';
import {MenuCard} from '../../components/MenuCard'
import AnadirCard from '../../components/anadirCard';
import {Profileimage} from '../../components/profileimage';
import {RestaurantCard} from "../../components/RestaurantCard"
import { Popup } from '../../components/Popup/Popup';
import "./ProfileChef.css"
import { ReviewCard } from '../../components/reviewCard';
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { BsDashSquareDotted } from 'react-icons/bs';
import {Modal, Box} from "@mui/material";
import "../../components/Popup/Popup.css"
import toast from "react-hot-toast";

export const ProfileChef = () => {
    const [uploadMenu , setUploadMenu] = useState(false);
    const [uploadRestaurant , setUploadRestaurant] = useState(false);
    const [dataMenu, setDataMenu] = useState([{}]);
    const [isDataMenuEmpty , setisDataMenuEmpty] = useState(false);
    const [personalizar , setPersonalizar] = useState(false);
    const [restaurantPopUp ,setRestaurantPopUp] = useState(false);
    const [menuPopUpAdd , setmenuPopUpAdd] = useState(false);
    const [menuPopUp , setmenuPopUp] = useState(false);
    const [imageurl, setImageUrl] = useState();
    const [imageUpload , setImageUpload] = useState(null);
    const [ingredient, setIngredient] = useState('');
    const [restaurantAdd, setRestaurantAdd] = useState({
        name: "",
        imageurl : ""
    });
    const [chefData , setChefData] = useState({
        firstName: '',
        lastName: '',
        mail: '',
        imageURL: "",
        restaurant: [{
            id: "",
            imageURL: "",
            name: ""
        }],
        menus: [{
            id: "",
            name: "",
            imageurl: "",
            category: "",
            shortDescription: "",
            description: "",
            price: ""
        }],
        bio: ''
       });

    const storage = getStorage();


    const[ menu, setMenu] = useState({
        name: "",
        shortDescription: "",
        description: "",
        category: "",
        imageurl: "",
        price: ""
    });

    const[idchef , setIdChef] = useState('');

    const [restaurantData, setRestaurantData] = useState([{}]);

    const [isRestaurantDataEmpty, setRestaurantDataEmpty] = useState(false);

    useEffect(() => {
        if(sessionStorage.getItem('token') === null){
            window.location.href = '/';
        }
    }, [])

  
   
    useEffect( () => { //conseguir datos de Perfil

        var requestOptions = {
        method: 'GET',
        
        redirect: 'follow'
        };

        fetch("http://localhost:8080/api/auth/getChefProfile/" + sessionStorage.getItem("mail"), requestOptions)
        .then(response => response.json())
        .then(result  => {
            setChefData(result);
            setIdChef(result.id);
        }
        )
        .catch(error => console.log('error', error));

        

    }, [])


     useEffect (() => {
        var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };

        fetch("http://localhost:8080/dbInfo/getMenuByChef/" + idchef, requestOptions)
        .then(response => response.text())
        .then(result => {
            dataMenu[0]= (JSON.parse(result));
            
            if(dataMenu[0][0].name !== undefined){
                setisDataMenuEmpty(true);
            }
        }
        )
        .catch(error => console.log('error', error));
    }, [idchef]);


    useEffect (() => {
        var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };

        fetch("http://localhost:8080/dbInfo/getRestaurant/" + sessionStorage.getItem('mail'), requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(JSON.parse(result));
            
            restaurantData[0]= (JSON.parse(result));
            
            console.log(restaurantData)
            if(restaurantData[0][0].name !== undefined){
                setRestaurantDataEmpty(true);
            }
        }
        )
        .catch(error => console.log('error', error));
    }, [idchef]);



    

    const handlePersonalizar = () => {
        setPersonalizar(!personalizar);
    }

    const handleChangeRestaurant = (e)=>{
        setRestaurantAdd({
            ...restaurantAdd,
            [e.target.name]: e.target.value
        })
    }

   
    const handleChangeMenu = (e)=>{
        setMenu({
            ...menu,
            [e.target.name]: e.target.value
        })
    }



    const getURL = (imageRef, what) => {
        
        getDownloadURL(imageRef)
        .then((url) => {
            if(what === "restaurant"){
                setRestaurantAdd({
                    ...restaurantAdd,
                    imageurl: url
                })
            }else if(what === "menu"){
            setMenu({
                ...menu,
                imageurl: url
            })
            }
        })
        .catch((error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/object-not-found':
              // File doesn't exist
              break;
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
      
            // ...
      
            case 'storage/unknown':
              // Unknown error occurred, inspect the server response
              break;
          }
        });
    }

    const uploadImageMenu =  (menuName) => {
        console.log(sessionStorage.getItem("mail"));
        if(imageUpload === null) return;
        console.log("image is not null");
        const imageRef = ref(storage , "images/chef/menu/" + sessionStorage.getItem("mail") + "/" + menuName);
        uploadBytes(imageRef , imageUpload).then(() => {
            console.log("Uploaded");
            setImageUpload(null);
            getURL(imageRef, "menu");
        }).catch(err => {
            console.log(err);

        }
        );
    }

    const uploadImageRestaurant =  (RestaurantName) => {
        console.log(sessionStorage.getItem("mail"));
        if(imageUpload === null) return;
        console.log("image is not null");
        const imageRef = ref(storage , "images/chef/restaurant/" + sessionStorage.getItem("mail") + "/" + RestaurantName);
        uploadBytes(imageRef , imageUpload).then(() => {
            console.log("Uploaded");
            setImageUpload(null);
            getURL(imageRef, "restaurant");
        }
        ).catch(err => {
            console.log(err);
        }
        );
    }

    const handleCancelButtonMenu = () => {
        setmenuPopUpAdd(false);
        setImageUpload(null);
        setMenu({
            name: "",
        shortDescription: "",
        description: "",
        category: "",
        imageurl: ""
                });
    }

    useEffect (() => {
        if(uploadMenu === false){
            setUploadMenu(false);
            return;
        }

        uploadImageMenu(menu.name)
        if( menu.imageurl === ""){
            return;
        }

        toast.success("Uploading...")

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
            name : menu.name,
            shortDescription : menu.shortDescription,
            description : menu.description,
            imageurl : menu.imageurl,
            category: menu.category,
            chefid: chefData.id,
            price : parseFloat(menu.price)
        });
        
        var requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            mode: 'no-cors'
          },
          body: raw,
          redirect: 'follow'
        };
        fetch("http://localhost:8080/dbInfo/NewMenu/" + sessionStorage.getItem("mail"), requestOptions)
          .then(response => {
            toast.success("Cargando")
            response.text();
        })
          .then(result => {
              window.location.reload();
        }
          )
          .catch(error => toast.error( error.message));
       
    }, [menu.imageurl, uploadMenu])

 
    //RESTAURANTE
    useEffect (() => {
        if(restaurantAdd.name === ""  || uploadRestaurant === false ){
            console.log("no se puede subir");
            return;
        }

        uploadImageRestaurant(restaurantAdd.name)
        console.log(restaurantAdd);
        if( restaurantAdd.imageurl === ""){
            console.log("no cargo imagen");
            return;
        }
        console.log(restaurantAdd.imageurl);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
            name : restaurantAdd.name,
            imageURL : restaurantAdd.imageurl,
            chefId: chefData.id
        });
        
        var requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            mode: 'no-cors'
          },
          body: raw,
          redirect: 'follow'
        };
        console.log(raw);
        fetch("http://localhost:8080/dbInfo/CreateRestaurant/" + sessionStorage.getItem("mail"), requestOptions)
          .then(response => {
            console.log("subiendo");
            response.text();
        })
          .then(result => {
            window.location.reload(false);
        }
          )
          .catch(error => console.log('error', error));
       
    }, [restaurantAdd.name , uploadRestaurant, restaurantAdd.imageurl])

   

    

    const handleCancelButtonRestaurant = () => {
        setRestaurantPopUp(false);
        setImageUpload(null);
        setRestaurantAdd({
            name: ""
        });
    }

  


    const handleChangeBio = (e)=>{
        setChefData({
            ...chefData,
            [e.target.name]: e.target.value
        })
    }

    const handleSaveBio = () => {
        var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");


            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                bio: chefData.bio,
                imageurl: ""
                }),
            redirect: 'follow'
            };

            fetch("http://localhost:8080/api/auth/editChefBio/" + sessionStorage.getItem("mail"), requestOptions)
            .then(response => response.text())
            .then(result => {
                window.location.reload(false);
            }
            )
            .catch(error => console.log('error', error));
    }


    const handleUploadMenu = (e) => {
        setUploadMenu(true);
    }

    const handleSaveButtonRestaurant = () => {
        setUploadRestaurant(true);
     


    }

    return (
        <div className='backgroundProfileChef'>
            <Navbar/>
            <div className='containerprofileClient'>
                <Stack direction="horizontal" className='justify-content-start' gap={3}>
                    {personalizar && 
                    <Profileimage classname="imageprofile" src={chefData.imageURL} personalizar={true}/> 
                    }
                    {!personalizar &&
                    <Profileimage classname="imageprofile" src={chefData.imageURL} personalizar={false}/>
                    }
    
                    <h1>{chefData.firstName} {chefData.lastName}  </h1> 
                    <button type="button" onClick={handlePersonalizar} className="btn btn-secondary btn-lg">
                        <TbPencil/> 
                    </button>
                </Stack>

                <h2 className='d-flex justify-content-start mt-4 '>Bio</h2>

                {!personalizar &&
                <Stack direction="horizontal" className='justify-content-start mt-4' gap={3}>
                <p>
                {chefData.bio}
                </p>
                </Stack>
                }
                {personalizar &&
                    <form>
                      <textarea className='inputBio' type="text" name="bio" onChange={handleChangeBio}>
                        {chefData.bio}
                      </textarea>
                      <div className="d-grid gap-2">
                      <button type="button" onClick={handleSaveBio} className="btn btn-info btn-lg">
                        <TbCheck/>
                      </button>
                      </div>
                  </form>

                }

                <h2 className='d-flex justify-content-start mt-4 mb-4'> Restaurantes</h2>
                <div className='containercards'>

                <Stack direction="horizontal" className='justify-content-start mt-4' gap={3}>
                {!personalizar &&
                <>
                {isRestaurantDataEmpty &&
                    <>
                        {restaurantData[0]?.map((restaurant, index) => {
                            return (
                            <RestaurantCard url={restaurant.imageURL} name={restaurant.name} eliminable = {false} id={restaurant.id} />
                            )
                        })}
                    </>
                }
                </>
            }

                {personalizar &&
                <>
                    {isRestaurantDataEmpty &&
                    <>
                        {restaurantData[0]?.map((restaurant, index) => {
                            return (
                            <RestaurantCard url={restaurant.imageURL} name={restaurant.name} eliminable = {true} id={restaurant.id} />
                            )
                        })}
                    </>
                }
                    <div>
                    <AnadirCard onClick={() => setRestaurantPopUp(true)}/>

                        <Modal open={restaurantPopUp}>
                            <Box className={"BoxCreateRestaurant"}>
                                <div className={"popup-innerAdd"}>
                                    <h1 className='tittle'>Añadir Restaurante</h1>

                                    <div className='uploadImageRestaurant'>
                                        <input type="file" className="inputCoso" id="imgupload" onChange={(event) => {
                                            setImageUpload(event.target.files[0]);
                                        } } />
                                        <label for='imgupload'><button class="btn btn-warning">Upload Image</button></label>
                                    </div>
                                            <br/>
                                            <Form >
                                            <Form.Group className="m-3 " controlId="">
                                            <Form.Control type="text" placeholder="Enter Restaurant Name..." onChange={handleChangeRestaurant} name="name"/>
                                            </Form.Group>
                                            </Form>

                                        <Stack direction="horizontal" className='justify-content-start mt-4' gap={3}>
                                            <div className="centerItems">
                                            <Button className="cancelbutton" variant="danger" onClick={handleCancelButtonRestaurant}>Cancel</Button>
                                            <Button className="successbutton"variant="success" onClick={handleSaveButtonRestaurant}>Save</Button>
                                            </div>
                                        </Stack>
                                </div>
                            </Box>
                        </Modal>
                    
                    </div>
                    </>
                }
                    
                </Stack>
                </div>
                <h2 className='d-flex justify-content-start mt-4 mb-4'> Menus</h2>
                
                
                <div className='containercards'>

                <Stack direction="horizontal" className='mt-4' gap={3}>

                    {isDataMenuEmpty && 
                    <>
                    {!personalizar &&
                    <>
                    {dataMenu[0]?.map((menu, index) => {
                        return (
                            <>
                                <MenuCard url={menu.imageurl} name={menu.name} description={menu.description} menuid={menu.id} eliminar={personalizar} price={menu.price} shortDescription={menu.shortDescription}/>
                            </>
                        )
                    })}
                    </>
                    }
                    </>
                    }

                    {personalizar &&
                    <Stack direction="horizontal" className='justify-content-start mt-4' gap={3}>
                        {dataMenu[0]?.map((menu, index) => {
                        return (
                                <MenuCard url={menu.imageurl} name={menu.name} description={menu.description} menuid={menu.id} eliminar={personalizar} shortDescription={menu.shortDescription}   />
                        )
                    })}




                    <AnadirCard onClick={() => setmenuPopUpAdd(true)}/>
                    <Modal open={menuPopUpAdd}>
                        <Box className={"BoxCreateRestaurant"}>
                            <div className={"popup-innerAdd"}>
                                <h1 className='tittle'>Añadir Menu</h1>

                                <br/>
                                <input type="file" className="inputCoso" id="imgupload" onChange={(event) => {
                                    setImageUpload(event.target.files[0]);
                                }}/>
                                <label htmlFor='imgupload'>
                                    <button className="btn btn-warning">Upload Image</button>
                                </label>

                                <Form>
                                    <Form.Group className="m-3 " controlId="">
                                        <Form.Control type="text" placeholder="Enter Menu Name..."
                                                      onChange={handleChangeMenu} name="name"/>
                                    </Form.Group>
                                    <Form.Group className="m-3 " controlId="">
                                        <Form.Control type="text" placeholder="Enter Descripcion Corta..."
                                                      onChange={handleChangeMenu} name="shortDescription"/>
                                    </Form.Group>
                                    <Form.Group className="m-3 " controlId="">
                                        <Form.Control type="text" placeholder="Enter Descripcion Larga..."
                                                      onChange={handleChangeMenu} name="description"/>
                                    </Form.Group>
                                    <Form.Group className="m-3 " controlId="">
                                        <Form.Control type="text" placeholder="Enter Categoria..."
                                                      onChange={handleChangeMenu} name="category"/>
                                    </Form.Group>
                                    <Form.Group className="m-3 " controlId="">
                                        <Form.Control type="number" placeholder="Enter Precio..."
                                                      onChange={(e) => {
                                                          let num = parseFloat(e.target.value);
                                                          num = (Math.round( num * 100 ) / 100).toFixed(2);
                                                          setMenu({...menu, price: num})
                                                          console.log(menu)
                                                      }} name="category"/>
                                    </Form.Group>

                                </Form>

                                <Stack direction="horizontal" className='justify-content-start mt-4' gap={3}>
                                    <div className="centerItems">
                                        <Button className="cancelbutton" variant="danger"
                                                onClick={handleCancelButtonMenu}>Cancel</Button>
                                        <Button className="successbutton" variant="success"
                                                onClick={handleUploadMenu}>Save</Button>
                                    </div>
                                </Stack>
                            </div>
                        </Box>
                    </Modal>

                    </Stack>
                    }
                </Stack>
                </div>
                <br/>
            </div>
            <br/>
        </div>
        )
}

