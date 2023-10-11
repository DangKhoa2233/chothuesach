import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
import { setConfirm } from '../../redux/action/homeAction';

export const Confirm = () => {

    // Somethings
    const {t} = useTranslation();
    const dispatch = useDispatch();

    // API
    const {statusConfirm} = useSelector(state=>state.home);


    // Method
    const handleClose = () => {
        dispatch(setConfirm({
            status: 'close'
        }))
    }

    const handleSubmit = () => {
        statusConfirm.method();
    }

    return (
        <>
            {
                statusConfirm?.status
                &&
                <div className="fixed top-0 left-0 w-screen h-screen bg-[#0c0c0c3a] z-[1100] flex items-center justify-center">
                    <div className="bg-white rounded-[10px] px-[20px] py-[10px]">
                        <div className="flex justify-between mb-[30px]">
                            <h3 className="text-[#3790c7] font-bold text-[20px]">{t('confirm')}</h3>
                            <span className="cursor-pointer" onClick={handleClose}>&times;</span>
                        </div>
                        <div className="flex justify-center">
                            <p>{t('areYouSure?')}</p>
                        </div>
                        <div className="flex justify-around mt-[30px]">
                            <button className='flex items-center justify-center bg-[white] py-[7px] px-[30px] rounded-[7px] text-[15px]' type="button" onClick={handleClose}>{t('back')}</button>
                            <button className='flex items-center justify-center bg-[#3790c7] text-white py-[7px] px-[30px] rounded-[7px] duration-300 hover:shadow-[#3790c7a6] hover:shadow-lg hover:translate-y-[-3px] text-[15px]' onClick={handleSubmit}>{t('confirm')}</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
