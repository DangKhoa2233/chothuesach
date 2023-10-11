import React from 'react';
import { ChangeLanguage } from '../../../user/component/ChangeLanguage'; 
import { AdminInfo } from '../../component/AdminInfo';

export const TabMenu = () => {
  return (
    <div className="w-full h-[60px] p-[10px] bg-[white] shadow-lg shadow-gray-200 flex items-center justify-end">
        {/* <div>

        </div> */}
        <ChangeLanguage/>
        <AdminInfo/>
    </div>
  )
}
