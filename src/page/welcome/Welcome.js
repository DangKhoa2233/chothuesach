import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { setLoading } from '../../redux/action/homeAction';

export const Welcome = () => {

    // Chuyển hướng trong router
    const navigate = useNavigate();
    // window.location.replace('/');

    const dispatch = useDispatch();

    const {t} = useTranslation();

    return (
        <div className="bg-[url('https://media.istockphoto.com/id/1138367349/vi/anh/burj-al-arab-m%E1%BB%99t-kh%C3%A1ch-s%E1%BA%A1n-sang-tr%E1%BB%8Dng-%E1%BB%9F-dubai-uae.jpg?s=170667a&w=0&k=20&c=vDpcNackbrn-eiElrN_NrAn2jMq91AB5g_wyEu_rLrk=')] md:bg-[url('https://img5.thuthuatphanmem.vn/uploads/2021/10/20/mau-background-vali-du-lich_110856208.jpg')] bg-cover bg-center h-screen w-full flex flex-col justify-center items-center overflow-hidden">
            <div className="flex items-start justify-center translate-y-[-50%]">
                <div className="flex flex-col">
                    <button 
                        className="px-[20px] py-[10px] rounded-[10px] bg-[#3790c7] text-white my-[15px]"
                        onClick={()=> {
                            dispatch(setLoading({
                                status: 'isLoading'
                            }))
                            setTimeout(()=> {
                                dispatch(setLoading({
                                    status: 'done'
                                }))
                                navigate('/admin');
                            }, 1000)
                        }}
                    >
                        {t("I'mTheAdministrator")}
                    </button>
                    <button  
                        className="px-[20px] py-[10px] rounded-[10px] bg-[#3790c7] text-white"
                        onClick={()=> {
                            dispatch(setLoading({
                                status: 'isLoading'
                            }))
                            setTimeout(()=> {
                                dispatch(setLoading({
                                    status: 'done'
                                }))
                                navigate('/user');
                            }, 1000)
                        }}
                    >
                        {t("I'mACustomer")}
                    </button>
                </div>
            </div>
            <div className="w-screen">
                <div className="welcome-tarot__content w-full text-center">FLY ROOM</div>
                <div className="welcome-tarot__content w-full text-center">FLY ROOM</div>
            </div>
        </div>
    )
}
