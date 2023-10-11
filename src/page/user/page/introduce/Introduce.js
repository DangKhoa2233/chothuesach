import React, { useEffect, useRef } from 'react'
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSelector } from 'react-redux';
import { TypeAnimation } from 'react-type-animation';
import { useTranslation } from 'react-i18next';
gsap.registerPlugin(ScrollTrigger);

export const Introduce = () => {

    const logo = useRef();
    const nameLogo = useRef();

    const {t} = useTranslation();

    const {listRoom} = useSelector(state=>state.phong);


    useEffect(()=> {

        // GSAP
        gsap.from(logo.current, {
            x: 700, 
            duration: 1,
            scrollTrigger: {
                trigger: logo.current,
                toggleActions: "restart resume resume resume"
            }
        })
        gsap.from(nameLogo.current, {
            x: -700, 
            duration: 1,
            scrollTrigger: {
                trigger: nameLogo.current,
                toggleActions: "restart resume resume resume"
            }
        })

        gsap.from(".img-first", {
            x: 100, 
            opacity: 0,
            duration: 1,
            delay: 0.5,
            scrollTrigger: {
                trigger: ".img-first",
                toggleActions: "restart resume resume resume"
            }
        })

        gsap.from(".text-first", {
            x: 50, 
            opacity: 0,
            duration: 1,
            delay: 0.75,
            scrollTrigger: {
                trigger: ".text-first",
                toggleActions: "restart resume resume resume"
            }
        })

        gsap.from(".img-two", {
            x: -100, 
            opacity: 0,
            duration: 1,
            delay: 1.5,
            scrollTrigger: {
                trigger: ".img-two",
                toggleActions: "restart resume resume resume"
            }
        })

        gsap.from(".text-two", {
            x: -50, 
            opacity: 0,
            duration: 1,
            delay: 1.75,
            scrollTrigger: {
                trigger: ".text-two",
                toggleActions: "restart resume resume resume"
            }
        })
    }, [])

    useEffect(()=> {
        if(listRoom.length > 0) {
            return listRoom.map((item, i)=> {
                return gsap.from(`.img-${i}`, {
                    y: 50,
                    duration: 1,
                    delay: (0.25 + (i/4)),
                    opacity: 0,
                    scrollTrigger: {
                        trigger: `.img-${i}`,
                        toggleActions: "restart resume resume resume"
                    }
                })
            })
        }
    }, [listRoom])

    const renderPhong = () => {
        return listRoom?.map((item, index) => {
            return <img src={item.image} className={`w-full h-[80px] md:h-[120px] lg:h-[170px] rounded-[10px] md:rounded-[20px] img-${index}`}/>
        })
    }

    return (
        <div className="w-full top-0 left-0 overflow-x-hidden">
            <div className="w-full relative h-[50vh] md:h-[90vh]">
                <video autoPlay={true} loop muted controls={false} id="myVideo" className='absolute w-full h-full top-0 left-0 -z-1 object-cover'>
                    <source src="/video/videotest.mp4" type="video/mp4"/>
                </video>
                <div className='absolute w-full h-full top-0 left-0 z-1 bg-[#00000057] flex py-[50px]'>
                    <div className="flex items-center justify-center flex-1" ref={nameLogo}>
                        <h4 className="text-[white] lg:text-[30px]">FLY ROOM</h4>
                    </div>
                    <div className="flex items-center justify-center flex-1">
                        <img src='/images/fly.png' className="w-[180px] md:w-[270px] lg:w-[300px]" ref={logo}/>
                    </div>
                </div>
            </div>
            {/* <div className="py-[50px] h-[90vh] md:py-[80px] lg:py-[100px] w-full flex bg-[#3790c7]">
                <div className="flex items-center justify-center flex-1" ref={nameLogo}>
                    <h4 className="text-[white] lg:text-[30px]">FLY ROOM</h4>
                </div>
                <div className="flex items-center justify-center flex-1">
                    <img src='/images/fly.png' className="w-[180px] md:w-[270px] lg:w-[300px]" ref={logo}/>
                </div>
            </div> */}
            <div className="py-[100px] lg:py-[150px] w-full px-[20px]">
                <div className="flex items-center justify-center">
                    <TypeAnimation
                        sequence={[
                            // Same String at the start will only be typed once, initially
                            `${t('variousTypesOfRoomsForFriends')}`,
                            1500,
                            `${t('variousTypesOfRoomsForFamily')}`,
                            1500,
                            `${t('variousTypesOfRoomsForCouples')}`,
                            1500,
                        ]}
                        speed={20}
                        style={{ fontSize: '2em' }}
                        repeat={Infinity}
                    />
                </div>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[10px] mt-[70px] md:gap-[20px] heheh p-[10px] md:p-[20px]">
                    {
                        renderPhong()
                    }
                </div>
            </div>
            <div className="grid grid-cols-5 py-[70px] lg:py-[100px] w-full px-[10px] lg:px-[40px]">
                <div className="flex col-span-2 items-center justify-center">
                    <img src="https://images.pexels.com/photos/14417229/pexels-photo-14417229.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" className="w-[200px] h-[350px] lg:w-[300px] lg:h-[500px] xl:w-[350px] xl:h-[560px] img-first"/>
                </div>
                <div className="flex flex-col justify-between col-span-1">
                    <p className="text-left text-first">{t('neoclassicalArchitecture')}</p>
                    <p className="text-end text-two">{t('fullFacilities')}</p>
                </div>
                <div className="flex col-span-2 items-center justify-center">
                    <img src="https://images.pexels.com/photos/2417842/pexels-photo-2417842.jpeg?auto=compress&cs=tinysrgb&w=400" className="w-[200px] h-[350px] lg:w-[300px] lg:h-[500px] xl:w-[350px] xl:h-[560px] img-two"/>
                </div>
            </div>
        </div>
    )
}
