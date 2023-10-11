import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../assets/icon';

export const InfoRoomSearch = (props) => {

    // Props
    const {data} = props;

    // Something
    const {t} = useTranslation();
    const navigate = useNavigate();

    // Method
    const renderDanhGia = () => {
        let arr = [];
        for(let i = 0; i < data?.danhGia; i++) {
            arr.push({}); 
        }
        return arr.map((item, index)=> {
            return <Icon name="star" fill="#ffd902"/>
        })
    }

    const handleChooseRoom = () => {
        navigate(`/user/infoRoom/${data.id}`)
    }

    // Return
    return (
        <div className="bg-white rounded-[10px] shadow-md shadow-gray-200 over:shadow-[#5c97bc] duration-300 hover:shadow-xl hover:translate-y-[-1px] cursor-pointer" onClick={handleChooseRoom}>
            <img src={data.image} className="h-[150px] lg:h-[180px] 2xl:h-[200px] w-full rounded-t-[10px]"/>
            <div className="flex flex-col items-center p-[10px]">
                <h5 className="font-[500] text-[18px]">{data.tenPhong}</h5>
                <div>
                    <div className="flex items-center">
                        {renderDanhGia()}
                    </div>
                    
                </div>
            </div>
            <div className="flex justify-end p-[10px]">
                {
                    (data?.soLuongPhong?.findIndex((item)=> item?.tinhTrang === false) == -1) || (data?.soLuongPhong?.length === 0)
                    ?
                    <div className="flex items-center justify-end">
                        <span className="w-[5px] h-[5px] rounded-[50%] bg-[orange] block mr-[10px]"></span>
                        <span className="text-[14px] text-[orange]">{t('outOfRoom')}</span>
                    </div>
                    :
                    <div className="flex items-center justify-end">
                        <span className="w-[5px] h-[5px] rounded-[50%] bg-green-500 block mr-[10px]"></span>
                        <span className="text-[14px] text-green-500">{t('haveRoom')}</span>
                    </div>
                }
            </div>
        </div>
    )
}
