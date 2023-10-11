import React from 'react'
import { Icon } from '../../../../assets/icon';

export const ButtonMenu = (props) => {

    // Props
    const {data} = props;

    // Method
    const handleClick = () => {
        data.method();
    }

    return (
        <button className={`h-[50px] rounded-[10px] flex items-center justify-center duration-200 hover:text-[#3790c7] hover:font-[500] px-[20px]`} onClick={handleClick}>
            <span className='mr-[5px]'>
                <Icon name={data.icon}/>
            </span>
            <span className='font-[400]'>
                {data.name}
            </span>
        </button>
    )
}
