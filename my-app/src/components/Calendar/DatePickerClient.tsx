import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {useState} from "react";
import  { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';


interface Props {
    dates : Date[];
    setDates : (dates : Date) => void;

    label : string;

    value : string;
}
export const DatePickerClient = (props : Props) => {
    const [dateWithNoInitialValue, setDateWithNoInitialValue] = useState<Dayjs | null>(null);

    function addThreeMonths(): Date {
        let currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + 3);
        return currentDate;
    }

    function getUpcomingDatesExcluding(dates: Date[], datesToExclude: Date[]): Date[] {
        let currentDate = new Date();
        let threeMonthsLater = new Date();
        threeMonthsLater.setMonth(currentDate.getMonth() + 3);
        let result: Date[] = [];
        for (let date of dates) {
            if (date >= currentDate && date <= threeMonthsLater && !containsElement<Date>(datesToExclude, date)) {
                result.push(date);
            }
        }
        return result;
    }

    function containsElement<T>(list: T[], element: T): boolean {
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
        <div className={"DatePickerDiv"}>
            <DateTimePicker
                label="Choose a Date"
                value={dateWithNoInitialValue}
                onChange={(newValue) => {
                    props.setDates(newValue);
                }}
                maxDate={addThreeMonths()}
                disablePast={true}
                shouldDisableDate={(date) => {
                    return containsElement<Date>(getUpcomingDatesExcluding(props.dates, []), date);
                }}
                renderInput={(props) => <TextField label={props.label} value={props.value} />}
            />
        </div>
    )
}