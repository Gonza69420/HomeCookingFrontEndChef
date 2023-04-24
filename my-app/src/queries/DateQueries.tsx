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
                "Content-Type": "application/json",

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

export const getAvailableChefDates = (options : IOptions) => {
    const [loading , setLoading] = useState<boolean>(true);
    const [data, setData] = useState<EventCalendar[]>([] as EventCalendar[]);
    const [error , setError] = useState<string>('');

    useEffect(() => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        axios.get('http://localhost:8080/calendar/getAvailableDates/' + sessionStorage.getItem('mail'), config)
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


export const GetHoursFromDate = (date : string, options : IOptions) => {

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
/*
    const getDateInISOString = (date : Date) : string => {
        console.log(date)
        console.log(date.toISOString().substring(0, 10))
            return date.toISOString().substring(0, 10);
    }


 */
    return axios.post('http://localhost:8080/calendar/getHoursFromDate/client/' + sessionStorage.getItem('mail'), {
        date: date
    }, config).then((res) => {
        options.onCompleted(res.data);
    }) .catch((e) => {
        options.onError(e);
    } );

}

export const deleteEventDate = (date : string , hourRange : string) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data"

        }
    }

    return axios.post('http://localhost:8080/calendar/deleteEventDate/' + sessionStorage.getItem('mail'), {
        date: date,
        hourRange: hourRange
    }, config).catch((e) => {
        toast.error(e.message);
    });
}