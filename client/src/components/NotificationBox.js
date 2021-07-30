import { notification } from "antd";

const config = {
    duration: 4,
    bottom: 55,
    placement: "bottomRight",
    style: {},
};

class NotificationBox {
    static triggerSuccess = (message, description) => {
        if (!message || !description) {
            throw new Error("Notification box must be called with a message and a description");
        }
        notification.success({ ...config, message, description });
    };

    static triggerError = (message, description) => {
        if (!message || !description) {
            throw new Error("Notification box must be called with a message and a description");
        }
        notification.error({ ...config, message, description });
    };

    static triggerInfo = (message, description) => {
        if (!message || !description) {
            throw new Error("Notification box must be called with a message and a description");
        }
        notification.info({ ...config, message, description });
    };

    static triggerWarning = (message, description) => {
        if (!message || !description) {
            throw new Error("Notification box must be called with a message and a description");
        }
        notification.warning({ ...config, message, description });
    };

    static triggerWarn = (message, description) => {
        if (!message || !description) {
            throw new Error("Notification box must be called with a message and a description");
        }
        notification.warn({ ...config, message, description });
    };

    static open = (message, description) => {
        if (!message || !description) {
            throw new Error("Notification box must be called with a message and a description");
        }
        notification.open({ ...config, message, description });
    };
}

export default NotificationBox;
