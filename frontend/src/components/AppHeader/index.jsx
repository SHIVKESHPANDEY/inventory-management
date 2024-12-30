import React from 'react'
import { BellFilled, MailOutlined } from '@ant-design/icons';
import { Badge, Image, Space, Typography } from 'antd'

import JmanLogo from '../../assets/jman-logo.jpg'

function AppHeader() {
  return (
    <div className='AppHeader'>
      <Image width={40} src={JmanLogo} preview={false}></Image>
      <Typography.Title>Dashboard</Typography.Title>
      <Space>
        <Badge count={3} dot>
          <MailOutlined style={{ fontSize: 24 }} />
        </Badge>
        <Badge count={7}>
          <BellFilled style={{ fontSize: 24 }} />
        </Badge>
      </Space>
    </div>
  )
}

export default AppHeader