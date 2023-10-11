import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Icon } from '../../../assets/icon';

export const MenuMobile = () => {

    const {t} = useTranslation(); 
    const navigate = useNavigate();

    // API
    const APIMenu = [
        {
            name: `${t('aboutUs')}`,
            icon: 'check',
            method: () => {
                // Swal.fire({
                //     icon: 'info',
                //     title: `${t('FuncIsDev')}`,
                //     confirmButtonColor: '#3790c7',
                //     confirmButtonText: `${t('ok')}`,
                //     timer: 2000,
                //     timerProgressBar: true
                //   })
                navigate('introduce')
            }
        },
        {
            name: `${t('booking')}`,
            icon: 'calendar',
            method: () => {
                // alert('xin chào !')
                // dispatch(setLoading({
                //     status: 'isLoading',
                // }))
                // setTimeout(()=> {
                //     dispatch(setLoading({
                //         status: 'done',
                //     }))
                //     navigate('bookingSchedule');
                // }, 1300)
                const jwt = localStorage.getItem('jwt');
                if(jwt) {
                    navigate('bookingSchedule');
                } else {
                    Swal.fire({
                        icon: 'info',
                        title: `${t('youAreNotLoggedIn')}`,
                        timer: 1500,
                        timerProgressBar: true,
                        confirmButtonText: `${t('ok')}`,
                        confirmButtonColor: '#3790c7'
                    })
                }
            }
        },
        {
            name: `${t('service')}`,
            icon: 'service',
            method: () => {
                // Swal.fire({
                //     icon: 'info',
                //     title: `${t('FuncIsDev')}`,
                //     confirmButtonColor: '#3790c7',
                //     confirmButtonText: `${t('ok')}`,
                //     timer: 2000,
                //     timerProgressBar: true
                //   })
                navigate('service');
            }
        },
        {
            name: `${t('contact')}`,
            icon: 'phone',
            method: () => {
                // Swal.fire({
                //     icon: 'info',
                //     title: `${t('FuncIsDev')}`,
                //     confirmButtonColor: '#3790c7',
                //     confirmButtonText: `${t('ok')}`,
                //     timer: 2000,
                //     timerProgressBar: true
                //   })
                navigate('contact')
            }
        },
    ]


    const renderMenu = () => {
        return APIMenu.map((item, index)=> {
            return <div className="flex justify-center">
                <div className="flex flex-col items-center" key={index} onClick={item.method}>
                    <Icon name={item.icon}/>
                    <span>{item.name}</span>
                </div>    
            </div>
        })
    }

    // Return
    return (
        <div className="fixed grid grid-cols-4 items-center bottom-0 left-0 w-screen bg-[white] p-[8px] z-[100]" style={{boxShadow: "rgba(0, 0, 0, 0.5) 0px 5px 20px"}}>
            {renderMenu()}
        </div>
    )
}
