import React from 'react'
import { ButtonMenu } from '../shareComponent/ButtonMenu/ButtonMenu'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const ListMenu = () => {

    const {t} = useTranslation();

    const navigate = useNavigate();

    const APIMenu = [
        {
            name: `${t('aboutUs')}`,
            icon: 'check',
            method: () => {
                navigate('introduce');
            }
        },
        {
            name: `${t('booking')}`,
            icon: 'calendar',
            method: () => {
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
                navigate('service');
            }
        },
        {
            name: `${t('contact')}`,
            icon: 'phone',
            method: () => {
                  navigate('contact');
            }
        },
    ]

    const renderMenu = () => {
        return APIMenu.map((item,index)=> {
            return <ButtonMenu data={item} key={index}/>
        })
    }

    return (
        <ul className='flex items-center justify-between'>
            {
                renderMenu()
            }
        </ul>
    )
}
