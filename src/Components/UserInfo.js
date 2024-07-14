import React, { useEffect } from 'react';
import "./UserInfo.css"
import { useLocation, useNavigate } from 'react-router-dom';
const UserInfo = () => {
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    // console.log(state.response["CareerRoadmap"])
    useEffect(() => {
        if (!state) {
            navigate(-1);  // Navigate back to the previous page
        }
    }, [state, navigate]);

    // console.log(state.response)
    useEffect(() => {

        const items = document.querySelectorAll(".timeline li");

        const isElementInViewport = (el) => {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        };

        const callbackFunc = () => {
            for (let i = 0; i < items.length; i++) {
                if (isElementInViewport(items[i])) {
                    items[i].classList.add("in-view");
                }
            }
        };

        window.addEventListener("load", callbackFunc);
        window.addEventListener("resize", callbackFunc);
        window.addEventListener("scroll", callbackFunc);

        return () => {
            window.removeEventListener("load", callbackFunc);
            window.removeEventListener("resize", callbackFunc);
            window.removeEventListener("scroll", callbackFunc);
        };
    }, []);

    return (
        <div className='Advice-Section'>
        <h1>Advice</h1>
        <p>{state.response.advice}</p>
        <h1>Roadmap</h1>
        <section className="timeline">
            <ul>
                {
                    state.response["CareerRoadmap"].map((item, index) => (

                        <li>
                            <div className="reveal">
                                <p><span className="phase">{item[0]}</span>
                                    {item[1]}<br />
                                </p>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </section>
        </div>
    );
};

export default UserInfo;
