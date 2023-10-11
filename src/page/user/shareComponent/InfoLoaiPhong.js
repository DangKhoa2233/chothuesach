import { Badge } from 'antd';
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Icon } from '../../../assets/icon';
import { getThongTinLoaiPhong } from '../../../redux/action/phongAction';

export const InfoLoaiPhong = (props) => {

    // Props
    const {dataRoom, setGiaThueNgay} = props;

    // Something
    const dispatch = useDispatch();

    // State
    const [data, setData] = useState({});

    // Effect
    useEffect(async() => {
        const res = await dispatch(getThongTinLoaiPhong(dataRoom?.loaiPhong));
        setData(res);
        setGiaThueNgay(res.giaThueNgay)
    }, [dataRoom])

    // Return
    return (
        <>
            <div className="flex items-center translate-x-[-5px] mt-[5px] mb-[10px] text-[18px]">
                <Icon name="bank"/>
                <span className="text-[#3790c7] font-500 mr-[20px] ml-[7px] text-[14px] md:text-[16px] lg:text-[18px]">{(data?.giaThueNgay - (data?.giaThueNgay * dataRoom?.sale / 100))?.toLocaleString()}</span>
                <span className={`${dataRoom?.sale > 0 && 'line-through'} text-[14px] md:text-[16px] lg:text-[18px]`}>{data?.giaThueNgay?.toLocaleString()}</span>
            </div>
            <div className="flex items-center translate-x-[-5px] text-[18px] mb-[5px]">
                {/* <div className='flex items-center mr-[20px]'>
                    <Icon name="bath"/>
                    <span className="ml-[10px]">{data?.noiThat?.soPhongTam}</span>
                </div>
                <div className='flex items-center mr-[10px]'>
                    <Icon name="bed"/>
                    <span className="ml-[10px]">{data?.noiThat?.soGiuong}</span>
                </div> */}
                <Badge.Ribbon color={'#3790c7'} text={data?.noiThat?.soPhongTam}>
                    <button type="button" className={`w-full p-[10px] px-[20px] bg-[white] shadow-md shadow-gray-300 rounded-[5px] duration-200 hover:translate-x-[-3px]`}>
                        <Icon name="bath"/>
                    </button>
                </Badge.Ribbon>
                <Badge.Ribbon color={'#3790c7'} text={data?.noiThat?.soGiuong}>
                    <button type="button" className={`w-full p-[10px] px-[20px] bg-[white] shadow-md shadow-gray-300 rounded-[5px] duration-200 hover:translate-x-[-3px]`}>
                        <Icon name="bed"/>
                    </button>
                </Badge.Ribbon>
                <Badge.Ribbon color={'#3790c7'} text={data?.soNguoi}>
                    <button type="button" className={`w-full p-[10px] px-[20px] bg-[white] shadow-md shadow-gray-300 rounded-[5px] duration-200 hover:translate-x-[-3px]`}>
                        <Icon name="people"/>
                    </button>
                </Badge.Ribbon>
            </div>
        </>
    )
}
