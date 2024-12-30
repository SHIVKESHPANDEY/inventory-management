import { Menu } from 'antd'
import React from 'react'
import { AppstoreOutlined, ShopOutlined, ShoppingCartOutlined, UserAddOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function SideMenu() {
  const navigate = useNavigate()
  return (
    <div className='SideMenu' >
      <Menu style={{ width: 255,padding: 5 }}
        onClick={(item) => {
          navigate(item.key)
        }}
        items={[
          {
            label: <span style={{fontSize: 16}}>Dashboard</span>,
            icon: <AppstoreOutlined style={{ fontSize: 30 }} />,
            key: '/dashboard'
          },
          {
            label: <span style={{fontSize: 16}}>Inventory</span>,
            icon: <ShopOutlined style={{ fontSize: 30 }} />,
            key: '/inventory'
          },
          {
            label: <span style={{fontSize: 16}}>Orders</span>,
            icon: <ShoppingCartOutlined style={{ fontSize: 30 }} />,
            key: '/orders'
          },
          {
            label: <span style={{fontSize: 16}}>Customers</span>,
            icon: <UserAddOutlined style={{ fontSize: 30 }} />,
            key: '/customers'
          },
          {
            label: <span style={{fontSize: 16}}>Manage Inventory</span>,
            icon: <ShopOutlined style={{ fontSize: 30 }} />,
            key: '/ManageInventory'
          }]}>

      </Menu>
    </div>
  )
}

export default SideMenu