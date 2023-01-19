import {TextField} from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import React from "react";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import * as dayjs from "dayjs";
export const DatePickerChef = props => {
    function addThreeMonths() {
        let currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + 3);
        return currentDate;
    }

    function containsElement(list, element) {
        let result = false;
        for (let item of list) {
            if (item === element) {
                result = true;
                break;
            }
        }
        return result;
    }


    return(
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="Choose a Date"
                    value={ props.value }
                    onChange={(newValue) => {
                        props.setDates(newValue);
                    }}
                    maxDate={addThreeMonths()}
                    disablePast={true}
                    shouldDisableDate={(date) => {
                        return containsElement(props.dates, date);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </div>
    )
}
