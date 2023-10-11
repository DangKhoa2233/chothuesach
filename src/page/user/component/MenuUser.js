import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChangeLanguage } from './ChangeLanguage'
import { ListMenu } from './ListMenu'
import { MenuMobile } from './MenuMobile'
import { ProfileTab } from './ProfileTab'
import { UserLogin } from './UserLogin'

export const MenuUser = () => {

  const navigate = useNavigate();

  const [isMenuMobile, setIsMenuMobile] = useState(false);
  const [isProfile, setIsProfile] = useState(false);

  // const innerWidth = window.innerWidth;

  window.addEventListener("resize", ()=>{
    const innerWidth = window.innerWidth;
    if(innerWidth < 900) {
      setIsMenuMobile(true);
    } else {
      setIsMenuMobile(false);
    }
  })

  // window.addEventListener("reset", ()=>{
  //   const innerWidth = window.innerWidth;
  //   console.log('innerWidth', innerWidth);
  //   if(innerWidth < 700) {
  //     setIsMenuMobile(true);
  //   } else {
  //     setIsMenuMobile(false);
  //   }
  // })

  useEffect(()=> {
    const innerWidth = window.innerWidth;
    if(innerWidth < 900) {
      setIsMenuMobile(true);
    } else {
      setIsMenuMobile(false);
    }
  }, []);

  // useEffect(()=> {
  //   console.log('innerWidth', innerWidth);
  //   if(innerWidth < 700) {
  //     setIsMenuMobile(true);
  //   } else {
  //     setIsMenuMobile(false);
  //   }
  // }, [innerWidth])

  const returnHome = () => {
    navigate('/user');
  }

  return (
    <>
      <div className='fixed top-0 left-0 z-[99] w-full bg-[white] px-[10px] md:px-[30px] py-[8px] md:py-[5px] 2xl:py-[8px] flex items-center justify-center shadow-lg shadow-gray-200'>
        <div className='w-full xl:w-[90%] 2xl:w-[70%] flex items-center justify-between'>
          <img src="/images/fly.png" className='w-[80px] md:w-[120px] lg:w-[150px] cursor-pointer' onClick={returnHome}/>
          {
            !isMenuMobile
            &&   
            <ListMenu/>
          }
          <ChangeLanguage/>
          <UserLogin setIsProfile={setIsProfile}/>
        </div>
      </div>
      {
        isMenuMobile
        &&   
        <MenuMobile/>
      }
      {
        isProfile
        &&
        <ProfileTab setIsProfile={setIsProfile} isProfile={isProfile}/>
      }
    </>
  )
}
