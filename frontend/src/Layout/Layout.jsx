import React from 'react'
import { Outlet } from 'react-router-dom'
import AppHeader from '../components/AppHeader/index.jsx'
import SideMenu from '../components/SideMenu/index.jsx'
import AppFooter from '../components/AppFooter/index.jsx'
import { Space } from 'antd'

function MyLayout() {
    return (
        <div className="App">
            <AppHeader />
            <Space className="SideMenuAndPageContent">
                <SideMenu />
                <Outlet />
            </Space>

            <AppFooter />
        </div>
    )
}

export default MyLayout