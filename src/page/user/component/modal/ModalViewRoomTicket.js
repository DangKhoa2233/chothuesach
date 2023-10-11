import { Modal } from 'antd'
import moment from 'moment';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { Icon } from '../../../../assets/icon';

export const ModalViewRoomTicket = (props) => {

    // props
    const {methodCancel, dataPhong, dataTicket, isModalOpen} = props;

    // Somethings
    const {t} = useTranslation();

    // Return
    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-[100]" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] rounded-[10px] bg-[white]">
                <div className="backdrop-blur-md px-[15px] md:px-[30px] py-[20px] h-full rounded-[10px]">
                    <div className='flex items-center justify-between mb-[30px]'>
                        <h3 className='text-[20px] md:text-[25px] font-[500] text-[#3790c7]'>{dataPhong.tenPhong}</h3>
                        <span className='text-[25px] md:text-[30px] font-[500] translate-y-[-5px] text-[#3790c7] cursor-pointer' onClick={methodCancel}>&times;</span>
                    </div>
                    <div className="grid grid-cols-4">
                        <div className="col-span-2">
                            <img src={dataPhong.image} className="rounded-[10px]"/>
                        </div>
                        <div className="col-span-2 pl-[10px] md:pl-[40px] grid grid-rows-5 gap-[10px]">
                            <div className="flex items-center">
                                <Icon name="key" color="#edc900"/>
                                <p className="text-[13px] md:text-[15px] ml-[10px] md:ml-[15px]">{dataTicket.idPhieuDatPhong}</p>
                            </div>
                            <div className="flex items-center">
                                <Icon name="swatch" color="#004db2"/>
                                <p className="text-[13px] md:text-[15px] ml-[10px] md:ml-[15px]">{dataTicket.soPhong}</p>
                            </div>
                            <div className="flex items-center">
                                <Icon name="calendar" color="#c94f12"/>
                                <p className="text-[13px] md:text-[15px] ml-[10px] md:ml-[15px]">{moment(dataTicket.ngayBatDauThue).format('DD-MM-YYYY')}</p>
                            </div>
                            <div className="flex items-center">
                                <Icon name="clock" color="#0f8700"/>
                                <p className="text-[13px] md:text-[15px] ml-[10px] md:ml-[15px]">{dataTicket.soNgay} {dataTicket.soNgay > 1 ? t('days') : t('day')}</p>
                            </div>
                            <div className="flex items-center">
                                <Icon name="card" color="#eba327"/>
                                <p className="text-[13px] md:text-[15px] ml-[10px] md:ml-[15px]">{dataTicket.tongGia} VND</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
