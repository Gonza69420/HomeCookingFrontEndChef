import React , {useState} from "react";
import "./Popup.css"
import {Modal} from "@mui/material";


export function Popup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className={props.type}>
                <div className="positionButton">
                    <button className="CloseButton" onClick={() => props.setTrigger(false)}> X </button>
                </div>
                {props.children}
            </div>
        </div>
    ) : "";
}

/*
const [open , setOpen] = props.trigger;
    const handleClose = () => setOpen(false);
    return (
        <Modal open={open} onClose={handleClose()}>
            <div className={props.type}>
                {props.children}
            </div>
        </Modal>
    )
 */