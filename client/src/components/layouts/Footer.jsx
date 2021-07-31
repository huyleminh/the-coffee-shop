import { faEnvelope, faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../../assets/css/layouts/Footer.css";
import TeamLogo from "../../assets/images/team-logo.png";

const schedule = [
    { id: 1, date: "Monday", startHour: "8:00 AM", endHour: "10:00 PM" },
    { id: 2, date: "Tuesday", startHour: "8:00 AM", endHour: "10:00 PM" },
    { id: 3, date: "Wednesday", startHour: "8:00 AM", endHour: "10:00 PM" },
    { id: 4, date: "Thursday", startHour: "8:00 AM", endHour: "10:00 PM" },
    { id: 5, date: "Friday", startHour: "8:00 AM", endHour: "10:00 PM" },
    { id: 6, date: "Saturday", startHour: "8:00 AM", endHour: "10:00 PM" },
    { id: 7, date: "Sunday", startHour: "8:00 AM", endHour: "7:00 PM" },
];

const today = new Date().toDateString().split(" ")[0];

function Footer() {
    return (
        <div className="footer">
            <div className="footer__top wrapper">
                <div className="footer__info team">
                    <h2 id="team-tiltle">Designed and developed by</h2>
                    <a href="/">
                        <img src={TeamLogo} alt="Team logo" />
                    </a>
                </div>

                <div className="footer__info">
                    <h2>Contact</h2>
                    <div className="footer__contact">
                        <div className="contact__item">
                            <div className="contact__icon">
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                            </div>

                            <span className="contact__info">
                                227 Nguyễn Văn Cừ, P.4, Q.5, TP HCM
                            </span>
                        </div>

                        <div className="contact__item">
                            <div className="contact__icon">
                                <FontAwesomeIcon icon={faPhone} />
                            </div>

                            <span className="contact__info">0123456789</span>
                        </div>

                        <div className="contact__item">
                            <div className="contact__icon">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>

                            <span className="contact__info">thecoffeeshop@gachien.com</span>
                        </div>
                    </div>
                </div>

                <div className="footer__info">
                    <h2>Opening hours</h2>
                    <div className="footer__time">
                        {schedule.map((item) => {
                            const style = item.date.match(today) ? { color: "#fff670" } : {};
                            return (
                                <div className="times" style={style} key={item.id}>
                                    <li>{item.date}</li>
                                    <li>
                                        {item.startHour} - {item.endHour}
                                    </li>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="footer__copyright wrapper">
                <span>&copy; Copyright - TheCoffeeShop - GaChienProMax</span>
            </div>
        </div>
    );
}

export default Footer;
