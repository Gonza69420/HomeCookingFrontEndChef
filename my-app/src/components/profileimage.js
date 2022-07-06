import React, { useEffect, useState } from "react";
import "./profileimage.css"

export const Profileimage = props => {
    const [personalizar , setPersonalizar] = useState(!props.personalizar);
    
    
    

    return(
        <div className={props.classname}>
            {personalizar ?
            <div className="image">
            <img className="imagespecific"src={props.src}/>
            </div>
            :
            <div className="personalizeimage">
                 <input type="file" className="inputCoso" id="imgupload" />
                <label for='imgupload'><img className="imagespecific"src={props.src}/></label>
            </div>
            }
        </div>
    )

    }

