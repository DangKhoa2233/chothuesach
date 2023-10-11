import * as yup from 'yup';

// Columns table
export const columns = [
    {
      title: 'Username',
      dataIndex: 'userName',
      key: 'userName',
      width: '20%',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
      width: '20%',
    },
    {
      title: 'Rule',
      dataIndex: 'loaiTaiKhoan',
      key: 'loaiTaiKhoan',
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ['descend', 'ascend'],
    },
  ];

  // Columns Create User
  export const ColumnsCreate = [
    {
      name: 'userName',
      type: 'string',
      required: true
    },
    {
      name: 'password',
      type: 'string',
      required: true
    },
    {
      name: 'email',
      type: 'string',
      required: true
    },
    {
      name: 'loaiTaiKhoan',
      type: 'select',
      dataSelect: [
        {
          label: 'Khách hàng',
          value: 'guest'
        },
        {
          label: 'Quản trị viên',
          value: 'admin'
        },
      ],
      required: true
    },
  ]


  export const ColumnsEdit = [
    {
      name: 'id',
      type: 'string',
      required: true,
      readOnly: true,
    },
    {
      name: 'userName',
      type: 'string',
      required: true,
      readOnly: true,
    },
    {
      name: 'password',
      type: 'string',
      required: true
    },
    {
      name: 'email',
      type: 'string',
      required: true
    },
    {
      name: 'loaiTaiKhoan',
      type: 'select',
      dataSelect: [
        {
          label: 'Khách hàng',
          value: 'guest'
        },
        {
          label: 'Quản trị viên',
          value: 'admin'
        },
      ],
      required: true
    },
  ]


  // Validation create user
  export const validationSchemaCreateUser = yup.object().shape({
      userName: yup.string().required("Please input...."),
      password: yup.string().required("Please input...."),
      email: yup.string().email('Please input abc@gmail...').required("Please input...."),
      loaiTaiKhoan: yup.string().required("Please input....")
  });


  // getDataTable
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