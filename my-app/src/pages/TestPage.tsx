import {Fragment, useState} from "react";
import * as dayjs from "dayjs";
import {DatePickerClient} from "../components/Calendar/DatePickerClient";
import TextField from '@mui/material/TextField';
import {LocalizationProvider, PickersDay} from "@mui/x-date-pickers";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

export const TestPage = () => {

    const [date, setDate] = useState(new Date());

    const getCurrentDate = () => {
        return dayjs().format("YYYY-MM-DD");
    }

    const handleDateChange = ( date : Date) => {
        setDate(date);
    }

    const allowedDates = [dayjs("2022-01-01T21:11:54"), dayjs("2022-01-03"), dayjs("2022-01-10")];

    function isAllowedDate(date) {
        return allowedDates.some((allowedDate) => {
            return allowedDate.isSame(date, "day");
        });
    }

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                shouldDisableDate={(date) => !isAllowedDate(date)}
                onChange={ (date) => handleDateChange(date)}
                renderInput={(params) => {
                    return <TextField {...params} />;
                }}
                value={date}
            />
            </LocalizationProvider>
        </div>
    );
}