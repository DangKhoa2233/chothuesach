import React, { useState } from 'react'
import { Icon } from '../../../assets/icon';

export const ScrollToTop = () => {

    const windowHeight = window.innerHeight;

    const [show, setShow] = useState(false);

    window.addEventListener("scroll", (event) => {
        let scroll = window.scrollY;
        if(windowHeight - scroll < 300) {
            setShow(true);
        } else {
            setShow(false)
        }
    });;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <>
            {
                show
                &&
                <div className="fixed bottom-20 right-4 opacity-1 duration-500 bg-[white] rounded-[50%] h-[40px] w-[40px] flex items-center justify-center shadow-lg shadow-gray-600 cursor-pointer" onClick={scrollToTop}>
                    <Icon name="top" color="#3790c7"/>
                </div>
            }
        </>
    )
}
