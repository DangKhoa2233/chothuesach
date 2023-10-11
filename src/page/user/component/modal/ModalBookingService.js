import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getBooking } from '../../../../redux/action/bookingAction';
import { getInfoRoomFormBooking } from '../../../../redux/action/phongAction';

export const ModalBookingService = (props) => {

    // Props
    const {setIsBooking} = props;

    // Somethings
    const {t} = useTranslation();
    const dispatch = useDispatch();

    // Effect
    useEffect(()=> {
        dispatch(getBooking());
    }, [])


    // API
    const {listPhieuDatPhong} = useSelector(state=>state.booking);

    useEffect(()=> {
        if(listPhieuDatPhong) {
            dispatch(getInfoRoomFormBooking(listPhieuDatPhong));
        }
    }, [listPhieuDatPhong])

    console.log('list', listPhieuDatPhong);

    // Return
    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-[100]" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] bg-white rounded-[10px] px-[30px] py-[20px]">
                <div className='flex items-center justify-between mb-[30px]'>
                    <h3 className='text-[20px] md:text-[25px] font-[500] text-[#3790c7]'>{t('bookService')}</h3>
                    <span className='text-[25px] md:text-[30px] font-[500] translate-y-[-5px] text-[#3790c7] cursor-pointer' onClick={()=> {
                        setIsBooking(false);
                    }}>&times;</span>
                </div>
                <div >
                    {/* <FormBooking
                        initialValue={initialValue} 
                        formField={formField} 
                        validationSchema={validationSchema} 
                        methodSubmit={handleBooking}
                        methodCancel={handleCancel}
                        data={data}
                    /> */}
                </div>
            </div>
        </div>
    )
}
