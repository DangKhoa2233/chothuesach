import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../assets/icon';

export const RoomAreaItem = (props) => {

    //Props
    const {data, flag} = props;

    const navigate = useNavigate();

    const renderDanhGia = () => {
        let arr = [];
        for(let i = 0; i < data.danhGia; i++) {
            arr.push({}); 
        }
        return arr.map((item, index)=> {
            return <Icon name="star" fill="#ffd902"/>
        })
    }

    const chooseRoom = () => {
        navigate(`infoRoom/${data.id}`);
    }

    return (
        <div className={`flex flex-col md:flex-row w-full shadow-lg shadow-gray-300 py-[20px] rounded-[20px] cursor-pointer mb-[35px]`} onClick={chooseRoom}>
            <div className={`md:w-[40%] flex ${flag % 2 != 0 ? 'justify-end md:justify-end' : 'justify-start md:justify-end'}`}>
                <div className={`w-[200px] lg:w-[300px] overflow-hidden ${flag % 2 != 0 ? 'rounded-tr-[60px] rounded-bl-[100px]' : 'rounded-tl-[60px] rounded-br-[100px]'}`}>
                    <img className="duration-500 hover:scale-105" src={data.image}/>
                </div>
            </div>
            <div className={`px-[40px] md:w-[60%] flex flex-col  h-full ${flag % 2 != 0 ? 'items-start md:items-start' : 'items-end md:items-start'}`}>
                <h5 className="font-bold text-[20px] mb-[7px]">{data.tenPhong}</h5>
                <div className="flex items-center justify-start mb-[15px] translate-x-[-2px]">
                    {renderDanhGia()}
                </div>
                <p>{data.dacDiemPhong}</p>
            </div>
        </div>
    )
}
