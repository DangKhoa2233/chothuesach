import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

export const FormAddRoom = (props) => {

    // Props
    const {arrRoom, setValue, handleOpenChange} = props;

    console.log('arrRoom', arrRoom)

    // Somethings
    const {t} = useTranslation();   

    // Form

    const validationSchema = yup.object().shape({
        soPhong: yup.number().typeError('Please input number').required(),
        tinhTrang: yup.string().required(),
    })

    const {register, getValues, error, formState: {errors}, handleSubmit} = useForm({
        method: 'onChange',
        resolver: yupResolver(validationSchema)
    })  

    // Method
    const handleSubmitData = () => {
        let a = new Object();
        a = {...a, tinhTrang: getValues('tinhTrang') === 'true' ? true : false, soPhong: parseInt(getValues('soPhong'))};
        setValue('soLuongPhong', [...arrRoom, a]);
        handleOpenChange(false);
    }

    // Return
    return (
        <form className="py-[10px]">
            <div className="mb-[5px]">
                <h5 className="mb-[5px]">
                    {t('soPhong')}
                    <span className="text-[red]">*</span>
                </h5>
                <input {...register('soPhong')} type="number" min={100} className={`border-[1px] border-solid border-[#b4b4b4] ${errors?.soPhong?.message ? 'border-orange-400' : ""} rounded-[5px] px-[10px] py-[5px] outline-none w-full`}/>
            </div>
            <div className="mb-[10px]">
                <h5 className="mb-[5px]">
                    {t('tinhTrang')}
                    <span className="text-[red]">*</span>
                </h5>
                <select {...register('tinhTrang')} className={`border-[1px] border-solid border-[#b4b4b4] rounded-[5px] px-[10px] py-[5px] ${errors?.tinhTrang?.message ? 'border-orange-400' : ""} outline-none w-full`}>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </select>
            </div>
            <div className="flex justify-end items-center">
                <button className='flex items-center justify-center bg-[#3790c7] text-white py-[5px] px-[10px] rounded-[7px] duration-300 hover:shadow-[#3790c7a6] hover:shadow-lg hover:translate-y-[-3px]' type="button" onClick={handleSubmitData}>{t('save')}</button>
            </div>
        </form>
    )
}
