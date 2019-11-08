import React, { useState, useEffect, useMemo } from 'react';
import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import {
    Container,
    Badge,
    NotificationList,
    Scroll,
    Notification
} from './styles';

function Notifications() {
    const [visible, setVisible] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const hasUnread = useMemo(
        () => notifications.some(item => item.read === false),
        [notifications]
    );

    useEffect(() => {
        async function loadNotifications() {
            const response = await api.get('notifications');

            const data = response.data.map(item => ({
                ...item,
                timeDistance: formatDistance(
                    parseISO(item.createdAt),
                    new Date(),
                    { addSuffix: true, locale: pt }
                )
            }));

            setNotifications(data);
        }

        loadNotifications();
    }, []);

    function handleToggleVisible() {
        setVisible(!visible);
    }

    async function handleMarkAsRead(id) {
        await api.put(`notifications/${id}`);

        setNotifications(
            notifications.map(item =>
                item._id === id ? { ...item, read: true } : item
            )
        );
    }

    return (
        <Container>
            <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
                <MdNotifications color="#7159c1" size={20} />
            </Badge>

            <NotificationList visible={visible}>
                <Scroll>
                    {notifications.map(item => (
                        <Notification key={item._id} unread={!item.read}>
                            <p>{item.content}</p>
                            <time>{item.timeDistance}</time>
                            {!item.read && (
                                <button
                                    type="button"
                                    onClick={() => handleMarkAsRead(item._id)}
                                >
                                    Marcar como lida
                                </button>
                            )}
                        </Notification>
                    ))}
                </Scroll>
            </NotificationList>
        </Container>
    );
}

export default Notifications;
