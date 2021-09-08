import {
    faArrowRight,
    faEnvelope,
    faMapMarkerAlt,
    faPhone,
    faShoppingCart
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AboutImage from "../../../assets/images/landing-about.jpg";
import NotificationBox from "../../../components/NotificationBox";

const { Content } = Layout;

function LandingPage() {
    const [contact, setContact] = useState({ name: "", email: "", message: "" });

    const handleChangeContact = (e) => {
        const target = e.target;
        setContact({ ...contact, [target.name]: target.value });
    };

    const handleSubmitContact = (e) => {
        if (contact.name.trim() === "") {
            alert("Please input your name.");
            return;
        }

        if (contact.email.trim() === "") {
            alert("Please input your email.");
            return;
        }

        if (contact.message.trim() === "") {
            alert("Please input your message.");
            return;
        }

        NotificationBox.triggerSuccess("CONTACT SUCCESS", "Thank you for contacting us!");
    };

    useEffect(() => {
        const hash = window.location.hash;
        const id = !hash ? "#hero" : hash;
        document.querySelector(id).scrollIntoView();
        document.title = "The Coffee Shop";
    })

    return (
        <Content>
            <div className="overlay"></div>
            <div className="hero" id="hero">
                <button disabled="disabled">Welcome To</button>
                <h1>The Coffee Shop</h1>
                <div className="hero__shopping">
                    <Link to="/menu">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <FontAwesomeIcon icon={faArrowRight} id="arrow_icon" />
                    </Link>
                </div>
            </div>

            <div className="about container-section wrapper" id="about">
                <div className="about__left container-left">
                    <h1>About us</h1>
                    <br />
                    <p>
                        <b>THE COFFEE SHOP</b> was established in <b>June 2021</b> by{" "}
                        <b>Ga Chien Pro Max</b>, which is originally <b>Ga Chien Team</b>, based on:
                        <br />
                        <br />
                        <b>- Our Vision:</b> become a stable and well-known coffee shop in the
                        country, which has sufficient potential to compete with the reputable
                        others.
                        <br />
                        <br />
                        <b>- Our Goal:</b> The satisfaction of customers is the measure for our
                        success.
                        <br />
                        <br />
                        <b>- Our Business Philosophy:</b>
                        <br />
                        <b>&emsp;&emsp;* Quality:</b> The quality of products is our priority, which
                        plays an important role in competition and corporate culture.
                        <br />
                        <b>&emsp;&emsp;* Professional:</b> Try our best to form a professional,
                        creative, active and well-trained staff.
                        <br />
                        <b>&emsp;&emsp;* Consistent:</b> Continuously enhance our reputation, create
                        a discrepancy with the rest and develop high quality labour resources.
                    </p>
                </div>

                <div className="about__right container-right">
                    <img src={AboutImage} alt="About" />
                </div>
            </div>

            <div className="contact container-section wrapper" id="contact">
                <div className="contact__left container-left">
                    <h1>Contact us</h1>
                    <div className="contact__form">
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={contact.name}
                            onChange={handleChangeContact}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={contact.email}
                            onChange={handleChangeContact}
                        />
                        <textarea
                            name="message"
                            rows="5"
                            placeholder="Type your message here..."
                            value={contact.message}
                            onChange={handleChangeContact}
                        ></textarea>
                        <button type="submit" onClick={handleSubmitContact}>
                            Submit
                        </button>
                    </div>
                </div>

                <div className="contact__right container-right">
                    <div className="contact__item">
                        <div className="contact__icon">
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                        </div>

                        <span className="contact__info">
                            227 Nguyễn Văn Cừ, P.4, Q.5, TP Hồ Chí Minh
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
        </Content>
    );
}

export default LandingPage;
