import {Box, Button, Modal, Select} from "@mui/material";
import {DatePickerChef} from "../../Calendar/Date/DatePickerChef";
import {HourPickerChef} from "../../Calendar/Hour/hourPickerChef";
import {useState} from "react";

interface Events{
   date : Date;
   hours : string[];
}
interface Props {
open : boolean;

setOpen : (open : boolean) => void;

event : Events;
}
export const DeleteDate = (props : Props) => {
    const [date, setDate] = useState<Date>(new Date());
    const [minHour, setMinHour] = useState<Date>(new Date());
    const [maxHour, setMaxHour] = useState<Date>(new Date());

    const handleClose = () => {
        props.setOpen(false);
    }


    return(
        <div>
            <Modal open={props.open}>
                <Box className={"boxAddDateChef"}>
                    <div>
                        <div className={"tittleAddDate"}>
                            <h1>Eliminar una fecha:</h1>
                        </div>

                        <div className={"dateAddDatediv"}>
                            <h3 className={"dateAddDateTittle"}>Fecha: </h3>
                            <Select label={"Available Dates"} className={"deleteDateSelect"}>

                            </Select>
                        </div>

                        <div className={"hourAddDatediv"}>
                            <h3 className={"datehourAddDateTittle"}>Horas: </h3>
                            <Select label={"Available Dates"} className={"deleteDateSelect"}>

                            </Select>
                        </div>

                        <div className={"buttonAddDateDiv"}>
                            <Button variant="contained" color="success" className={"siguienteCreateSolicitude"} >Eliminar</Button>
                            <Button variant="contained" color="error" onClick={handleClose} className={"cancelarCreateSolicitude"}>Cancelar</Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}