import '../styles.css';

interface NotificationProps {
    text: string;
}

const Notification = (props: NotificationProps) => {
    if (!props.text) {
        return null
    }


    return (
        <p className="notification">{props.text}</p>
    )
}

export default Notification;