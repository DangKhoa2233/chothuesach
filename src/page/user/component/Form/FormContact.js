import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export const FormContact = () => {

    // State

    // API
    const columns = [
        {
            name: 'Full name',

        }
    ]

    // Form
    const {register, watch, setValue, reset, formState: {error}, handleSubmit} = useForm({
        method: 'onChange',
        defaultValues: {},
        resolver: yup.object().shape({

        })
    })

    // Method
    const submitForm = () => {

    }

    // Return
    return (
        <form onSubmit={handleSubmit(submitForm)}>
             <div className="grid grid-cols-2 gap-[20px]">
                {
                    // columns?.map((item, index) => {
                    //     return <div className={`${item.size === 'full' ? 'grid-span-2' : 'col-span-1'}`}>
                    //         <div className="flex"> 
                    //             <h5 className="mb-[5px]">{t(`${item.name}`)}</h5>
                    //             {
                    //                 item.required 
                    //                 &&
                    //                 <span className="text-[red] ml-[5px]">*</span>
                    //             }
                    //         </div>
                    //         {renderInput(item)}
                    //     </div>
                    // })
                }
            </div>
        </form>
    )
}
