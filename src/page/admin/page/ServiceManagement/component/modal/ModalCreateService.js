import { Badge, Button, Modal, Popconfirm, Popover, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { Icon } from '../../../../../../assets/icon';
import { UploadOutlined } from '@ant-design/icons';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { app } from '../../../../../../firebase/firebase.config';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../../../../redux/action/homeAction';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { setGridColumn } from '../../helper';
import { createDichVu } from '../../../../../../redux/action/dichVuAction';

export const ModalCreateService = (props) => {

    // Props
    const {title, isOpen, childrenForm, methodCancel} = props;


    // State
    const [image, setImage] = useState(null);

    const [fileImage, setFileImage] = useState(null);

    const [isSkeleton, setIsSkeleton] = useState(false);

    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const {t} = useTranslation();


    // Effect
    useEffect(()=> {
        setIsSkeleton(true);
        setTimeout(()=> {
            setImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDF9695aEHL20tZNMzJ26nIGr5AYMKr_eaoxXWtDkngU8M8KXhqPQXkhyamMWJ1mvbeYU&usqp=CAU')
            setIsSkeleton(false);
        }, 500) 
    }, [isOpen]);

    // Form 
    const APIEdit = [
        {
            name: 'tenDichVu',
            type: 'string',
            required: true,
            size: '2'
        },
        {
            name: 'loaiDichVu',
            type: 'select',
            dataSelect: [
                {
                    label: 'Drinking water',
                    value: 'Drinking water'
                },
                {
                    label: 'Food',
                    value: 'Food'
                },
            ],
            required: true,
        },
        {
            name: 'giaDichVu',
            type: 'string',
            required: true,
        },
        {
            name: 'soLuong',
            type: 'string',
            required: true,
        },
        {
            name: 'sale',
            type: 'string',
            required: true,
        },
    ]

    const validationSchema = yup.object().shape({
        tenDichVu: yup.string().required('Please input'),
        loaiDichVu: yup.string().required('Please input'),
        giaDichVu: yup.number().typeError('Please input number').required('Please input'),
        sale: yup.number().typeError('Please input number').required('Please input'),
        soLuong: yup.number().typeError('Please input number').required('Please input'),
        moTa: yup.string().required('Please input'),
    })

    const {
        register,
        getValues,
        setValue,
        handleSubmit,
        reset, 
        watch,
        formState: {errors}
    } = useForm({
        method: 'onChange',
        resolver: yupResolver(validationSchema),
        defaultValues: {
            tenDichVu: "",
            loaiDichVu: "Drinking water",
            giaDichVu: 100000,
            sale: null,
            soLuong: 1,
            moTa: ""
        }
    })

    // Method
    const handleChangeImage = async (e) => {
        dispatch(setLoading({
            status: 'isLoading'
        }))
        const file = e.target.files[0];
        setImage(file);
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event)=>{
            setImage(event.target.result);
            setValue('hinhAnh', event.target.result);
        }
        const storageRef = getStorage(app);
        const testRef = ref(storageRef, `${file?.name}`);
        await uploadBytes(testRef, file).then(async(snapshot) => {
            const down = await getDownloadURL(testRef);
            setValue('hinhAnh', down);
        });
        dispatch(setLoading({
            status: 'done'
        }))
    }

    // const submitForm = async () => {
    //     if(isChangeImage) {
    //         const storageRef = getStorage(app);
    //         const testRef = ref(storageRef, `${fileImage?.name}`);
    //         await uploadBytes(testRef, fileImage).then(async(snapshot) => {
    //             const down = await getDownloadURL(testRef);
    //             setValue('image', down);
    //         });
    //     }
        
    //     await dispatch(createRoom({data: watch()}));  
    // }

    const handleSubmitData = () => {
        dispatch(createDichVu({data: watch()})).then(data=> {
            reset();
            setImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDF9695aEHL20tZNMzJ26nIGr5AYMKr_eaoxXWtDkngU8M8KXhqPQXkhyamMWJ1mvbeYU&usqp=CAU')
        }).catch(err => {
            console.log('Lỗi rồi');
        });  
    }

    const handleCancel = () => {
        methodCancel();
    };

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    const renderInput = (item) => {
        if(item.type === 'select') {
            return <div className={`border-[1px] border-solid border-[#b4b4b4] rounded-[5px] px-[15px] py-[7px] relative ${errors?.[item.name]?.message ? 'border-orange-400' : ""}`}>
                <select className="w-full outline-none" {...register(`${item.name}`)}>
                    {
                        item.dataSelect?.map((op, index) => {
                            return <option value={op.value}>{op.label}</option>
                        })
                    }
                </select>
            </div> 
        } else if (item.type === 'textarea') {
            return  <textarea {...register(item.name)} className="border-[1px] border-solid border-[#b4b4b4] rounded-[5px] px-[15px] py-[7px] min-h-[120px] max-h-[120px] w-full"/>
        }  else {
            return <div className={`border-[1px] border-solid border-[#b4b4b4] rounded-[5px] px-[15px] py-[7px] relative ${errors?.[item.name]?.message ? 'border-orange-400' : ""}`}>
                <input 
                    // key={index} 
                    type={item.type} 
                    name={item.name}
                    placeholder={`Điền vào ${item.name}...`} 
                    className={`w-[92%] outline-none`}
                    {...register(`${item.name}`)}
                />
                {
                    errors?.[item.name] && <div className='absolute right-2 md:right-1 top-[50%] translate-y-[-50%]'>
                        <span className="hover-span">
                            <Icon color="#c80000" name="warning"/>
                        </span>
                        <span className='absolute right-[110%] top-0 bg-[white] w-[max-content] rounded-[20px] border-[1.5px] border-solid border-orange-400 text-orange-400 px-[10px] z-[2] hidden'>
                            {errors?.[item.name].message}
                        </span>
                    </div>
                }
            </div>
        }
    }

    return (
        <Modal title={title} open={isOpen} onCancel={handleCancel} footer={null} width={950}>
            {childrenForm}

            {
                isSkeleton
                ?
                <Skeleton />
                :
                <form className="grid grid-cols-5 grid-row-3 gap-[30px]" onSubmit={handleSubmit(handleSubmitData)}>
                    <div className="col-span-2 w-full row-span-3">
                        <h5 className="mb-[7px] ml-[3px]">
                            Photo
                            <span className="text-[red]">*</span>
                        </h5>
                        <div className="rounded-[10px] border-solid border-[1px] border-[#cdcdcd] shadow-lg shadow-gray-400">
                            <div className="p-[10px] w-full">
                                <img src={image} className="md:h-[200px] lg:h-[250px] w-full rounded-[5px]"/>
                                {/* {renderImage} */}
                            </div>
                            <label className="w-full py-[10px] px-[20px] cursor-pointer bg-[#3790c7] block rounded-b-[10px]" htmlFor="imageRoom">
                                <UploadOutlined style={{color: 'white', fontWeight: 'bold', fontSize: '20px'}}/>
                            </label>
                            <input type="file" accept='image/png' id="imageRoom" className="hidden z-[-1] " onChange={handleChangeImage}/>
                        </div>
                    </div>
                    <div className="col-span-3 grid grid-cols-2 gap-[15px] row-span-3">
                        {
                            APIEdit?.map((item, index) => {
                                return <div className={`${setGridColumn(item.size)}`} key={index}>
                                    <h5 className="mb-[7px] ml-[3px]">
                                        {t(`${item.name}`)}
                                        {
                                            item.required
                                            &&
                                            <span className="text-[red]">*</span>
                                        }
                                    </h5>
                                    {renderInput(item)}
                                </div>
                            })
                        }
                    </div>
                    <div className="col-span-5">
                        <h5 className="mb-[7px] ml-[3px]">
                            {t('moTa')}
                            <span className="text-[red]">*</span>
                        </h5>
                        <textarea required {...register('moTa')} className="border-[1px] border-solid border-[#b4b4b4] rounded-[5px] px-[15px] py-[7px] min-h-[80px] max-h-[120px] w-full"/>
                    </div>
                    <div className="col-span-5 flex justify-end items-center">
                        <button className='flex items-center justify-center bg-[white] py-[10px] px-[30px] rounded-[7px]' type="button" onClick={methodCancel}>{t('back')}</button>
                        <button className='flex items-center justify-center bg-[#3790c7] text-white py-[10px] px-[30px] rounded-[7px] duration-300 hover:shadow-[#3790c7a6] hover:shadow-lg hover:translate-y-[-3px]' type="submit">{t('save')}</button>
                    </div>
                </form>
            }
            
        </Modal>
    )
}
