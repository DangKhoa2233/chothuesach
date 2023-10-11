export const columns = [
    {
        title: 'id',  
        dataIndex: 'id',
        key: 'id',
        width: '15%',
    },
    {
        title: 'tenDichVu',
        dataIndex: 'tenDichVu',
        key: 'tenDichVu',
        width: '20%',
    },
    {
        title: 'loaiDichVu',
        dataIndex: 'loaiDichVu',
        key: 'loaiDichVu',
        width: '15%'
    },
    {
        title: 'giaDichVu',  
        dataIndex: 'giaDichVu',
        key: 'giaDichVu',
        width: '15%',
    },
    {
        title: 'soLuong',  
        dataIndex: 'soLuong',
        key: 'soLuong',
        width: '10%',
    },
]

export const setGridColumn = (size) => {
    if(size === '3') {
        return 'col-span-3'
    } else if (size === '2') {
        return 'col-span-2'
    } else {
        return 'col-span-1'
    }
}