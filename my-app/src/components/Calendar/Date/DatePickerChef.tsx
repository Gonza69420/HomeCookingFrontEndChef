import TextField from '@mui/material/TextField';
import {DatePicker, LocalizationProvider, PickersDay} from "@mui/x-date-pickers";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useState} from "react";
import * as dayjs from "dayjs";

interface Props {
    onChange : (date : Date) => void;
    excludeDates : Date[];
}
export const DatePickerChef = (props : Props) => {
    const [value, setValue] = useState(new Date());

    const handleChange = (newValue) => {
        setValue(newValue);
        props.onChange(newValue);
    }



    function addThreeMonths() {
        let currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + 3);
        return currentDate;
    }

    function isDateNotAllowed(date) {
        return props.excludeDates.some((excludeDate) => {
            return dayjs(excludeDate).isSame(date, "day");
        });
    }


    return(
        <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Basic example"
                value={value}
                onChange={(newValue) => {
                    handleChange(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                maxDate={addThreeMonths()}
                disablePast={true}
                shouldDisableDate={(date) => {
                    return isDateNotAllowed(date);
                }}
            />
        </LocalizationProvider>
        </div>
    )
}
