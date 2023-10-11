import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { getSoLuongPhong } from '../../../../redux/action/phongAction';

// Columns table
export const columns = [
        {
            title: 'HoTen',
            dataIndex: 'hoTen',
            key: 'hoTen',
            width: '20%',
        },
        // {
        //     title: 'ID KhachHang',
        //     dataIndex: 'idKhachHang',
        //     key: 'idKhachHang',
        //     width: '15%',
        // },
        {
            title: 'ID Phong',
            dataIndex: 'idPhong',
            key: 'idPhong',
            width: '15%',
        },
        {
            title: 'CCCD',
            dataIndex: 'cccd',
            key: 'cccd',
            width: '15%',
        },
        {
            title: 'SDT',
            dataIndex: 'sdt',
            key: 'sdt',
            width: '15%',
        },
        {
            title: 'ngayThue',
            dataIndex: 'ngayBatDauThue',
            key: 'ngayBatDauThue',
            width: '15%',
        },
        {
            title: 'tinhTrang',
            dataIndex: 'tinhTrang',
            key: 'tinhTrang',
            width: '15%',
        },
        // {
        //     title: 'ngay',
        //     dataIndex: 'soNgay',
        //     key: 'soNgay',
        //     width: '15%',
        //     visible: true
        // },
        // {
        //     title: 'Email',
        //     dataIndex: 'email',
        //     key: 'email',
        //     sorter: (a, b) => a.email.length - b.email.length,
        //     sortDirections: ['descend', 'ascend'],
        // },
    ];


  // Columns Edit 
  export const columnsEdit = (data) => {

    const dataPhong = [];
    if(data) {
      data.map((item)=> {
        return dataPhong.push({
          label: item.soPhong,
          value: item.soPhong,
          checked: item.tinhTrang
        })
      })
    }

    return [
        {
            name: 'id',
            type: 'string',
            required: true,
            readOnly: true,
        },
        {
            name: 'hoTen',
            type: 'string',
            required: true,
        },
        {
            name: 'idKhachHang',
            type: 'string',
            required: true,
            readOnly: true,
        },
        {
            name: 'idPhong',
            type: 'string',
            required: true,
            readOnly: true,
        },
        {
            name: 'cccd',
            type: 'string',
            required: true,
            readOnly: true,
        },
        {
            name: 'sdt',
            type: 'string',
            required: true,
            // readOnly: true,
        },
        {
            // title: 'ngayThue',
            // dataIndex: 'ngayBatDauThue',
            // key: 'ngayBatDauThue',
            // width: '15%',
            name: 'ngayBatDauThue',
            type: 'date',
            required: true,
        },
        {
            // title: 'ngay',
            // dataIndex: 'soNgay',
            // key: 'soNgay',
            // width: '15%',
            // visible: true
            name: 'soNgay',
            type: 'string',
            required: true,
        },
        {
            // title: 'tinhTrang',
            // dataIndex: 'tinhTrang',
            // key: 'tinhTrang',
            // width: '15%',
            name: 'tinhTrang',
            type: 'select',
            dataSelect: [
              {
                label: 'Đã xác nhận',
                value: true
              },
              {
                label: 'Chờ xác nhận',
                value: false
              },
            ],
            required: true,
        },
        {
          name: 'soPhong',
          type: 'radio',
          dataRadio: dataPhong,
          required: true,
        }
      ] 
  } 

  // Validation edit 
   export const validationSchemaEditChecking = yup.object().shape({
      hoTen: yup.string().required("Please input...."),
      idKhachHang: yup.string().required("Please input...."),
      // email: yup.string().email('Please input abc@gmail...').required("Please input...."),
      idPhong: yup.string().required("Please input...."),
      cccd: yup.number('Please input number....').required("Please input...."),
      sdt: yup.number('Please input number....').required("Please input...."),
      tinhTrang: yup.string().required("Please input...."),
      sdt: yup.number('Please input number....').required("Please input...."),
      ngayBatDauThue: yup.string().required("Please input...."),
      soNgay: yup.number('Please input number....').required("Please input...."),
      soPhong: yup.string().required("Please input...."),
  });

  // getDataTable => Thêm index cho table
  export const getDataTable = (data) => {
    const dataResult = [];
    (data?.length > 0) 
      &&
    data.map((item, index)=> {
      const obj = {...item, key: index}
      return dataResult.push(obj);
    })
    return dataResult;
  }

  export const getDataPhong = (data) => async (dispatch) => {
    const result = await dispatch(getSoLuongPhong(data));
    return result;
  }