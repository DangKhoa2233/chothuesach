import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../assets/icon/index';
import { useTranslation } from 'react-i18next';
import { ReservationTicket } from '../../component/ReservationTicket';
import { getBooking } from '../../../../redux/action/bookingAction';
import { NoneInfo } from '../../shareComponent/NoneInfo';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase.config';

export const BookingSchedule = () => {

    const {t} = useTranslation();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getBooking());

        onSnapshot(collection(db,'phieuDatPhong'), (snapShot) => {
            dispatch(getBooking())
        });
    }, [])

    // API
    const {listPhieuDatPhong} = useSelector(state=>state.booking);

    // Method
    const renderReservationTicket = () => {
        if(listPhieuDatPhong.length > 0) {
            return <div className="grid md:grid-cols-2 grid-cols-1 gap-[30px]">
                {
                    listPhieuDatPhong.map((item, index) => {
                        return <ReservationTicket data={item} key={index}/>
                    })
                }
            </div>
        } else {
            return <NoneInfo content={`${t('youHaveNotBook')}`}/>
        }
    }

    return (
        <div className='w-full flex justify-center items-center'>
            {/* <div className='w-[100%] flex justify-center py-[20px] bg-[#f7f7f7] rounded-t-[20px]'>
                <h3 className='text-[20px]'>Đặt phòng ở đây</h3>
            </div> */}
            <div className='w-full md:w-[95%] lg:w-[80%] 2xl:w-[65%] flex flex-col items-center justify-center py-[40px]'>
                <div className='flex items-center mb-[20px]'>
                    <Icon name="bookMark" color="#3790c7"/>
                    <h3 className='text-[25px] ml-[20px] text-[#3790c7] font-[500]'>{t('reservationTicket')}</h3>
                </div>
                <div className='w-full pt-[20px] pb-[5px] px-[20px] lg:px-[30px]'>
                    {
                        renderReservationTicket()
                    }
                </div>
                {/* <div className="text-[#3790c7]">
                    <div className="cursor-pointer flex items-center text-[15px]">
                        <Icon name="more"/>
                        <span className="ml-[10px]">{t('seeMore')}</span>
                    </div>
                </div> */}
            </div>
        </div>
  )
}
