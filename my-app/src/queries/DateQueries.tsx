import {useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {EventCalendar} from "../Models/EventCalendar";

interface EventChef {
date : Date;
    minHour : Date;
    maxHour : Date;

onCompleted?: (r) => any;
onError?: (r) => any;
}

interface IOptions {
    onCompleted?: (r) => any;
    onError?: (r) => any;
}

export const addDateChef = (event : EventChef) => {


        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        return axios.post('http://localhost:8080/calendar/addEvent/' + sessionStorage.getItem('mail'), {
                date: event.date,
                eventStart: event.minHour,
                eventEnd: event.maxHour,
                description: "Habilitado"
            }
            , config).catch((e) => {
            toast.error(e.message);
        });
}


export const getChefDates = (options : IOptions) => {
    const [loading , setLoading] = useState<boolean>(true);
    const [data, setData] = useState<EventCalendar[]>([] as EventCalendar[]);
    const [error , setError] = useState<string>('');

    useEffect(() => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        axios.get('http://localhost:8080/calendar/getEvents/' + sessionStorage.getItem('mail'), config)
            .then((res) => {
                setLoading(false);
                options.onCompleted(res.data);
                setData(res.data);
            })
            .catch((e) => {
                setError(e.message);
                options.onError(e);
            });
    } , [])

    return {
        loading: loading,
        data: data,
        error: error
    }
}