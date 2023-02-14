import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import "./FullCalendarChef.css"
import timeGridDay from "@fullcalendar/timegrid";
export interface eventDate{
    date : Date;
    title : string;
    startTime : Date;
    endTime : Date;
    type : string;
}

interface Props {
    events : eventDate[];
}




export const FullCalendarChef = (props : Props) => {


    const getEvents = () => {
        var events = [];
        props.events.map((event) => {
            let color = "";
            if(event.type === "completed"){
                color = "grey";
            }
            else if(event.type === "available"){
                color = "green";
            }
            else if(event.type === "reserved"){
                color = "red";
            }

            events.push({
                title: event.title,
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