import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Confirm } from '../../../../component/Confirm/Confirm'
import { deleteDichVu, getAllDichVu } from '../../../../redux/action/dichVuAction'
import { setConfirm } from '../../../../redux/action/homeAction'
import { TableMain } from '../../shareComponent/table/TableMain'
import { ModalCreateService } from './component/modal/ModalCreateService'
import { columns } from './helper'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../../../firebase/firebase.config'

export const ServiceManagement = () => {

    // State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [dataEdit, setDataEdit] = useState({});

    // Somethings
    const {t} = useTranslation();

    const dispatch = useDispatch();

    // Effect
    useEffect(async()=> {
        await dispatch(getAllDichVu());
        onSnapshot(collection(db,'dichVu'), (snapShot) => {
            dispatch(getAllDichVu())
        });
    }, [])

    const {listDichVu} = useSelector(state=>state.dichVu);

    // Method
    const handleEdit = (data) => {
        setDataEdit(data)
        setIsModalEditOpen(true);
    }

    const handleDelete = async (data) => {
        await dispatch(setConfirm({
            status: 'open',
            method: async () => {
                await dispatch(deleteDichVu(data.id));
            }
        }))
    }

    const handleAdd = () => {
        setIsModalOpen(true);
    }

    // Return
    return (
        <>
            <div className="h-[12%] flex justify-between items-center">
                <h3 className="text-[20px] text-[#3790c7] font-bold">{t('Service Management')}</h3>
                <button className='flex items-center justify-center bg-[#3790c7] text-white py-[10px] px-[20px] rounded-[7px] duration-300 hover:shadow-[#3790c7a6] hover:shadow-lg hover:translate-y-[-3px]' type="submit" onClick={handleAdd}>{t('add')}</button>
            </div>
            <div className="h-[88%]">
                <TableMain 
                    data={listDichVu} 
                    columns={columns} 
                    handleEdit={handleEdit} 
                    handleDelete={handleDelete}
                />
            </div>
            {/* <ModalEditRoom
                methodCancel={()=>setIsModalEditOpen(false)}
                title={t('Edit Room Management')}
                isOpen={isModalEditOpen}
                dataEdit={dataEdit}
                childrenForm={
                    <></>
                }
            /> */}
            <ModalCreateService
                methodCancel={()=>setIsModalOpen(false)}
                title={t('Create Service Management')}
                isOpen={isModalOpen}
            />
            {/* <ModalEditReaction
                isOpen={isModalEditReaction}
                methodCancel={()=>setIsModalEditReaction(false)}
                title={t('Edit Reaction')}
                idRoom={dataEdit?.id}
            /> */}
            <Confirm/>
        </>
    )
}
