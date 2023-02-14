import Navbar from "../../components/Navbar";
import {FullCalendarChef} from "../../components/Calendar/FullCalendar/FullCalendarChef.tsx";
import {Button} from "@mui/material";
import "./CalendarChef.css";

export const CalendarChef = () => {

    return (
        <div className={"backgroundProfileChef"}>
            <Navbar/>
            <div className='containerprofileClient'>
                <div className="containerTittles">
                    <h1 className='Tittles'>Agenda</h1>
                </div>

                <div className="containerCalendar">
                    <FullCalendarChef events={[]}/>
                </div>

                <div className={"buttonsDateCalendarDiv"}>
                    <Button variant="contained" className={"AgregarFechaButton"}>Agregar Fecha</Button>

                    <Button variant="contained" className={"EliminarFechaButton"}>Eliminar Fecha</Button>
                </div>
            </div>
        </div>
    )
}