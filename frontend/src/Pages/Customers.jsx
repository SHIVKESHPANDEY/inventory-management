import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers } from "../API/index.js";
import '../App.css'; 

function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      setDataSource(res.users);
      setLoading(false);
    });
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Customers</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "User ID",
            dataIndex: "id",
            
          },
          {
            title: "First Name",
            dataIndex: "firstName",
          },
          {
            title: "LastName",
            dataIndex: "lastName",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Phone",
            dataIndex: "phone",
          },

          {
            title: "address",
            dataIndex: "address",
            render: (address) => {
              return (
                <span>
                  {address.address}, {address.city}
                </span>
              );
            },
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 10,
        }}
        scroll={{ y: 'calc(100vh - 180px)' }} // Adjust as needed
      ></Table>
    </Space>
  );
}
export default Customers;