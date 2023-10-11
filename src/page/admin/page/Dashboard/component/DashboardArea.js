import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUserNotReducer } from '../../../../../redux/action/accountAction';
import { getAllBookingNoReducer } from '../../../../../redux/action/bookingAction';
import { layDuLieuDanhGia } from '../../../../../redux/action/danhGiaAction';
import { AreaAccount } from './AreaAccount';
import { AreaBooking } from './AreaBooking';
import { AreaReaction } from './AreaReaction';

export const DashboardArea = (props) => {

    // Props
    const {segment} = props;

    console.log('segment', segment)

    const dispatch = useDispatch();

    const [isData, setIsData] = useState([]);

    useEffect(async()=> {
      if(segment === 'Account') {
        dispatch(getAllUserNotReducer()).then(data=> setIsData(data)).catch(err=>console.log('err', err));
      } else if (segment === 'Booking') {
        dispatch(getAllBookingNoReducer()).then(data=> setIsData(data)).catch(err=>console.log('err', err));
      } else {
        dispatch(layDuLieuDanhGia()).then(data=> setIsData(data)).catch(err=>console.log('err', err));
      }
      return () => {
        setIsData([]);
      }
    }, [segment])


    // Method
    const renderArea = () => {
      switch(segment) {
        case 'Account': {
          return <AreaAccount listUser={isData}/>
        } break;
        case 'Booking': {
          return <AreaBooking listBooking={isData}/>
        } break;
        case 'Reaction': {
          return <AreaReaction listReaction={isData}/>
        } break;
        default: return <AreaAccount listUser={isData}/>
      }
    }

    // Return
    return (
        <div className="py-[20px] h-full">
          {renderArea()}
        </div>
    )
}
