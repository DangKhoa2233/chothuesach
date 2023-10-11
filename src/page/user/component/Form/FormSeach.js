import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Icon } from '../../../../assets/icon';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Popover, Select, Slider } from 'antd';
import qs from 'qs';

export const FormSearch = (props) => {

    // Props
    const {formField, initialValue, validationSchema, methodSubmit} = props;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Dùng để bắt đa ngôn ngữ
    const {t} = useTranslation();

    // Form
    const {setValue, watch, formState: { errors }, handleSubmit, register, getValues} = useForm({
        mode: 'onChange',
        defaultValues: initialValue,
    });

    const handleSearch = () => {
        // Navigate 
        // Chuyển hướng router <> Chuyển hướng trang
        // React-router-dom = window.location.replace
        navigate({
          pathname: 'searchRoom',
          search: `${createSearchParams( qs.stringify({ soNguoi: getValues('soNguoi'), priceFrom: getValues('priceFrom'), priceTo: getValues('priceTo'), soGiuong: getValues('soGiuong') }))}`,
        });
    }


    console.log('watch', watch());



    return (
        <>
            <form className='w-full flex' onSubmit={handleSubmit(handleSearch)}>
                <div className='w-[70%] pr-[10px] xl:w-[60%] grid grid-cols-4 gap-[10px] lg:gap-[20px]'>
                    <div className='flex items-center h-full justify-center rounded-[10px] border-solid border-[1px] border-[#3790c7]'>
                        <Popover content={
                            <div>
                               <Select
                                    defaultValue={1}
                                    style={{ width: '100%' }}
                                    onChange={(value)=>{
                                        // Truyền giá trị lên form để gửi đi
                                        setValue('soGiuong', value)
                                    }}
                                    options={[
                                        { value: 1, label: '1' },
                                        { value: 2, label: '2' },
                                        { value: 3, label: '3' }
                                    ]}
                                />
                            </div>
                        } title={t('soGiuong')} trigger="click">
                            <button type="button" className="bg-[#3790c7] rounded-l-[5px] h-full px-[5px] py-[5px] lg:px-[15px] lg:py-[5px]">
                                    <Icon name="bed" color="#fff" font="small"/>
                            </button>
                        </Popover>
                        <div className="px-[5px] py-[5px] lg:px-[10px] lg:py-[7px] h-full rounded-r-[10px] text-[#3790c7] bg-[white] flex items-center justify-center w-full">{watch('soGiuong')}</div>
                    </div>
                    <div className='flex items-center col-span-2 h-full justify-center rounded-[10px] border-solid border-[1px] border-[#3790c7]'>
                        <button type="button" className="bg-[#3790c7] rounded-l-[5px] h-full px-[15px] py-[5px] hidden lg:block">
                            <Icon name="money" color="#fff"/>
                        </button>
                        <div className="px-[10px] py-[7px] rounded-[10px] lg:rounded-r-[10px] text-[#3790c7] bg-[white] text-center w-full">
                            <Slider marks={{
                                1000000: ' ',
                                2000000: ' ',
                            }} max={3000000} range defaultValue={[0, 1000000]} onChange={(newValue)=> {
                                console.log('newValue', newValue)
                                setValue('priceFrom', newValue[0]);
                                setValue('priceTo', newValue[1]);
                            }} style={{width: '95%', marginBottom: '0 !important'}}/>
                        </div>
                    </div>
                    <div className='flex items-center h-full justify-center rounded-[10px] border-solid border-[1px] border-[#3790c7]'>
                        <Popover content={
                            <div>
                               <Select
                                    defaultValue={2}
                                    style={{ width: '100%' }}
                                    onChange={(value)=>setValue('soNguoi', value)}
                                    options={[
                                        { value: 2, label: '2' },
                                        { value: 4, label: '4' },
                                        { value: 6, label: '6' },
                                    ]}
                                />
                            </div>
                        } title={t('soNguoi')} trigger="click">
                            <button type="button" className="bg-[#3790c7] rounded-l-[5px] h-full px-[5px] py-[5px] lg:px-[15px] lg:py-[5px]">
                                    <Icon name="people" color="#fff" font="small"/>
                            </button>
                        </Popover>
                        <div className="px-[5px] py-[5px] lg:px-[10px] lg:py-[7px] h-full rounded-r-[10px] text-[#3790c7] bg-[white] flex items-center justify-center w-full">{watch('soNguoi')}</div>
                    </div>
                </div>
                <div className='flex justify-end w-[30%] xl:w-[40%]'>
                    <button className='flex items-center justify-center bg-[#3790c7] text-white py-[5px] px-[10px] md:px-[20px] rounded-[7px] duration-300 hover:shadow-[#3790c7a6] hover:shadow-lg hover:translate-y-[-3px]' type="submit">
                        <Icon name="search"/>
                        <span className='ml-[5px] md:ml-[10px] text-[13px] md:text-[16px]'>{t('findAHotel')}</span>
                    </button>
                </div>
            </form>
        </>
    )
}
