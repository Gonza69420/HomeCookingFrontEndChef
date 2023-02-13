import {useState} from "react";
import {LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import {useEffect} from "react";
import * as dayjs from "dayjs";
interface Props{
    setHour : (hour : Date) => void;
    label : string;

    minHour?: Date;
}
export const HourPickerChef = (props : Props) => {
    const [hour, setHour] = useState<Date>(new Date());
    const [hasMinHour, setHasMinHour] = useState<boolean>(false);

    const handleHourChange = (newHour : Date) => {
        setHour(newHour);
        props.setHour(newHour);
    }

    useEffect(() => {
        if(props.minHour){
            setHasMinHour(true);
        }
    } , [] )

    const transformDatetoDayjs  = (date : Date) => {
        return dayjs(date);
    }

    const dayJsToDate = (dayjsDate : any) => {
        return dayjsDate.toDate();
    }

    return(
        <div className={"hourPicker"}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {hasMinHour &&
                <TimePicker
                    label={props.label}
                    value={hour}
                    onChange={(newValue) => {
                        handleHourChange(dayJsToDate(newValue));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    minTime={transformDatetoDayjs(props.minHour)}
                />
            }

            {!hasMinHour &&
                <TimePicker
                    label={props.label}
                    value={hour}
                    onChange={(newValue) => {
                        handleHourChange(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            }
        </LocalizationProvider>
        </div>
    )

}