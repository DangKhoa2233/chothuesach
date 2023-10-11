import React from 'react'
import { Icon } from '../../../../assets/icon'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { ModalEditProfile } from '../../component/modal/ModalEditProfile';
import { Confirm } from '../../../../component/Confirm/Confirm';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase.config';
import { getUser } from '../../../../redux/action/accountAction';
import { useEffect } from 'react';

export const Profile = () => {

    // State
    const [isLock, setIsLock] = useState(true);
    const [isOpenEdit, setIsOpenEdit] = useState(false);

    // Somethings
    const {t} = useTranslation();
    const dispatch = useDispatch();

    // Effect 
    useEffect(()=> {
      onSnapshot(collection(db,'Account'), (snapShot) => {
        dispatch(getUser(userInfo?.id))
      });
    }, [])

    const {userInfo} = useSelector(state=>state.account);

    // Method
    const handleEdit = () => {
      setIsOpenEdit(true);
    }

    // Return
    return (
      <>
        <div className="flex justify-center pb-[60px] pt-[40px] flex-col items-center">
            <div className="flex justify-center items-center">
                <h4 className="text-[#3790c7] text-[25px] md:text-[35px] ml-[20px] font-[500]">{t('profile')}</h4>
            </div>
            <div className="flex justify-center items-center w-full mt-[50px]">
                <div className="rounded-[20px] flex-col sm:flex-row w-[95%] md:w-[90%] lg:w-[80%] xl:w-[60%] shadow-xl bg-[white] shadow-gray-300 flex p-[7px]">
                    <div className="w-full sm:w-[50%] lg:w-[50%] 2xl:w-[55%] p-[20px] flex flex-col justify-evenly items-center">
                        <img src="/images/profile.png"/>
                        <button className='px-[20px] py-[10px] text-white bg-[#A3B409] rounded-[40px] duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-gray-200' onClick={handleEdit}>{t('editProfile')}</button>
                        {/* <FormContact/> */}
                    </div>
                    <div className="w-full sm:w-[50%] lg:w-[50%] 2xl:w-[45%] bg-[#3790c7] rounded-[20px] relative test">
                        <div className='flex items-center justify-between'>
                          <div className='z-[2] relative rounded-r-[50%] mt-[15px] bg-[white] w-fit p-[5px] '>
                              <img src="https://img5.thuthuatphanmem.vn/uploads/2022/01/12/anh-tokuda-dep-nhat_101702809.jpg" className="w-[100px] h-[100px] rounded-[50%]"/>
                          </div>
                          <div className='text-[white] text-center text-[20px] w-[80%]'>Tôi là Tokuda :3</div>
                        </div>
                        <div className="grid grid-cols-1 grid-rows-3 gap-[30px] py-[40px] z-[2] p-[30px] relative">
                            <div className="flex items-center text-[white]">
                                <Icon name="user" color="#fff" font="small" fill="#fff"/>
                                <span className='ml-[10px] text-[12px] lg:text-[14px]'>{userInfo?.userName}</span>
                            </div>
                            <div className="flex items-center text-[white]">
                                {
                                  isLock 
                                  ?
                                  <>
                                    <span onClick={()=> {
                                        setIsLock(!isLock);
                                    }}>
                                      <Icon name="lock" color="#fff" font="small" fill="#fff"/>
                                    </span>
                                    <span className='ml-[10px] text-[12px] lg:text-[14px]'>********</span>
                                  </>
                                  :
                                  <>
                                    <span onClick={()=> {
                                        setIsLock(!isLock);
                                    }}>
                                      <Icon name="unlock" color="#fff" font="small" fill="#fff"/>
                                    </span>
                                    <span className='ml-[10px] text-[12px] lg:text-[14px]'>{userInfo?.password}</span>
                                  </>
                                }
                            </div>
                            <div className="flex items-center text-[white]">
                                <Icon name="mail" color="#fff" font="small" fill="#fff"/>
                                <span className='ml-[10px] text-[12px] lg:text-[14px]'>{userInfo?.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ModalEditProfile
          isOpen={isOpenEdit}
          methodCancel={()=>setIsOpenEdit(false)}
          title={t('editProfile')}
          dataEdit={userInfo}
        />
        <Confirm/>
      </>
    )
}
