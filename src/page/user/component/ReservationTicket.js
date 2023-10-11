import React from 'react'
import { Icon } from '../../../assets/icon';
import { InfoRoomTicket } from '../shareComponent/InfoRoomTicket';

export const ReservationTicket = (props) => {

    const {data} = props;

    return (
        <div className="bg-[white] shadow-lg shadow-gray-400 p-[10px] rounded-[10px] hover:shadow-[#5c97bc] duration-300 hover:shadow-xl cursor-pointer">
            <InfoRoomTicket idPhong={data.idPhong} dataTicket={data}/>
        </div>
    )
}
