import {
    faArrowRight,
    faEnvelope,
    faMapMarkerAlt,
    faPhone,
    faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import AboutImage from "../../../assets/images/landing-about.jpg";
import { Layout } from "antd";

const { Content } = Layout;

function LandingPage() {
    const handleSubmitContact = (e) => {
        alert("Thank you for contacting us!");
    };

    return (
        <Content>
            <div className="overlay"></div>
            <div className="hero">
                <button disabled="disabled">Welcome To</button>
                <h1>The Coffee Shop</h1>
                <div className="hero__shopping">
                    <a href="/menu">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                </div>
            </div>

            <div className="about container-section wrapper" id="about">
                <div className="about__left container-left">
                    <h1>About us</h1>
                    <br />
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget
                        finibus ipsum. Aenean luctus nisi velit, sed tempus sem consectetur vitae.
                        Phasellus blandit, nulla non congue bibendum, lectus tortor lacinia libero,
                        vestibulum tristique risus ligula a nisl. Nam mi purus, tristique at
                        bibendum vel, elementum scelerisque dolor. Etiam ullamcorper eros vel
                        placerat ultrices. Curabitur eget odio et ex egestas dapibus. Integer
                        viverra eros enim, vitae facilisis massa vestibulum vestibulum.
                        <br /><br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget
                        finibus ipsum. Aenean luctus nisi velit, sed tempus sem consectetur vitae.
                        Phasellus blandit, nulla non congue bibendum, lectus tortor lacinia libero,
                        vestibulum tristique risus ligula a nisl. Nam mi purus, tristique at
                        bibendum vel, elementum scelerisque dolor. Etiam ullamcorper eros vel
                        placerat ultrices. Curabitur eget odio et ex egestas dapibus. Integer
                        viverra eros enim, vitae facilisis massa vestibulum vestibulum.
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
                        <input type="text" name="name" id="name" placeholder="Enter your name" />
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                        />
                        <textarea
                            name="message"
                            id="message"
                            rows="5"
                            placeholder="Type your message here..."
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
