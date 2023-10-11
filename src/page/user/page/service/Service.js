import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '../../../../assets/icon/index';
import { useDispatch, useSelector } from 'react-redux'; 
import { getAllDichVu } from '../../../../redux/action/dichVuAction';
import { InfoService } from '../../shareComponent/InfoService';

export const Service = () => {


    // Somethings
    const {t} = useTranslation();

    const dispatch = useDispatch();

    // Effect
    useEffect(()=> {
        dispatch(getAllDichVu());
    }, [])

    
    // API
    const { listDichVu } = useSelector(state=>state.dichVu);

    // Method
    const renderService = () => {
        return listDichVu?.map((item, index) => {
           return <InfoService data={item} key={index}/>  
        })
    }


    // Return
    return (
        <div className="flex justify-center pb-[60px] pt-[40px] flex-col items-center">
            <div className="flex justify-center items-center">
                <Icon name="service" color="#3790c7"/>
                <h5 className="text-[#3790c7] text-[25px] ml-[20px] font-[500]">{t('service')}</h5>
            </div>
            <div className="w-[90%] md:w-[87%] xl:w-[85%] 2xl:w-[70%] grid grid-cols-2 gap-[15px] md:gap-[30px] md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 shadow-lg shadow-gray-300 rounded-[20px] p-[15px] md:p-[30px]">
                {renderService()}
            </div>
        </div>
    )
}
