import React, { useState, useEffect, useMemo } from 'react'
import { getAllUser, getAllUserNotReducer } from '../../../../redux/action/accountAction';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Segmented } from 'antd';
import { DashboardArea } from './component/DashboardArea';

export const Dashboard = () => {

  const dispatch = useDispatch();
  const {t} = useTranslation();

  // State
  const [segment, setSegment] = useState('Account');

  return (
    <div className="h-full">
      <div className="h-[12%] flex justify-between items-center">
          <h3 className="text-[20px] text-[#3790c7] font-bold">{t('Dashboard')}</h3>
      </div>
      <div className="h-[8%]">
        <Segmented block options={['Account', 'Booking', 'Reaction']} onChange={(e=> {
          setSegment(e)
        })}/>
      </div>
      <div className="h-[80%]">
        <DashboardArea segment={segment}/>
        {/* <Area {...config} /> */}
      </div>
    </div>
  )
}
