import {Box, Button, Modal} from "@mui/material";
import {DatePickerChef} from "../Calendar/Date/DatePickerChef.tsx";
import {HourPickerChef} from "../Calendar/Hour/hourPickerChef.tsx";
import {useState} from "react";
import "./AddDate.css";
interface Props{
excludeDates : Date[];

//open : boolean;

setOpen : (open : boolean) => void;

}
export const AddDate = (props : Props) => {
const [date, setDate] = useState<Date>(new Date());
const [minHour, setMinHour] = useState<Date>(new Date());
const [maxHour, setMaxHour] = useState<Date>(new Date());
const [open , setOpen] = useState<boolean>(false);

const handleClose = () => {
    setOpen(false);
}
    return (
        <div>
            <Button onClick={() => setOpen(true)}> PEENE</Button>
            <Modal open={open}>
                <Box className={"boxAddDateChef"}>
                    <div>
                        <div className={"tittleAddDate"}>
                            <h1>Añadi una fecha:</h1>
                        </div>

                        <div className={"dateAddDatediv"}>
                            <h3 className={"dateAddDateTittle"}>Fecha: </h3>
                            <DatePickerChef excludeDates={props.excludeDates} onChange={setDate} ></DatePickerChef>
                        </div>

                        <div className={"hourAddDatediv"}>
                            <h3 className={"datehourAddDateTittle"}>Desde: </h3>
                            <HourPickerChef setHour={setMinHour} label={"Minima"}></HourPickerChef>
                            <h3 className={"datehourMaximumAddDateTittle"}>Hasta: </h3>
                            <HourPickerChef label={"Maxima"} minHour={minHour} setHour={setMaxHour}></HourPickerChef>
                        </div>

                        <div className={"buttonAddDateDiv"}>
                            <Button variant="contained" color="success" className={"siguienteCreateSolicitude"} >Siguiente</Button>
                            <Button variant="contained" color="error" onClick={handleClose} className={"cancelarCreateSolicitude"}>Cancelar</Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}