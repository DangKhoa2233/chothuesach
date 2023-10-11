import React from 'react';
import {
    AppstoreOutlined,
    ContainerOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    MenuUnfoldOutlined,
    DesktopOutlined,
    MailOutlined
  } from '@ant-design/icons';
  import { Button, Menu } from 'antd';
  import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }


export const Navigation = () => {

    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
      setCollapsed(!collapsed);
    };

    const navigate = useNavigate();

    const items = [
      getItem(<div onClick={()=> {
        navigate('/admin/dashboard')
      }}>Dashboard</div>, '1', <PieChartOutlined />),
      getItem(<div onClick={()=> {
        navigate('/admin/accountManagement')
      }}>Account Management</div>, '2', <DesktopOutlined />),
      getItem(<div onClick={()=> {
        navigate('/admin/roomManagement')
      }}>Room Management</div>, '3', <ContainerOutlined />),
      getItem('Booking', 'sub2', <MailOutlined />, [
        getItem(<div onClick={()=> {
          navigate('/admin/checkingManagement')
        }}>Checking Management</div>, '7'),
        getItem(<div onClick={()=> {
          navigate('/admin/bookingService')
        }}>Booking Service</div>, '8'),
      ]),
      getItem(<div onClick={()=> {
        navigate('/admin/serviceManagement')
      }}>Service Management</div>, '9', <ContainerOutlined />),
      // getItem('Revenue', 'sub3', <AppstoreOutlined />, [
      //   getItem('Invoices Management', '10'),
      //   getItem('Statistical Management', '11'),
      // ]),
    ];

    return (
        <div
            className='admin__navigation bg-[#000B16] w-[256px] h-[calc(100vh-100px)]'
        >
            {/* <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{
                marginBottom: 16,
            }}
            >
            { <MenuFoldOutlined />}
            </Button> */}
            <div className="flex items-center justify-center py-[20px]">
              <img src='/images/fly.png' className="w-[55%]"/>
            </div>
            <Menu
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              theme="dark"
              inlineCollapsed={collapsed}
              items={items}
            />
        </div>
    )
}
