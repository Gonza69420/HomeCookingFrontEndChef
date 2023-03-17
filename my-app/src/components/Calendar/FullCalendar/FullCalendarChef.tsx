import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import "./FullCalendarChef.css"
import timeGridDay from "@fullcalendar/timegrid";
import {EventCalendar} from "../../../Models/EventCalendar";

interface Props {
    events : EventCalendar[];
}




export const FullCalendarChef = (props : Props) => {

    const getDateAndHourFromEvents = (datee : Date , hourr : Date) => {
        const date = new Date(datee);
        const hour = new Date(hourr);
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour.getHours(), hour.getMinutes());
    }


    const getEvents = () => {
        var events = [];
        props.events.map((event) => {
            let color = "";
            if(event.available === "COMPLETED"){
                color = "grey";
            }
            else if(event.available === "AVAILABLE"){
                color = "green";
            }
            else if(event.available === "RESERVED"){
                color = "red";
            }

            events.push({
                title: event.description,
                start: getDateAndHourFromEvents(event.eventDate.date , event.eventDate.eventStart),
                end:  getDateAndHourFromEvents(event.eventDate.date , event.eventDate.eventEnd),

                backgroundColor:color
            })
        })
        return events;
    }



    return(
        <div className={"calendarChef"}>
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridDay ]}
                initialView="dayGridMonth"
                headerToolbar={
                    {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek'
                    }
                }
                events={getEvents()}

            />
        </div>
    )
}