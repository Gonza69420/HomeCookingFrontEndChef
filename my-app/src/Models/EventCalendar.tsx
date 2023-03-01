export interface EventCalendar{
    id : number,
    eventDate : {
        id : number,
        date : Date,
        eventStart : Date,
        eventEnd : Date
    },
    available : string
    chef : {}

}