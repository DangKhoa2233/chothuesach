import React from 'react'
import { useForm } from 'react-hook-form';
import { setConfirm } from '../../../../redux/action/homeAction';
import * as yup from 'yup';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Icon } from '../../../../assets/icon';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateUser } from '../../../../redux/action/accountAction';
import Swal from 'sweetalert2';

const APIColumns = [
    {
        name: 'id',
        type: 'string',
        required: true,
        readOnly: true,
    },
    {
        name: 'userName',
        type: 'string',
        required: true,
        readOnly: true,
    },
    {
        name: 'password',
        type: 'string',
        required: true
    },
    {
        name: 'email',
        type: 'string',
        required: true
    },
]

export const ModalEditProfile = (props) => {

    // Props
    const {methodSubmit, methodCancel, isOpen, childrenForm, title, dataEdit} = props;

    // Something
    const {t} = useTranslation();
    const dispatch = useDispatch();

    // Effect
    useEffect(()=> {
        if(dataEdit) {
            APIColumns.map((item)=> {
                return setValue(`${item.name}`, dataEdit?.[item.name]);
            });
            setValue('loaiTaiKhoan', dataEdit?.loaiTaiKhoan)
        }
    }, [dataEdit])

    // Form
    const {register, setValue, getValues, watch, formState: {errors}, handleSubmit} = useForm({
        method: 'onChange',
        resolver: yupResolver(yup.object().shape({
            password: yup.string().required('Please input'),
            email: yup.string().email('Please input abc@gmail.com').required('Please input'),
        }))
    })

    const handleSubmitConfirm = async () => {
        await dispatch(updateUser({
            data: watch()
        })).then((clg)=> {
            if(clg) {
                // reset();
                // methodCancel();
            }
        }).catch((err)=> {
            Swal.fire({
                icon: 'error',
                title: 'Cập nhật thất bại !',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            })
        })
    }

    const submitForm = async () => {
        await dispatch(setConfirm({
            status: 'open',
            method: handleSubmitConfirm
        }))
    }

    const renderInput = (item) => {
        if(item.type==='string') {
            return <div className={`border-[1px] border-solid border-[#b4b4b4] rounded-[5px] px-[15px] py-[7px] relative ${errors?.[item.name]?.message ? 'border-orange-400' : ""} ${item.readOnly ? 'bg-gray-200' : 'bg-[white]'}`}>
                <input 
                    // key={index} 
                    type={item.type} 
                    name={item.name}
                    placeholder={`Điền vào ${item.name}...`} 
                    className={`w-[95%] outline-none ${item.readOnly ? 'bg-gray-200' : 'bg-[white]'}`}
                    {...register(`${item.name}`)}
                    readOnly={item.readOnly}
                />
                {
                    errors?.[item.name] && <div className='absolute right-2 md:right-4 top-[50%] translate-y-[-50%]'>
                        <span className="hover-span">
                            <Icon color="#c80000" name="warning"/>
                        </span>
                        <span className='absolute right-[110%] top-0 bg-[white] w-[max-content] rounded-[20px] border-[1.5px] border-solid border-orange-400 text-orange-400 px-[10px] z-[2] hidden'>
                            {errors?.[item.name].message}
                        </span>
                    </div>
                }
            </div>
        } else if (item.type === "select") {
            return <div className={`border-[1px] border-solid border-[#b4b4b4] rounded-[5px] px-[15px] py-[7px] relative ${errors?.[item.name]?.message ? 'border-orange-400' : ""}`}>
                <select className="w-full outline-none" {...register(`${item.name}`)}>
                    {
                        item.dataSelect?.map((item, index) => {
                            return <option value={item.value}>{item.label}</option>
                        })
                    }
                </select>
            </div> 
        } 
    }

    // Return
    return (
        <Modal title={title} open={isOpen} footer={null} width={700} onCancel={methodCancel}>
            <form onSubmit={handleSubmit(submitForm)}>
                <div className="grid grid-cols-2 gap-[20px]">
                    {
                        APIColumns?.map((item, index) => {
                            return <div className={`${item.size === 'full' ? 'grid-span-2' : 'col-span-1'}`}>
                                <div className="flex"> 
                                    <h5 className="mb-[5px]">{t(`${item.name}`)}</h5>
                                    {
                                        item.required 
                                        &&
                                        <span className="text-[red] ml-[5px]">*</span>
                                    }
                                </div>
                                {renderInput(item)}
                            </div>
                        })
                    }
                </div>
                <div className="flex justify-end items-center mt-[50px]">
                    <button className='flex items-center justify-center bg-[white] py-[10px] px-[30px] rounded-[7px]' type="button" onClick={methodCancel}>{t('back')}</button>
                    <button className='flex items-center justify-center bg-[#3790c7] text-white py-[10px] px-[30px] rounded-[7px] duration-300 hover:shadow-[#3790c7a6] hover:shadow-lg hover:translate-y-[-3px]' type="submit">{t('add')}</button>
                </div>
            </form>
        </Modal>
    )
}
