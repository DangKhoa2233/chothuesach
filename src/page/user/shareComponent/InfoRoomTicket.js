import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { layDuLieuPhongInfo } from '../../../redux/action/phongAction';
import { Icon } from '../../../assets/icon/index';
import { setLoading } from '../../../redux/action/homeAction';
import { useTranslation } from 'react-i18next';
import { ModalViewRoomTicket } from '../component/modal/ModalViewRoomTicket';

export const InfoRoomTicket = (props) => {

    // Props
    const {idPhong, dataTicket} = props;

    // State
    const [data, setData]= useState([]);
    const [isView, setIsView] = useState(false);

    // Somethings
    const dispatch = useDispatch();
    
    const {t} = useTranslation();

    // Effect
    useEffect(async()=> {
        // dispatch(layDuLieuPhongInfo(id));
        dispatch(setLoading({
            status: 'isLoading'
        }))
        const dataInfo = await layDuLieuPhongInfo(idPhong);
        setData(dataInfo);
        dispatch(setLoading({
            status: 'done'
        }))
    }, [])

    // Method
    const handleShowView = () => {
        setIsView(true);
    }

    const handleCancelModal = () => {
        setIsView(false);
    }

    return (
        <>
            <div className="h-full">
                <Icon name="tag" color="#3790c7"/>
                <div className="h-[130px] md:h-[150px] xl:h-[160px] 2xl:h-[200px] flex mt-[10px]">
                    <img src={data?.image} className="w-[55%] rounded-[10px]"/>
                    <div className="flex flex-col justify-between px-[10px] h-full">
                        <div>
                            <h5 className="w-full overflow-hidden whitespace-nowrap">{data?.tenPhong}</h5>
                            <div className="flex text-[gray] mt-[5px] text-[13px] translate-x-[-5px]">
                                <Icon name="location"/>
                                <span className="ml-[5px] mt-[5px]">{data?.diaChi}</span>
                            </div>
                            <div>
                                {
                                    dataTicket?.tinhTrang
                                    &&
                                    <p className="text-[13px] 2xl:text-[15px] text-[#bc9c0b] mt-[10px] ml-[5px] duration-300 hover:underline" onClick={handleShowView}>{t('view')}</p>
                                }
                            </div>
                        </div>
                        <div>
                            {
                                dataTicket?.tinhTrang
                                ?
                                <div className="flex items-center justify-end">
                                    <span className="w-[5px] h-[5px] rounded-[50%] bg-[green] block mr-[10px]"></span>
                                    <span className="text-[14px] text-[green]">{t('confirmed')}</span>
                                </div>
                                :
                                <div className="flex items-center justify-end">
                                    <span className="w-[5px] h-[5px] rounded-[50%] bg-[orange] block mr-[10px]"></span>
                                    <span className="text-[14px] text-[orange]">{t('check')}</span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                isView 
                &&
                <ModalViewRoomTicket methodCancel={handleCancelModal} dataPhong={data} dataTicket={dataTicket}/>
            }
        </>
  
    )
}
