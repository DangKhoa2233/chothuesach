import React, { useEffect } from 'react';
import { SearchOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';

export const TableMain = (props) => {

    // Props
    const {data, columns, handleEdit, handleDelete} = props;

    // State
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [dataColumns, setDataColumns] = useState([]);

    // Somethings
    const {t} = useTranslation();

    // Method
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      // Tìm thấy
      setSearchText(selectedKeys[0]);
      // Set lại data table
      setSearchedColumn(dataIndex);
    };

    // Reset filter 
    const handleReset = (clearFilters) => {
      // Clear giá trị của ô input
      clearFilters();
      // Set lại data table
      setSearchText('');
    };

    // Hàm search của table
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? '#1890ff' : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });

    useEffect(()=> {
        if(columns) {
            let dataResult = [];
            columns.map((item, index) => {
                // if(item.dât)
                let obj = {};
                if(item.key === 'tinhTrang') {
                  obj = {...item, render: (text) => <div>{
                      text 
                      ?
                      <div className="flex items-center">
                        <span className="w-[4px] h-[4px] rounded-[50%] bg-[green] block mr-[5px]"></span>
                        <span className="text-[12px] text-[green]">{t('confirmed')}</span>
                      </div>
                      :
                        <div className="flex items-center">
                            <span className="w-[4px] h-[4px] rounded-[50%] bg-[orange] block mr-[5px]"></span>
                            <span className="text-[13px] text-[orange]">{t('check')}</span>
                        </div>
                    }</div>}
                } else if (item.key === 'soLuongPhong') { 
                  obj = {...item, render: (text) => <div>
                    {
                      text?.length
                    }
                  </div>}
                } else if (item.key === "btn") {
                  obj = {...item, 
                    render: (text, row) =>
                      // <Button type="primary">{t('view')}</Button>
                      <div className='flex items-center justify-center text-[#3790c7] text-[13px] py-[5px] px-[10px] rounded-[7px] duration-300 cursor-pointer hover:underline' type="button" onClick={()=> { 
                        item.onClickFunc(row)
                      }}>{t('view')}</div>
                  }
                } else {
                  obj = {...item, ...getColumnSearchProps(`${item.dataIndex}`)};
                }
                
                return dataResult.push(obj);
            })
            dataResult.push({
              title: 'Action',
              key: 'operation',
              // fixed: 'right',
              width: '100px',
              render: (data) => <div className="flex w-full items-center justify-center">
                <button type="text" className="delete" onClick={()=>handleDelete(data)}>
                  <DeleteFilled />
                </button>
                <button type="text" className="edit" onClick={()=>handleEdit(data)}>
                  <EditFilled />
                </button>
              </div>,
            },)
            setDataColumns(dataResult);
        }
    }, [columns])

    return <Table columns={dataColumns} dataSource={data} bordered size="middle"/>;
}
