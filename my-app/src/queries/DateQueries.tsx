import {useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

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
            , config)
}


export const getChefDates = (options : IOptions) => {
    const [loading , setLoading] = useState<boolean>(true);
    const [error , setError] = useState<string>('');

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const getData = () => {
        return axios.get('http://localhost:8080/calendar/getEvents/' + sessionStorage.getItem('mail'), config)
            .then((res) => {
                setLoading(false);
                options.onCompleted(res.data);
                return res.data;
            })
            .catch((e) => {
                setError(e.message);
                options.onError(e);
            });
    }

    return {
        loading: loading,
        data: getData(),
        error: error
    }
}