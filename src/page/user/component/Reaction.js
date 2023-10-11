import React from 'react';
import { Avatar, Tooltip } from 'antd';
import { formateDate } from '../../../method/formatDate';
import { Icon } from '../../../assets/icon';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

export const Reaction = (props) => {

    // Props
    const {data} = props;

    // Somethings
    const {t} = useTranslation();

    // Method
    const renderSoSao = () => {
        let arr = [];
        for(let i = 0; i < data?.soSao; i++) {
            arr.push({}); 
        }
        return arr.map((item, index)=> {
            return <Icon name="star" fill="#ffd902" font="small" key={index}/>
        })
    }

    const handleLikeReaction = () => {
        Swal.fire({
            icon: 'info',
            iconColor: '#3790c7',
            title: `${t('FuncIsDev')}`,
            confirmButtonColor: '#3790c7',
            confirmButtonText: `${t('ok')}`,
            timer: 3000,
            timerProgressBar: true
        })
    }

    const handleReplyReaction = () => {
        Swal.fire({
            icon: 'info',
            iconColor: '#3790c7',
            title: `${t('FuncIsDev')}`,
            confirmButtonColor: '#3790c7',
            confirmButtonText: `${t('ok')}`,
            timer: 3000,
            timerProgressBar: true
        })
    }

    // Return
    return (
        <div className="bg-[#f4f7f8] p-[10px] rounded-[15px]">
            <div className="flex items-start">
                <Avatar  size={40} style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>{data?.infoKhachHang?.userName?.toString().toUpperCase().charAt(0)}</Avatar>
                <div className="ml-[8px] h-max">
                    <h5 className="text-[11px] md:text-[13px] font-bold">{data?.infoKhachHang?.userName}</h5>
                    <p className="text-[10px] md:text-[12px]">{formateDate(data?.createAt?.seconds)}</p>
                </div>
                <div className="flex">
                    {renderSoSao()}
                </div>
            </div>
            <p className="bg-[#14557e] text-white rounded-[15px] py-[7px] px-[15px] mt-[8px] mx-[10px] text-[12px] md:text-[14px]">{data?.binhLuan}</p>
            {/* <span className="text-[10px] md:text-[12px] ml-[5px]">{formateDate(data?.createAt?.seconds)}</span> */}
            <div className="flex items-center mt-[10px]">
                <Tooltip placement="top" title={t('like')}>
                    <button className="mx-[10px]" onClick={handleLikeReaction}>
                        <Icon name="like" font="small"/>
                    </button>
                </Tooltip>
                <Tooltip placement="top" title={t('reply')}>
                    <button className="mx-[10px]"  onClick={handleReplyReaction}>
                        <Icon name="reply" font="small"/>
                    </button>
                </Tooltip>
            </div>
        </div>
    )
}
