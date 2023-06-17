import {useEffect, useState} from 'react';
import { AiFillBell } from 'react-icons/ai';
import { NotificationContainer } from './NotificationContainer.tsx';
import './Bell.css';
import toast from 'react-hot-toast';
import axios from "axios";
var stompClient = null;

export const Bell = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [hasNotification, setHasNotification] = useState<boolean>(false);
    const [UnRead, setUnRead] = useState<Notification[]>([] as Notification[]);

    const showSubmitError = (message) => {
        toast.error(message);
    };



    useEffect(() => {
        if (UnRead.length == 0){
            setHasNotification(false);
        } else{
            setHasNotification(true);
        }
    } , [UnRead]);

    useEffect(() => {
        if (open == true){
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    }
                };
                axios.put('http://localhost:8080/notifications/' + sessionStorage.getItem("mail"), {}, config);


        }
    } , [open]);




    useEffect(() => {
        connect();
    }, []);

    const connect = () => {
        const Stomp = require("stompjs");
        var SockJS = require("sockjs-client");
        SockJS = new SockJS("http://localhost:8080/ws");
        stompClient = Stomp.over(SockJS);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        console.log("connected");
        stompClient.subscribe(
            "/user/" + sessionStorage.getItem("id") + "/notifiactions",
            onNotificationReceived
        );
    };

    const onError = (err) => {
        console.log(err);
    };

    const onNotificationReceived = (payload) => {
        const notification = JSON.parse(payload.body);
        setUnRead([...UnRead, notification]);
    }

    return (
        <div className={'centerBell'}>
            <div className="bell" onClick={() => setOpen(!open)}>
                {hasNotification ? <div className={'redCircle'}></div> : <></>}
                <AiFillBell
                    style={{
                        fontSize: '30px',
                        marginTop: '3px',
                        background: '#ffffff',
                        borderRadius: '100%',
                        padding: '5px',
                        cursor: 'pointer'
                    }}
                />
            </div>
            {open ? (
                <div className={'column'}>
                    <div className={'arrow-up'}></div>
                    <div className="divposition">
                        <div className={'notificationContainer'}>
                            <NotificationContainer
                                unReadNotifications={UnRead}
                                setUnRead={setUnRead}
                            ></NotificationContainer>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};
