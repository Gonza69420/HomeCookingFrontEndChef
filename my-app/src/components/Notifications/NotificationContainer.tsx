import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import {
    UseGetAlreadyReadNotifications,
    UseGetUnReadNotifications
} from '../../queries/UseGetNotification.tsx';
import { NotificationTab } from './Notification.tsx';
import Spinner from '../Spinner/Spinner.tsx';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Notification {
    text: string;
    date: string;
    hasBeenSeen: boolean;
}

interface NotificationContainer {
    unReadNotifications: Notification[];
    setUnRead: (r: Notification[]) => any;
}

export const NotificationContainer = (props: NotificationContainer) => {
    const [AlreadyRead, setAlreadyRead] = useState<Notification[]>([] as Notification[]);
    const [showUnRead, setShowUnRead] = useState<boolean>(false);
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState<boolean>(false);
    const [unReadDateWasTrimmed, setUnReadDateWasTrimmed] = useState<boolean>(false);
    const [alreadyReadDateWasTrimmed, setAlreadyReadDateWasTrimmed] = useState<boolean>(false);
    const { loading } = UseGetAlreadyReadNotifications({
        onCompleted: (r) => {
            setAlreadyRead(r);
        },
        onError: (e) => {
            showSubmitError(e.message);
        }
    });

    useEffect(() => {
        if (props.unReadNotifications.length >= 1 && !unReadDateWasTrimmed) {
            props.unReadNotifications.length >= 1 ? setHasUnreadNotifications(true) : setHasUnreadNotifications(false);
            const newUnread = props.unReadNotifications.map((notification) => {
                return { ...notification, date: notification.date.split('T')[0] };
            });

            props.setUnRead(newUnread);
            setUnReadDateWasTrimmed(true);
        }
    }, [props.unReadNotifications]);

    useEffect(() => {
        if (AlreadyRead.length >= 1 && !alreadyReadDateWasTrimmed) {
            const newAlreadyRead = AlreadyRead.map((notification) => {
                return { ...notification, date: notification.date.split('T')[0] };
            });

            setAlreadyRead(newAlreadyRead);
            setAlreadyReadDateWasTrimmed(true);
        }
    }, [AlreadyRead]);

    const showSubmitError = (message) => {
        toast.error(message);
    };


    return (
        <div>
            {loading ? (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        margin: '20px'
                    }}
                >
                    <Spinner></Spinner>
                </div>
            ) : (
                <>
                    {!hasUnreadNotifications ? (
                        <>
                            <NotificationTab text="No hay nuevas notificaciones." date={''} hasBeenSeen={false} />
                        </>
                    ) : (
                        <>
                            {props.unReadNotifications.map((notification) => {
                                return (
                                    <>
                                        <NotificationTab
                                            text={notification.text}
                                            date={notification.date}
                                            hasBeenSeen={false}
                                        />
                                    </>
                                );
                            })}
                        </>
                    )}
                </>
            )}
            {showUnRead ? (
                <>
                    {loading ? (
                        <>
                            <Spinner></Spinner>
                        </>
                    ) : (
                        <>
                            {AlreadyRead.map((notification) => {
                                return (
                                    <>
                                        <NotificationTab
                                            text={notification.text}
                                            date={notification.date}
                                            hasBeenSeen={true}
                                        />
                                    </>
                                );
                            })}
                        </>
                    )}
                </>
            ) : (
                <>
                    <Button
                        variant="contained"
                        className={'loadOldNotifications'}
                        onClick={() => {
                            setShowUnRead(true);
                        }}
                    >
                        {' '}
                        Cargar Notificaciones Viejas{' '}
                    </Button>
                </>
            )}
        </div>
    );
};
