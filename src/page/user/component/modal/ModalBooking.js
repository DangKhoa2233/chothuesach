import { FormBooking } from "../Form/FormBooking";
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { createBooking } from '../../../../redux/action/bookingAction'
import Swal from "sweetalert2";
import { useTranslation } from 'react-i18next'; 

export const ModalBooking = (props) => {

    // Props;
    const {data, setIsBooking, idRoom, giaThueNgay} = props;

    console.log('giaThueNgay', giaThueNgay)

    const dispatch = useDispatch();
    const {t} = useTranslation();

    const initialValue = {
        hoTen: "",
        sdt: null,
        cccd: "",
        soNgay: 1,
        ngayBatDauThue: null,
        tongGia: giaThueNgay,
        idKhachHang: `${JSON.parse(localStorage.getItem('jwt'))}`,
        idPhong: idRoom
        // idDatPhong===> Tài khoản đăng nhập
    }
  
    const formField = [
        {
            name: "hoTen",
            type: "string"
        },
        {
            name: "sdt",
            type: "string"
        },
        {
            name: "cccd",
            type: "string"
        },
        {
            name: "ngayBatDauThue",
            type: "date"
        },
        {
            name: "soNgay",
            type: "string"
        },
        {
            name: "tongGia",
            type: "string",
            readOnly: true
        },
    ]
  
    const validationSchema = yup.object().shape({
        hoTen: yup.string().required("Please input"),
        sdt: yup.number().typeError('Please input number fdsafadsfsf').required("Please input...."),
        // email: yup.string().email('Please input email vv@gmail').required("Please input...."),
        cccd: yup.number().typeError('Please input number').required("Please input...."),
        soNgay: yup.number().typeError('Please input number').required("Please input....").min(1).max(10),
        ngayBatDauThue: yup.string().required("Please input...."),
    });

    const handleBooking = async (data) => {
        await dispatch(createBooking(data));
        setTimeout(()=> {
            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                text: 'Bạn đã lập phiếu đặt phòng thành công !',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    setIsBooking(false);
                }
            })
        }, 1500)
    }

    const handleCancel = () => {
        setIsBooking(false);
    }

    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-[100]" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] bg-white rounded-[10px] px-[30px] py-[20px]">
                <div className='flex items-center justify-between mb-[30px]'>
                    <h3 className='text-[20px] md:text-[25px] font-[500] text-[#3790c7]'>{t('booking')}</h3>
                    <span className='text-[25px] md:text-[30px] font-[500] translate-y-[-5px] text-[#3790c7] cursor-pointer' onClick={()=> {
                        setIsBooking(false);
                    }}>&times;</span>
                </div>
                <div >
                    <FormBooking
                        initialValue={initialValue} 
                        formField={formField} 
                        validationSchema={validationSchema} 
                        methodSubmit={handleBooking}
                        methodCancel={handleCancel}
                        data={{...data, giaThueNgay: giaThueNgay}}
                    />
                </div>
            </div>
        </div>
    )
}