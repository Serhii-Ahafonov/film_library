import React, { useEffect } from 'react';
import { NotificationContainer, NotificationManager } from "react-notifications";
import 'react-notifications/lib/notifications.css';

const Notification = ({message}) => {
  useEffect(() => {
    NotificationManager.success(message, '', 3000, () => {
      console.log("notification is hidden");
    });
  }, [message]);

  return (
      <NotificationContainer/>
  );
};

export default Notification;