import React from 'react'
import { useTranslation } from 'react-i18next';
import { FormReaction } from '../Form/FormReaction';

export const ModalDanhGia = (props) => {

    // Props
    const {setOpenDanhGia, background} = props;

    // Somethings
    const {t} = useTranslation();

    // Return
    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-[100]" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] rounded-[10px]" style={{backgroundImage: `url(${background})`}}>
                <div className="backdrop-blur-md px-[30px] py-[20px] h-full rounded-[10px]">
                    <div className='flex items-center justify-end mb-[30px]'>
                        <span className='text-[25px] md:text-[30px] font-[500] translate-y-[-5px] text-[white] cursor-pointer' onClick={()=> {
                            setOpenDanhGia(false);
                        }}>&times;</span>
                    </div>
                    <div >
                        <FormReaction setOpenDanhGia={setOpenDanhGia}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
