import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { useEffect } from "react";
import "../assets/css/ScrollTopButton.css";

function ScrollTopButton() {
    const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const scrollButton = document.querySelector(".scroll-top");

        const onVisible = () => {
            const scrollY = window.scrollY;

            if (scrollY > 600) scrollButton.classList.add("active");
            else {
                console.log("remove");
                scrollButton.classList.remove("active");
            }
        };

        window.addEventListener("scroll", onVisible);

        return () => {
            window.removeEventListener("scroll", onVisible);
        };
    });

    return (
        <button onClick={handleScrollTop} className="scroll-top">
            <FontAwesomeIcon icon={faArrowUp} />
        </button>
    );
}

export default ScrollTopButton;
