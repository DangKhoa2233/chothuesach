import { Rate } from 'antd'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Icon } from '../../../../assets/icon';
import { createDanhGia } from '../../../../redux/action/danhGiaAction';

export const FormReaction = (props) => {

  // Props
  const {setOpenDanhGia} = props;

  // State
  const [number, setNumber] = useState(3);

  // Somethings
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

  const {t} = useTranslation();

  const dispatch = useDispatch();

  const {id} = useParams();

  // Effect


  // Form
  const {register, watch, formState: {errors}, handleSubmit, setValue} = useForm({
    method: 'onChange',
    defaultValues: {
      binhLuan: "",
      soSao: 0
    },
  })

  useEffect(()=> {
    setValue('soSao', number);
  }, [number])
  
  // Method
  const handleSubmitData = async() => {
    await dispatch(createDanhGia({...watch(), idPhong: id})).then(data=> {
      setOpenDanhGia(false);
    }).catch(()=> {
      Swal.fire({
        icon: 'error',
        title: 'Đánh giá thất bại !',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true
    })})
  }

  const renderDanhGiaSao = () => {
    return <Rate tooltips={desc} onChange={setNumber} value={number}/>
  }

  // Return
  return (
    <form className="w-full" onSubmit={handleSubmit(handleSubmitData)}>
      <div className="flex items-center w-full">
        <textarea required {...register('binhLuan')} className=" text-[13px] md:text-[15px] py-[10px] px-[20px] border-[1px] border-solid border-white rounded-[10px] bg-transparent outline-none w-full text-white h-[140px] max-h-[140px] min-h-[140px] md:h-[170px] md:max-h-[170px] md:min-h-[170px] lg:h-[200px] lg:max-h-[200px] lg:min-h-[200px]"/>
      </div>
      <div className="flex items-center py-[10px] px-[20px] rounded-[10px] my-[10px] backdrop-blur-md bg-[#ffffff73]">
        {
          renderDanhGiaSao()
        }
      </div>
      <button className="flex items-center justify-center bg-[#13527a] py-[10px] px-[10px] rounded-[10px] w-full duration-500 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[#407595d1] mt-[20px]">
        <Icon name="paper" color="#fff"/>
        <span className="ml-[10px] text-[white]">{t('send')}</span>
      </button>
    </form>
  )
}
