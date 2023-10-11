import { Modal, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { layDuLieuDanhGiaPhong } from '../../../../../../redux/action/danhGiaAction';
import { Reaction } from '../../../../../user/component/Reaction';
import { NoneInfo } from '../../../../../user/shareComponent/NoneInfo';

export const ModalEditReaction = (props) => {

    // Props
    const {title, isOpen, childrenForm, methodCancel, idRoom} = props;

    // State
    const [isSkeleton, setIsSkeleton] = useState(false);
    const [arrDanhGia, setArrDanhGia] = useState([]);

    const dispatch = useDispatch();
    const {t} = useTranslation();

    useEffect(async()=> {
        setIsSkeleton(true);
        setTimeout(()=> {
            setIsSkeleton(false);
        }, 500) 
        const res = await dispatch(layDuLieuDanhGiaPhong(idRoom));

        console.log('res', res);
        setArrDanhGia(res);

    }, [idRoom])


    // Method
    const renderDanhGia = () => {
        if(arrDanhGia.length > 0) {
            return arrDanhGia?.map((item, index)=> {
                return <Reaction data={item}/>
            })
        } else {
            return <div className="h-[120px] flex items-center justify-center">
                <NoneInfo content={t('noneReaction')}/>
            </div>
        }
    }

    // Return
    return (
        <Modal title={title} open={isOpen} onCancel={methodCancel} footer={null} width={950}>
            {childrenForm}

            {
                isSkeleton
                ?
                <Skeleton />
                :
                <div className="grid grid-cols-1 gap-[10px]">
                    {renderDanhGia()}
                </div>
            }
        </Modal>
    )
}
