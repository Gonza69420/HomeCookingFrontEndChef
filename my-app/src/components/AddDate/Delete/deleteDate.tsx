import {Box, Button, FormControl, InputLabel, MenuItem, Modal, Select} from "@mui/material";
import {DatePickerChef} from "../../Calendar/Date/DatePickerChef";
import {HourPickerChef} from "../../Calendar/Hour/hourPickerChef";
import {useState} from "react";
import {EventCalendar} from "../../../Models/EventCalendar";
import './deleteDate.css';
import {deleteEventDate, GetHoursFromDate} from "../../../queries/DateQueries.tsx";
import toast from "react-hot-toast";

interface Props {
open : boolean;

setOpen : (open : boolean) => void;

event : EventCalendar[];
}

interface dateAndString{
date : Date;
string : String;
}
export const DeleteDate = (props : Props) => {
    const [date, setDate] = useState<Date>(new Date());
    const [dateAsString, setDateAsString] = useState<String>("");
    const [hours , setHours] = useState<String[]>([]);
    const [hour, setHour] = useState<String>("");

    const handleClose = () => {
        props.setOpen(false);
    }

    const getYearMonthDay = (datee : Date) => {
        let date = new Date(datee);
        if (date.getMonth() + 1 < 10) {
            return date.getFullYear() + "-0" + (date.getMonth() + 1) + "-" + date.getDate();
        } else if (date.getDate() < 10) {
            return date.getFullYear() + "-" + (date.getMonth() + 1) + "-0" + date.getDate();
        }
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }

    const handleHourChange = (event : any) => {
        setHour(hours[event.target.value]);
    }

    function removeDuplicatesByDate(arr : dateAndString[]) {
        return arr.filter((e, i) => arr.findIndex(a => getYearMonthDay(a.date) === getYearMonthDay(e.date)) === i);
    }

    const getDatesFromEventCalendars = (event : EventCalendar[]) :dateAndString[] => {

        let dates : dateAndString[] = [];
        event.forEach((eventCalendar) => {
            dates.push(
                {
                    date : eventCalendar.eventDate.date,
                    string: getYearMonthDay(eventCalendar.eventDate.date)
                }
            );
        })
        dates.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        })

        return removeDuplicatesByDate(dates);

    }


    const handleDateChange = (event : any) => {
        setDate( new Date(getDatesFromEventCalendars(props.event)[event.target.value].date));
        setDateAsString(getYearMonthDay( new Date(getDatesFromEventCalendars(props.event)[event.target.value].date)));
        GetHoursFromDate(new Date(getDatesFromEventCalendars(props.event)[event.target.value].date), {
                onCompleted: (data) => {
                    setHours(data)
                }, onError: (error) => {
                    toast.error(error.message)
                }
            }
        ).then(r => console.log(r))
    }


    return(
        <div>
            <Modal open={props.open}>
                <Box className={"boxAddDateChef"}>
                    <div>
                        <div className={"tittleAddDate"}>
                            <h1>Eliminar una fecha:</h1>
                        </div>

                        <div className={"deleteSelectDiv"}>
                            <h3 className={"dateAddDateTittle"}>Fecha: </h3>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Available Dates</InputLabel>
                                <Select label="Available Dates" className={"deleteDateSelect"} onChange={(e) => handleDateChange(e)}>
                                    {getDatesFromEventCalendars(props.event).map((event, index) => {
                                        return <MenuItem value={index}>{event.string}</MenuItem>
                                    })
                                    }
                                </Select>
                            </FormControl>
                        </div>

                        <div className={"deleteSelectDiv"}>
                            <h3 className={"datehourAddDateTittle"}>Horas: </h3>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Available Hours</InputLabel>
                                <Select label={"Available Dates"} className={"deleteDateSelect"} onChange={handleHourChange}>
                                    {hours.map((hour,index) => {
                                        return <MenuItem value={index}>{hour}</MenuItem>
                                    })
                                    }
                                </Select>
                            </FormControl>
                        </div>

                        <div className={"buttonAddDateDiv"}>
                            <Button variant="contained" color="success" className={"siguienteCreateSolicitude"} onClick={() => deleteEventDate(dateAsString, hour)}>Eliminar</Button>
                            <Button variant="contained" color="error" onClick={handleClose} className={"cancelarCreateSolicitude"}>Cancelar</Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}