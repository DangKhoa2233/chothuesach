import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { layDuLieuPhongInfo } from '../../../../redux/action/phongAction';
import { Icon } from '../../../../assets/icon/index';
import { ModalBooking } from '../../component/modal/ModalBooking';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import { setLoading } from '../../../../redux/action/homeAction';
import FsLightbox from "fslightbox-react";
import { layDuLieuDanhGiaPhong } from '../../../../redux/action/danhGiaAction';
import { Reaction } from '../../component/Reaction';
import { FormReaction } from '../../component/Form/FormReaction';
import { ModalDanhGia } from '../../component/modal/ModalDanhGia';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase.config';
import { NoneInfo } from '../../shareComponent/NoneInfo';
import { InfoLoaiPhong } from '../../shareComponent/InfoLoaiPhong';

export const InfoRoom = () => {

    // Lấy id từ params trên url
    const {id} = useParams();

    window.addEventListener("resize", ()=>{
        const innerWidth = window.innerWidth;
        if(innerWidth < 700) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    })

    // State
    const [isBooking, setIsBooking] = useState(false);
    const [toggler, setToggler] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [data, setData]= useState([]);
    const [danhGia, setDanhGia] = useState([]);
    const [openDanhGia, setOpenDanhGia] = useState(false);
    const [giaThueNgay, setGiaThueNgay] = useState(0);

    // Somethings
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();


    // Effect
    useEffect(async()=> {
        // dispatch(layDuLieuPhongInfo(id));
        dispatch(setLoading({
            status: 'isLoading'
        }))
        // Lấy thông tin phòng
        const dataInfo = await layDuLieuPhongInfo(id);
        setData(dataInfo);

        // lấy thông tin đánh giá
        const danhGia = await dispatch(layDuLieuDanhGiaPhong(id));
        dispatch(setLoading({
            status: 'done'
        }))
        setDanhGia(danhGia);

        // Kiểm tra độ rộng màn hình
        const innerWidth = window.innerWidth;
        if(innerWidth < 700) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }

        // Khi có một đánh giá mới
        onSnapshot(collection(db,'danhGia'), async (snapShot) => {
            const danhGia = await dispatch(layDuLieuDanhGiaPhong(id));
            setDanhGia(danhGia);
        });

    }, [])

    // const {roomInfo} = useSelector((state)=>state.phong);

    const renderMoreImage = () => {
        return <div className="h-full rounded-[10px] overflow-hidden bg-cover cursor-pointer" style={{backgroundImage: `url(${data.image})`}}>
            <div className="flex items-center justify-center h-full" style={{backgroundColor: 'rgba(0,0,0,0.5)'}} onClick={()=> {
                setToggler(!toggler);
            }}>
                <span className="text-white text-[14px] md:text-[16px] lg:text-[18px]">{t('seeAll')}</span>
            </div>
        </div>
    }

    // Render số sao
    const renderSoSao = () => {
        let so = 0;
        danhGia?.forEach((item)=> {return so = so + item.soSao})
        const soSao = parseInt(so/danhGia?.length);
        let arr = [];
        for(let i = 0; i < soSao; i++) {
            arr.push({}); 
        }
        return arr.map((item, index)=> {
            return <Icon name="star" fill="#ffd902"/>
        })
    }

    const handleOpenForm = () => {
        if(localStorage.getItem('jwt') && localStorage.getItem('userLogin')) {
            dispatch(setLoading({
                status: 'isLoading'
            }))
            setTimeout(()=> {
                dispatch(setLoading({
                    status: 'done'
                }))
                setOpenDanhGia(true);
            }, 500)
        } else {
            Swal.fire({
                icon: 'info',
                iconColor: '#3790c7',
                title: `${t('youAreNotLoggedIn')}`,
                confirmButtonColor: '#3790c7',
                confirmButtonText: `${t('ok')}`
            })
        }
    }

    const renderDanhGia = () => {
        if(danhGia?.length === 0) {
            // Trường hợp không có đánh giá
            return <div className="h-[100px] md:h-[150px] flex items-center justify-center">
                <NoneInfo content={`${t('noneReaction')}`}/>
            </div>
        }
        else {
            // Trường hợp có đánh giá
            return danhGia.map((dg, i) => {
                return <Reaction key={i} data={dg}/>
            })
        }
    }

    // Xử lý đặt phòng
    const handleBooking = () => {
        // Kiểm tra tình trạng phòng

        // Hết phòng
        if((data?.soLuongPhong?.findIndex((item)=> item?.tinhTrang === false) == -1) || (data?.soLuongPhong?.length === 0)) {
            Swal.fire({
                icon: 'info',
                iconColor: '#3790c7',
                title: `${t('roomIsSoldOut')}`,
                confirmButtonColor: '#3790c7',
                confirmButtonText: `${t('ok')}`
            })
        } else {
            // Còn phòng
            const jwt = localStorage.getItem('jwt');

            // Kiểm tra đăng nhập
            if(jwt) {
                // Đã đăng nhập
                setIsBooking(true);
            } else {

                // Chưa đăng nhập
                Swal.fire({
                    title: 'Cần đăng nhập trước khi đặt phòng !',
                    icon: 'info',
                    iconColor: '#3790c7',
                    confirmButtonText: 'Đăng nhập',
                    confirmButtonColor: '#3790c7'
                }).then((result) =>{
                    if(result.isConfirmed) {
                        navigate('/user/login')
                    }
                })
            }
        }
    }

    return (
        <>
            <div className="flex justify-center pb-[60px] pt-[40px] flex-col items-center">
                <div className="flex justify-center items-center">
                    <Icon name="building" color="3790c7"/>
                    <h4 className="text-[#3790c7] text-[25px] ml-[20px] font-[500]">{data?.tenPhong}</h4>
                </div>
                <div className="w-[90%] md:w-[80%] xl:w-[70%] 2xl:w-[60%] flex flex-col justify-between shadow-lg shadow-gray-300 rounded-[20px] p-[15px] md:p-[20px]">
                    <div className="flex items-end justify-between pb-[10px]">
                        <div>
                            <p className="font-bold text-[20px] translate-x-[-4px]">{data?.tenPhong}</p>
                            <p className="flex translate-x-[-5px] mb-[13px]">{renderSoSao()}</p>
                            <div>
                                <InfoLoaiPhong dataRoom={data} setGiaThueNgay={setGiaThueNgay}/>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center justify-end text-[gray] text-[14px] translate-x-[-5px] ml-[20px] mb-[10px] mt-[5px]">
                                <Icon name="location"/>
                                <span className="ml-[5px]">{data?.diaChi}</span>
                             </div>
                            {
                                !isMobile
                                &&
                                <>
                                    <p className="mb-[10px] text-end">{(data?.soLuongPhong?.findIndex((item)=> item?.tinhTrang === false) != -1 && data?.soLuongPhong?.length > 0) ? `${t('thereStillRoom')}` : `${t('outOfRoom')}`}</p>
                                    <button className={`flex items-center justify-center ${(data?.soLuongPhong?.findIndex((item)=> item?.tinhTrang === false) != -1 && data?.soLuongPhong?.length > 0) ? 'bg-[#3790c7] hover:shadow-[#3790c7a6] hover:shadow-lg' : 'bg-[gray] hover:shadow-lg hover:shadow-gray-400'} text-white py-[12px] px-[20px] rounded-[7px] duration-300 hover:translate-y-[-3px]`} onClick={handleBooking}>
                                        {t('booking')}
                                    </button>
                                </>
                            }
                        </div>
                    </div>
                    <div className="grid grid-cols-4 grid-rows-3 md:grid-rows-4 w-full gap-[5px] md:gap-[10px]">
                        <div class="col-span-3 row-span-4 rounded-[10px] overflow-hidden">
                            <img className="h-[210px] md:h-[450px] 2xl:h-[550px] w-full rounded-[10px] duration-500 hover:scale-105" src={data?.image}/>
                        </div>
                        {
                            renderMoreImage()
                        }
                    </div>  
                    {
                        isMobile
                        && 
                        <button className={`flex items-center mt-[10px] justify-center ${(data?.soLuongPhong?.findIndex((item)=> item?.tinhTrang === false) != -1 && data?.soLuongPhong?.length > 0) ? 'bg-[#3790c7] hover:shadow-[#3790c7a6] hover:shadow-lg' : 'bg-[gray] hover:shadow-lg hover:shadow-gray-400'} text-white py-[12px] px-[20px] rounded-[10px] duration-300 hover:translate-y-[-3px] text-[14px] md:text-[16px] lg:text-[18px]`} onClick={handleBooking}>
                            {t('booking')}
                        </button>
                    }
                </div>
                {/* Đánh giá */}
                <div className="w-[90%] md:w-[80%] xl:w-[70%] 2xl:w-[60%] shadow-lg shadow-gray-300 rounded-[20px] p-[15px] md:p-[20px] mt-[20px] bg-[white]">
                    <div className="flex items-center">
                        <Icon name="chat" color="#3790c7"/>
                        <h5 className="text-[#3790c7] ml-[10px] text-[16px] md:text-[20px] 2xl:text-[25px]">{t('reaction')}</h5>
                    </div>
                    <div className="mt-[20px] grid grid-cols-1 gap-[10px] md:gap-[15px]">
                        {
                            renderDanhGia()
                        }
                    </div>
                    <div className="mt-[20px]">
                        {/* <FormReaction/> */}
                        <button className="bg-[#3790c7] relative rounded-[10px] px-[10px] py-[10px] overflow-hidden hoverToShow" onClick={handleOpenForm}>
                            <div className="flex">
                                <Icon name="paper" color="#fff"/>
                                <span className="text-[#fff] text-[13px] md:text-[15px] ml-[10px]">{t('reactionHere')}</span>
                            </div>
                            <div className="hoverToShow-hide absolute top-0 left-0 w-full h-full bg-[#3790c7]">
                                <Icon name="paper" color="#fff"/>
                            </div>
                        </button>
                    </div>
                </div>
            </div> 
            <FsLightbox
				toggler={toggler}
				sources={[
                    <img src={data?.image}/>,
				]}
			/>
            {
                isBooking
                &&
                <ModalBooking data={data} setIsBooking={setIsBooking} idRoom={id} giaThueNgay={giaThueNgay}/>
            }
            {
                openDanhGia
                &&
                <ModalDanhGia setOpenDanhGia={setOpenDanhGia} background={data?.image}/>
            }
        </>

// createdAt: serverTimestamp(),
        
    )
}
