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

export const ProfileChef = () => {
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
            description: ""
        }],
        bio: ''
       });

    const [bio , setBio] = useState('');

    const storage = getStorage();


    const[ menu, setMenu] = useState({
        name: "",
        shortDescription: "",
        description: "",
        category: "",
        imageurl: ""
    });

    const[idchef , setIdChef] = useState('');

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
            console.log(result)
            setChefData(result);
            console.log(result.id)
            setIdChef(result.id);
        }
        )
        .catch(error => console.log('error', error));

        

    }, [])


     useEffect (() => {
        console.log(idchef);
        var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };

        fetch("http://localhost:8080/dbInfo/getMenuByChef/" + idchef, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(JSON.parse(result));
            
            dataMenu[0]= (JSON.parse(result));
            
            console.log(dataMenu)
            if(dataMenu[0][0].name !== undefined){
                setisDataMenuEmpty(true);
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



    const getURL = (imageRef) => {
        
        getDownloadURL(imageRef)
        .then((url) => {
            console.log(url);
            setImageUrl(url);
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
            getURL(imageRef);
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

    const handleSaveButtonMenu =  () => {
        const imageRef = ref(storage , "images/chef/menu/" + sessionStorage.getItem("mail") + "/" + menu.name);
        uploadImageMenu(menu.name)
        console.log(menu);
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
            name : menu.name,
            shortDescription : menu.shortDescription,
            description : menu.description,
            imageurl : imageurl,
            category: menu.category,
            chefid: chefData.id
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
        //kjnkjnkj
        fetch("http://localhost:8080/dbInfo/NewMenu/" + sessionStorage.getItem("mail"), requestOptions)
          .then(response => {
            response.text()
        })
          .then(result => {
            console.log(result)
            setMenu({
            name: "",
            shortDescription: "",
            description: "",
            category: "",
            imageurl: ""
          })
          setImageUrl('');
          }
          )
          .catch(error => console.log('error', error));
       
    }

 



    const handleCancelButtonRestaurant = () => {
        setRestaurantPopUp(false);
        setImageUpload(null);
        setRestaurantAdd({
            name: ""
        });
    }

    const handleSaveButtonRestaurant = async () => {
        const imageRef = ref(storage , "images/chef/restaurant/" + sessionStorage.getItem("mail") + "/" + restaurantAdd.name);
        uploadImageRestaurant(restaurantAdd.name).then(() => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        name: restaurantAdd.name,
        imageURL: restaurantAdd.imageurl,
        ChefProfile: {}
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:8080/dbInfo/CreateRestaurant/" + sessionStorage.getItem("mail"), requestOptions)
        .then(response => {
            response.text()
            getURL(imageRef, "restaurant")

        })
        .then(result => {
            console.log(result)
            setRestaurantAdd({
                name: "",
                imageurl : ""
            })
           // window.location.reload(false);

        })
        .catch(error => console.log('error', error));

        setRestaurantPopUp(false);
    }).catch(err => {
        console.log(err);
    });
    }


    const handleChangeBio = (e)=>{
        setChefData({
            ...chefData,
            [e.target.name]: e.target.value
        })
    }

    const handleSaveBio = () => {
        console.log(bio);
        var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");


            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                bio: bio,
                imageurl: ""
                }),
            redirect: 'follow'
            };

            fetch("http://localhost:8080/api/auth/editChefBio/" + sessionStorage.getItem("mail"), requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    return (
        <div className='bg-dark'>
            <Navbar/>
            <div className='container mt-5 bg-white'>
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
                <Stack direction="horizontal" className='justify-content-start mt-4' gap={3}>

                    {chefData.restaurant.map((restaurant, index) => {
                        return (
                        <RestaurantCard url={restaurant.imageURL} name={restaurant.name}  />
                        )
                    })}
                    {personalizar &&
                    <div>
                    <AnadirCard onClick={() => setRestaurantPopUp(true)}/>
                    {restaurantPopUp && 
                    <>
                        <Popup setTrigger={setRestaurantPopUp} trigger={restaurantPopUp} type="popup-innerAdd">
                        <h1 className='tittle'>Añadir Restaurante</h1>
                        
                        <div className='container-fluid mt-5'>    

                        <input type="file" className="inputCoso" id="imgupload" onChange={(event) => {
                            setImageUpload(event.target.files[0]);
                        } } />
                        <label for='imgupload'><button class="btn btn-warning">Upload Image</button></label>
                            
                                <br/>
                                <Form >
                                <Form.Group className="m-3 " controlId="">
                                <Form.Control type="text" placeholder="Enter Restaurant Name..." onChange={handleChangeRestaurant} name="name"/>
                                </Form.Group>
                                </Form>

                            </div>
                            <Stack direction="horizontal" className='justify-content-start mt-4' gap={3}>
                                <div className="centerItems">
                                <Button className="cancelbutton" variant="danger" onClick={handleCancelButtonRestaurant}>Cancel</Button>
                                <Button className="successbutton"variant="success" onClick={handleSaveButtonRestaurant}>Save</Button>
                                </div>
                            </Stack>
                        </Popup>
                    </>
                    }
                    
                    </div>
                    }
                    
                </Stack>
                <h2 className='d-flex justify-content-start mt-4 mb-4'> Menus</h2>
                
                
                
                <Stack direction="horizontal" className='mt-4' gap={3}>
                    
                    {isDataMenuEmpty && 
                    <>
                    {dataMenu[0]?.map((menu, index) => {
                        return (
                            <div>
                                <MenuCard url={menu.imageurl} name={menu.name} description={menu.shortDescription} onClick={() => setmenuPopUp(true)} />

                            {menuPopUp &&
                                <>
                                    <Popup setTrigger={setmenuPopUp} trigger={menuPopUp} type="popup-inner">
                                    <Stack direction="horizontal" className='justify-content-start mt-4' gap={3}>
                                    <h1 className="topright">{menu.name}</h1>
                                    <img className ="MenuImage" src={menu.imageurl}/>
                                    </Stack>
                                    <h3 className='d-flex justify-content-start mt-4 mb-4'>Descripcion:</h3>
                                    <p className='totheright'>{menu.description}</p>
                                    <br/>
            

        
            
                                    <h3 className='d-flex justify-content-start mt-4 mb-4'>Reviews:</h3>
                                    <ReviewCard firstname="Raul" lastname="Salvio" review="Interesante el concepto. Mercado Libre es una herramienta" src="https://pbs.twimg.com/media/BcFrAwtIYAAsqsE.jpg" stars={3}/>
            
                                    </Popup>
                                </>
                                }
                            </div>
                        )
                    })}
                    </>
                    }



                    

                    {personalizar &&
                    <div>
                    <AnadirCard onClick={() => setmenuPopUpAdd(true)}/>
                    {menuPopUpAdd && 
                        <>
                            <Popup setTrigger={setmenuPopUpAdd} trigger={menuPopUpAdd} type="popup-innerAdd">
                                <h1 className='tittle'>Añadir Menu</h1>

                                <br/>
                                <input type="file" className="inputCoso" id="imgupload" onChange={(event) => {
                                    setImageUpload(event.target.files[0]);
                                } } />
                                <label for='imgupload'><button class="btn btn-warning">Upload Image</button></label>
                                
                                <Form >
                                <Form.Group className="m-3 " controlId="">
                                    <Form.Control type="text" placeholder="Enter Menu Name..." onChange={handleChangeMenu} name="name"/>
                                </Form.Group>
                                <Form.Group className="m-3 " controlId="">
                                    <Form.Control type="text" placeholder="Enter Descripcion Corta..." onChange={handleChangeMenu} name="shortDescription"/>
                                </Form.Group>
                                <Form.Group className="m-3 " controlId="">
                                    <Form.Control type="text" placeholder="Enter Descripcion Larga..." onChange={handleChangeMenu} name="description"/>
                                </Form.Group>
                                <Form.Group className="m-3 " controlId="">
                                    <Form.Control type="text" placeholder="Enter Categoria..." onChange={handleChangeMenu} name="category"/>
                                </Form.Group>
                                
                                </Form>

                                <Stack direction="horizontal" className='justify-content-start mt-4' gap={3}>
                                <div className="centerItems">
                                <Button className="cancelbutton" variant="danger" onClick={handleCancelButtonMenu}>Cancel</Button>
                                <Button className="successbutton"variant="success" onClick={handleSaveButtonMenu}>Save</Button>
                                </div>
                            </Stack>
                            </Popup>
                        </>
                        }
                    </div>
                    }
                </Stack>
                <br/>
            </div>
            <br/>
        </div>
        )
}