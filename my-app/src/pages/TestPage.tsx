import {useState} from "react";
import {Chat} from "./chefChats/Chat";
import {RecoilRoot} from "recoil";
export const TestPage = () => {
    const [date, setDate] = useState<Date>(new Date());
    const [activeContact, setActiveContact] = useState<number>();

    const [excludeDate , setExcludeDate] = useState<Date[]>([
        new Date(2023, 2, 13),
        new Date(2023, 8, 2),
    ]);

    const changeActiveContact = (id : number) => {
        setActiveContact(id);
    }

    return (
        <div>
            <RecoilRoot>
            <Chat setActiveContactID={changeActiveContact} activeContactID={activeContact} ></Chat>
            </RecoilRoot>
        </div>
    );
}