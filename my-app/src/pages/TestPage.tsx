import {useState} from "react";
import {Chat} from "./chefChats/Chat";
export const TestPage = () => {
    const [date, setDate] = useState<Date>(new Date());

    const [excludeDate , setExcludeDate] = useState<Date[]>([
        new Date(2023, 2, 13),
        new Date(2023, 8, 2),
    ]);

    const [open , setOpen] = useState<boolean>(false);

    return (
        <div>
            <Chat></Chat>
        </div>
    );
}