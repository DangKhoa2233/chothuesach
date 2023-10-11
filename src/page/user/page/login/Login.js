import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { FormBaseLogin } from '../../component/Form/FormBaseLogin';
import * as yup from 'yup';
import { Loading } from '../../../../component/Loading/Loading';
import { loginUser } from '../../../../redux/action/accountAction';
import { useTranslation } from 'react-i18next';

export const Login = () => {

    const navigate = useNavigate();
    const {t} = useTranslation();

    const initialValue = {
      userName: "",
      password: "",
    }

    const formField = [
      {
        name: "userName",
        type: "string"
      },
      {
        name: "password",
        type: "password"
      }
    ]

    const validationSchema = yup.object().shape({
      userName: yup.string().required("Please input...."),
      password: yup.string().required("Please input...."),
  });

    // useEffect(()=> {
    //   if(window.location.pathname === "/user/login") {
    //     window.onclick = () => navigate("/user");
    //   }
    // })
    

    return (
      <>
        <div className='fixed top-0 left-0 w-screen h-screen bg-[white] z-[101]'>
            <div className='absolute top-[5%] lg:top-[3%] left-[50%] translate-x-[-50%]'>
              <img src="/images/fly.png" className='w-[200px] md:w-[250px]'/>
            </div>
            <div 
              className='absolute top-[50%] lg:top-[55%] left-[50%] bg-[white] w-[85%] sm:w-[80%] md:w-[50%] lg:w-[40%] xl:w-[35%] 2xl:w-[30%] translate-x-[-50%] translate-y-[-50%] rounded-[10px] px-[15px] md:px-[30px] py-[20px]'
              style={{boxShadow: 'rgba(0, 0, 0, 0.26) 0px 5px 40px'}}
            >
              <div className='flex items-center justify-between mb-[20px] md:mb-[30px]'>
                <h3 className='text-[20px] md:text-[25px] font-[500] text-[#3790c7]'>{t('login')}</h3>
                <span className='text-[25px] md:text-[30px] font-[500] translate-y-[-5px] text-[#3790c7] cursor-pointer' onClick={()=> {
                  navigate('/user')
                }}>&times;</span>
              </div>
              <div className='flex items-center justify-center'>
                <FormBaseLogin 
                  initialValue={initialValue} 
                  formField={formField} 
                  validationSchema={validationSchema} 
                  methodSubmit={loginUser}
                />
              </div>
            </div>
        </div>
      </>
    )
}
