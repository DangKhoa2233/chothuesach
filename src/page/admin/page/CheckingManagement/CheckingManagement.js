import { collection, onSnapshot } from 'firebase/firestore';
import React, { useMemo, useState } from 'react'
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Confirm } from '../../../../component/Confirm/Confirm';
import { db } from '../../../../firebase/firebase.config';
import { cancelBooking, getAllBooking, updateBooking } from '../../../../redux/action/bookingAction';
import { setConfirm } from '../../../../redux/action/homeAction';
import { getSoLuongPhong } from '../../../../redux/action/phongAction';
import { FormUpdate } from '../../shareComponent/form/FormUpdate';
import { ModalEdit } from '../../shareComponent/modal/ModalEdit';
import { TableMain } from '../../shareComponent/table/TableMain'
import { columns, columnsEdit, getDataPhong, getDataTable, validationSchemaEditChecking } from './helper';

export const CheckingManagement = () => {

    // State
    const [dataEdit, setDataEdit] = useState({});
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [dataPhong, setDataPhong] = useState([]);
    const [defaultValue, setDefaultValue] = useState({});

    // Somethings
    const {t} = useTranslation();
    const dispatch = useDispatch();

    // Effect
    useEffect(()=> {
        dispatch(getAllBooking());
    }, []);

    useEffect(()=> {
      onSnapshot(collection(db,'phieuDatPhong'), (snapShot) => {
        dispatch(getAllBooking())
      });
    }, [])

    // API 
    const { listAllPhieuDatPhong } =  useSelector(state=>state.booking);

    const data = useMemo(()=> 
        getDataTable(listAllPhieuDatPhong)
    , [listAllPhieuDatPhong]);

    useEffect(async()=> {
        if(isModalEditOpen) {
            const data = await dispatch(getSoLuongPhong(dataEdit.idPhong))
            setDataPhong(data)
        }
    }, [isModalEditOpen])


    // Method
    const handleEdit = (data) => {
        console.log('dât eidt', data)
        setDataEdit(data);
        setDefaultValue({
            email: data?.email,
            tongGia: data?.tongGia
        })
        setIsModalEditOpen(true);
    }

    const handleDelete = async (data) => {
        await dispatch(setConfirm({
            status: 'open',
            method: async () => await dispatch(cancelBooking({
                data: data
            })).then(data=> {

            }).catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Xoá thất bại !',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true
                })
            })
        }))
    }

    return (
        <>
            <div className="h-[12%] flex justify-between items-center">
                <h3 className="text-[20px] text-[#3790c7] font-bold">{t('Checking Management')}</h3>
            </div>
            <div className="h-[88%]">
                <TableMain data={data} columns={columns} handleEdit={handleEdit} handleDelete={handleDelete}/>
            </div>
            <ModalEdit
                methodCancel={()=>setIsModalEditOpen(false)}
                title={t('Edit Booking Management ')}
                isOpen={isModalEditOpen}
                childrenForm={
                    <FormUpdate
                        columns={columnsEdit(dataPhong)} 
                        methodCancel={()=>setIsModalEditOpen(false)} 
                        methodSubmit={updateBooking}
                        validationSchema={validationSchemaEditChecking}
                        dataEdit={dataEdit}
                        defaultValue={defaultValue}
                    />
                }
            />
            <Confirm/>
        </>
    )
}
