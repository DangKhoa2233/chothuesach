import React from 'react'
import { Icon } from '../../../assets/icon';

export const NoneInfo = (props) => {

    // Props
    const {content} = props;

    return (
        <div className="flex items-center justify-center">
            <Icon name="chat" color="gray"/>
            <p className="text-[gray] ml-[15px]">{content}</p>
        </div>
    )
}
