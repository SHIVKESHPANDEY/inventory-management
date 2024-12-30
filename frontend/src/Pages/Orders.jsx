import { Space, Table, Typography, Dropdown, Menu, Button } from "antd";
import { useEffect, useState } from "react";
import { getOrders } from "../API/index.js";
import '../App.css'; 

function Orders() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      const formattedData = res.carts.map(order => ({
        id: order.id,
        userId: order.userId,
        products: order.products.map(product => `${product.title} (Qty: ${product.quantity})`).join(', '),
        total: `$${order.total.toFixed(2)}`,
        status: 'Pending', // Default status
      }));
      setDataSource(formattedData);
      setLoading(false);
    });
  }, []);

  const handleMenuClick = (orderId, status) => {
    // Update the order status based on the selected option
    const updatedDataSource = dataSource.map(order => 
      order.id === orderId ? { ...order, status } : order
    );
    setDataSource(updatedDataSource);
  };

  const statusMenu = (orderId) => (
    <Menu>
      <Menu.Item key="pending" onClick={() => handleMenuClick(orderId, 'Pending')}>
        Pending
      </Menu.Item>
      <Menu.Item key="dispatched" onClick={() => handleMenuClick(orderId, 'Dispatched')}>
        Dispatched
      </Menu.Item>
      <Menu.Item key="delivered" onClick={() => handleMenuClick(orderId, 'Delivered')}>
        Delivered
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="pages-container">
      <Space size={20} direction="vertical" style={{ width: '100%', height: '100%' }}>
        <Typography.Title level={4}>Orders</Typography.Title>
        <Table
          loading={loading}
          columns={[
            {
              title: "Order ID",
              dataIndex: "id",
            },
            {
              title: "User ID",
              dataIndex: "userId",
            },
            {
              title: "Products and their Quantity",
              dataIndex: "products",
            },
            {
              title: "Total Amount",
              dataIndex: "total",
            },
            {
              title: "Order Status",
              dataIndex: "status",
              render: (status, record) => (
                <Dropdown overlay={statusMenu(record.id)} trigger={['click']}>
                  <Button>{status}</Button>
                </Dropdown>
              ),
            },
          ]}
          dataSource={dataSource}
          pagination={{
            pageSize: 10,
          }}
          scroll={{ y: 'calc(100vh - 180px)' }} // Adjust as needed
        />
      </Space>
    </div>
  );
}

export default Orders;
