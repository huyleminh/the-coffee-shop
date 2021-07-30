import EventEmitter from "events";

/**
 * @override EventEmitter from NodeJs
 * @abstract AppEvents
 */
class AppEventsAbstract {
    constructor() {
        if (new.target === AppEventsAbstract)
            throw new TypeError("Cannot construct Abstract instances directly");
        this._events = new EventEmitter();
        this._listeners = [];
    }

    /**
     * @param {string} event
     * @param {function} listener
     */
    subcribe(event, listener) {
        if (!this._listeners.includes({ event, listener }))
            this._listeners.push({ event, listener });
        this._events.on(event, listener);
    }

    /**
     * @param {string} event
     * @param  {...any} params
     */
    trigger(event, ...params) {
        this._events.emit(event, ...params);
    }

    /**
     * @param {string} event
     * @param {function} listener
     */
    unSubcribe(event, listener) {
        this._events.removeListener(event, listener);
    }
}

class AppEvents extends AppEventsAbstract {}
class HomePageEvents extends AppEventsAbstract {}
class MenuPageEvents extends AppEventsAbstract {}
class UserProfileEvents extends AppEventsAbstract{}

export const AppEventsHandler = new AppEvents();
export const HomePageEventsHandler = new HomePageEvents();
export const MenuPageEventsHandler = new MenuPageEvents();
export const UserProfileEventsHandler = new UserProfileEvents();
