import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Icon } from '../../../assets/icon';
import { useNavigate } from 'react-router-dom';

export const AdminInfo = (props) => {

    const {data} = props;

    // State
    const [isActive, setIsActive] = useState(false);

    // Somethings
    const {t} = useTranslation();
    const navigate = useNavigate();

    // Method
    const handleClick = () => {
        setIsActive(!isActive);
    }

    const handleLogout = () => {
        localStorage.removeItem('jwtAdmin');
        navigate('/admin/login')
    }

    // Return
    return (
        <div className="ml-[30px] relative">
            <div className="flex items-center">
                <span>{'Admin'}</span>
                <img className='w-[60px] md:w-[60px] ml-[10px] cursor-pointer' src="https://i.seadn.io/gae/qJxeLyPWfxm-feoHxG7qB-ntOYFj1hW-zaH7ARQoEElPDdD5FyN0NDqMROtpLia33q4y-lUj0kmRlcGhESJsh7sd8hpMDqVbItAuyOs?auto=format&w=1000" onClick={handleClick}/>
            </div>
            {
                isActive
                &&
                <div className="absolute top-[105%] rounded-[5px] right-0 min-w-max bg-white shadow-lg shadow-gray-400 z-[100] cursor-pointer p-[7px]" 
                onClick={handleLogout}>
                    <div className="rounded-[5px] p-[7px] w-full flex items-center duration-200 hover:bg-gray-100">
                        <Icon name="logOut"/>
                        <span className="ml-[8px]">{t('logOut')}</span>
                    </div>
                </div>
            }
        </div>
    )
}
