import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { checkBooking } from '../../../redux/action/bookingAction';
import { ModalBookingService } from '../component/modal/ModalBookingService';

export const InfoService = (props) => {

    // Props
    const { data } = props;

    // State
    const [isBooking, setIsBooking] = useState(false);

    // Something
    const {t} = useTranslation();
    const dispatch = useDispatch();

    // API

    // Method
    const handleBought = async () => {
        if(data?.soLuong > 0) {
            const result = await dispatch(checkBooking());
            if(result) {
                console.log('Thành công');
                setIsBooking(true);
            } else {
                Swal.fire({
                    icon: 'info',
                    iconColor: '#3790c7',
                    title: `${t('youHaveNotBook')}`,
                    timer: 1500,
                    timerProgressBar: true,
                    showConfirmButton: false
                })
            }
        } else {
            Swal.fire({
                icon: 'info',
                iconColor: '#3790c7',
                title: `${t('quantityIsOut')}`,
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false
            })
        }
    }

    // Return
    return (
        <>
            <div className="bg-white rounded-[10px] shadow-md shadow-gray-200 over:shadow-[#5c97bc] duration-300 hover:shadow-xl cursor-pointer flex flex-col justify-between">
                <div style={{backgroundImage: `url(${data?.hinhAnh})`}} className="h-[150px] bg-contain bg-center bg-no-repeat lg:h-[180px] 2xl:h-[200px] w-full rounded-t-[10px]"></div>
                <div className="flex flex-col p-[10px]">
                    <h5 className="font-[500] text-[16px] md:text-[18px] text-center my-[10px]">{data.tenDichVu}</h5>
                    <div className="my-[10px]">
                        <p className="text-gray-500 text-[14px] md:text-[15px]">{data?.moTa}</p>
                    </div>
                </div>
                <div className="flex flex-col items-end p-[10px]">
                    <button 
                        className={`flex items-center mt-[10px] justify-center ${data?.soLuong > 0 ? 'bg-[#3790c7] hover:shadow-[#3790c7a6] hover:shadow-lg' : 'bg-[gray] hover:shadow-lg hover:shadow-gray-400'} text-white py-[12px] px-[20px] rounded-[10px] duration-300`}
                        onClick={handleBought}
                    >
                        {t('bookService')}
                    </button>
                </div>
            </div>
            {
                isBooking 
                &&
                <ModalBookingService
                    setIsBooking={setIsBooking}
                />
            }
        </>
    )
}
