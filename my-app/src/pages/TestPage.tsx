import {useState} from "react";
import {AddDate} from "../components/AddDate/addDate.tsx";
import {FullCalendarChef} from "../components/Calendar/FullCalendar/FullCalendarChef.tsx";

export const TestPage = () => {
    const [date, setDate] = useState<Date>(new Date());

    const [excludeDate , setExcludeDate] = useState<Date[]>([
        new Date(2023, 2, 13),
        new Date(2023, 8, 2),
    ]);

    const [open , setOpen] = useState<boolean>(false);

    return (
        <div>
            <FullCalendarChef></FullCalendarChef>
        </div>
    );
}