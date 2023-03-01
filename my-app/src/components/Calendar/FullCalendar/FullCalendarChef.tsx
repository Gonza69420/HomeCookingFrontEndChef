import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import "./FullCalendarChef.css"
import timeGridDay from "@fullcalendar/timegrid";
import {EventCalendar} from "../../../Models/EventCalendar";

interface Props {
    events : EventCalendar[];
}




export const FullCalendarChef = (props : Props) => {


    const getEvents = () => {
        var events = [];
        props.events.map((event) => {
            let color = "";
            if(event.available === "completed"){
                color = "grey";
            }
            else if(event.available === "available"){
                color = "green";
            }
            else if(event.available === "reserved"){
                color = "red";
            }

            events.push({
                title: event.,
                start: event.date,
                startTime: event.startTime,
                endTime: event.endTime,
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