import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
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
    alreadyReadNotifications: Notification[];
    setUnRead: (r: Notification[]) => any;
    setAlreadyRead: (r: Notification[]) => any;
}

export const NotificationContainer = (props: NotificationContainer) => {
    const [showUnRead, setShowUnRead] = useState<boolean>(false);
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState<boolean>(false);
    const [unReadDateWasTrimmed, setUnReadDateWasTrimmed] = useState<boolean>(false);
    const [alreadyReadDateWasTrimmed, setAlreadyReadDateWasTrimmed] = useState<boolean>(false);

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
        if (props.alreadyReadNotifications.length >= 1 && !alreadyReadDateWasTrimmed) {
            const newAlreadyRead = props.alreadyReadNotifications.map((notification) => {
                return { ...notification, date: notification.date.split('T')[0] };
            });

            props.setAlreadyRead(newAlreadyRead);
            setAlreadyReadDateWasTrimmed(true);
        }
    }, [props.alreadyReadNotifications]);

    const showSubmitError = (message) => {
        toast.error(message);
    };


    return (
        <div>
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

            {showUnRead ? (
                <>
                        <>
                            {props.alreadyReadNotifications.map((notification) => {
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
