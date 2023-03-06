import Navbar from "../../components/Navbar";
import {FullCalendarChef} from "../../components/Calendar/FullCalendar/FullCalendarChef.tsx";
import {Button} from "@mui/material";
import "./CalendarChef.css";
import {AddDate} from "../../components/AddDate/addDate.tsx";
import {useState} from "react";
import {getChefDates} from "../../queries/DateQueries.tsx";
import toast from "react-hot-toast";
import {EventCalendar} from "../../Models/EventCalendar.tsx";

export const CalendarChef = () => {
    const [openAddDate, setOpenAddDate] = useState<boolean>(false);

    const [events , setEvents] = useState<EventCalendar[]>([]);

    const {loading , data , error} = getChefDates( {
        onCompleted: (data) => {
            setEvents(data)
            console.log(events)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    });

    return (
        <div className={"backgroundProfileChef"}>
            <Navbar/>
            <div className='containerprofileClient'>
                <div className="containerTittles">
                    <h1 className='Tittles'>Agenda</h1>
                </div>

                <div className="containerCalendar">
                    <FullCalendarChef events={events}/>
                </div>

                <div className={"buttonsDateCalendarDiv"}>
                    <Button variant="contained" className={"AgregarFechaButton"} onClick={(e) => setOpenAddDate(true)}>Agregar Fecha</Button>

                    <Button variant="contained" className={"EliminarFechaButton"}>Eliminar Fecha</Button>
                </div>
            </div>
            <AddDate excludeDates={events} setOpen={setOpenAddDate} open={openAddDate}></AddDate>
        </div>
    )
}