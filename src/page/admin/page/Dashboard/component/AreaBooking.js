import { Area } from '@ant-design/charts'
import { formatRelative } from 'date-fns';
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next';
import { Icon } from '../../../../../assets/icon';

export const AreaBooking = (props) => {

    // Props
    const {listBooking} = props;

    const {t} = useTranslation();

    // method
    const data = useMemo(()=> {
      if(listBooking?.length > 0) {
        const dataa = []
        for(let i = 1; i <= 12; i++) {
          const ai = Array.isArray(listBooking) && listBooking.filter(item=> {
            const date = new Date(item?.createAt?.seconds * 1000);
            const dateStrin = date.getMonth() + 1;
            console.log('dateStrin', dateStrin)
            return dateStrin === i;
          })
  
          const len = ai?.length
  
          dataa.push({
            timePeriod: `${i}`,
            value: len
          })
        }
        return dataa;
      } else {
        return [];
      }
    }, [listBooking])

  const config = {
      data,
      xField: 'timePeriod',
      yField: 'value',
      xAxis: {
        range: [0, 1],
      },
    };

    return (
        <>
          <div className="h-[95%]">
            <Area {...config}/> 
          </div>
          <div className="flex items-end justify-center h-[5%]">
            <Icon name="chart" color="#3790c7"/>
            <span className="text-[14px] translate-y-[2px]">. {t('Biểu đồ Booking')}</span>
          </div>
        </> 
    )
}
