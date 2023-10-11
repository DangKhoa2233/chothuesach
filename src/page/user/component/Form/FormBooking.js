import React, {useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from '../../../../assets/icon';
import { useTranslation } from 'react-i18next';
import moment from 'moment/moment';

export const FormBooking = (props) => {
    // Props
    const {formField, initialValue, validationSchema, methodSubmit, methodCancel, data} = props;

    const {t} = useTranslation();

    // Form
    const {setValue, watch, formState: { errors }, handleSubmit, register, getValues} = useForm({
        mode: 'onChange',
        defaultValues: initialValue,
        resolver: yupResolver(validationSchema),
    });

    useEffect(()=> {
        // if(getValues('soNgay') > 0 ) {
            setValue('tongGia', (getValues('soNgay') * data.giaThueNgay).toLocaleString());
        // }
    }, [getValues('soNgay')]);

    // Method
    const renderInput = () => {
        // ES6
        return formField.map((item, index)=> {
            return (
                <div className='w-[80%] mb-[10px]'>
                    <h5 className='mb-[7px] text-[17px]'>* {item.name}:</h5>
                    <div className={`border-[1px] border-solid border-[#b4b4b4] rounded-[5px] px-[15px] py-[5px] relative ${errors?.[item.name]?.message ? 'border-orange-400' : ""}`}>
                        <input 
                            key={index} 
                            type={item.type} 
                            name={item.name}
                            placeholder={`Điền vào ${item.name}...`} 
                            className={`w-[95%] outline-none text-[15px]`}
                            {...register(`${item.name}`)}
                            readOnly={item.readOnly}
                            min={item.type === "date" && moment(new Date()).format('YYYY-MM-DD').toString()}
                        />
                        {

                            errors?.[item.name] && item.type != 'date' && <div className='absolute right-2 md:right-4 top-[50%] translate-y-[-50%]'>
                                <span className="hover-span">
                                    <Icon color="#c80000" name="warning"/>
                                </span>
                                <span className='absolute right-[110%] top-0 bg-[white] w-[max-content] rounded-[20px] border-[1.5px] border-solid border-orange-400 text-orange-400 px-[10px] text-[12px] z-[2] hidden'>{errors?.[item.name]?.message}</span>
                            </div>
                        }
                    </div>
                </div>
            )
        })
    }

    const handleSubmitData = () => {
        methodSubmit(watch())
    }

    // Return
    return (
        <form className='w-full flex flex-col justify-between items-center' onSubmit={handleSubmit(handleSubmitData)}>
            <div className="flex max-h-[470px] overflow-y-scroll">
                <div className="w-[60%]">
                    {renderInput()}
                </div>
                <div className="w-[40%] grid grid-rows-3 gap-[20px]">
                    <img src={data?.image} className="rounded-[10px]"/>
                    <div className="mt-[20px]">
                        <p>{data?.tenPhong}</p>
                        <div className="flex text-[gray] mt-[5px] text-[13px] translate-x-[-5px]">
                            <Icon name="location"/>
                            <span className="ml-[5px]">{data?.diaChi}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-[20px] xl:mt-[40px] w-[70%] grid grid-cols-2 gap-3'>
                <button className='flex items-center justify-center bg-[white] py-[12px] rounded-[7px]' type="button" onClick={methodCancel}>{t('cancel')}</button>
                <button className='flex items-center justify-center bg-[#3790c7] text-white py-[12px] rounded-[7px] duration-300 hover:shadow-[#3790c7a6] hover:shadow-lg hover:translate-y-[-3px]' type="submit">{t('booking')}</button>
            </div>
        </form>
    )
}
