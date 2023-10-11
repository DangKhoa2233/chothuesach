import React, { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../assets/icon';

export const ProfileTab = (props) => {

    // Props
    const {setIsProfile, isProfile} = props;

    // Somethings
    const ref = useRef();
    const {t} = useTranslation();
    const navigate = useNavigate();

    // Handle click outside => turn off profile tab
    useEffect(() => {
        const checkIfClickedOutside = e => {
          // If the menu is open and the clicked target is not within the menu,
          // then close the menu
          if (isProfile && ref.current && !ref.current.contains(e.target)) {
            setIsProfile(false)
          }
        }
    
        document.addEventListener("mousedown", checkIfClickedOutside)
    
        return () => {
          // Cleanup the event listener \
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [setIsProfile])

    // API
    const {userInfo} = useSelector(state=>state.account);

    // Method
    const handleViewProfile = () => {
      navigate('profile');
      setIsProfile(false);
    }

    const handleLogOut = () => {
      localStorage.removeItem("jwt");
      localStorage.removeItem("userLogin");
      window.location.reload();
    }

    // Return
    return (
        <div className="fixed top-0 left-0 w-screen h-screen z-[998] bg-[#0303038f]">
            <div className="bg-white h-full w-[70%] md:w-[60%] lg:w-[30%] p-[20px] md:p-[30px] absolute fadeOn" ref={ref}>
                <div className="bg-gray-100 rounded-[10px] py-[10px] px-[15px] flex cursor-pointer" onClick={handleViewProfile}>
                    <img className="w-[60px] h-[60px] rounded-[50%]" src="https://img5.thuthuatphanmem.vn/uploads/2022/01/12/anh-tokuda-dep-nhat_101702809.jpg"/>
                    <div className="ml-[20px] flex flex-col justify-center">
                        <h5 className="text-[17px]">{userInfo?.userName}</h5>
                        <span className="text-[14px] text-gray-500 hover:underline">{t('seeProfile')}</span>
                    </div>
                </div>
                <div className='p-[20px]'>
                  <div className="flex items-center cursor-pointer" onClick={handleLogOut}>
                    <Icon name="logOut"/>
                    <span className="ml-[10px]">{t('logOut')}</span>
                  </div>
                </div>
            </div>
        </div>
    )
}
