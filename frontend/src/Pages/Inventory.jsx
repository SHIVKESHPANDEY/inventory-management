import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getInventory } from "../API/index.js";
import '../App.css'; 

function Inventory() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getInventory().then((res) => {
     
      const transformedData = res.products.map(product => ({
        ...product,
        updatedAt: product.meta?.updatedAt, 
      }));
      setDataSource(transformedData);
      setLoading(false);
    });
  }, []);

  return (
    <div className="pages-container">
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Inventory</Typography.Title>
        <Table 
          loading={loading}
          columns={[
            {
              title: "Product ID",
              dataIndex: "id",
            },
            {
              title: "Name",
              dataIndex: "title",
            },
            {
              title: "Price",
              dataIndex: "price",
              render: (value) => <span>${value}</span>,
            },
            {
              title: "Stock",
              dataIndex: "stock",
            },
            {
              title: "Category",
              dataIndex: "category",
            },
            {
              title: "Stock Status",
              dataIndex: "availabilityStatus",
              render: (status) => (
                <span style={{ color: status === "Low Stock" ? "red" : "Green" }}>
                  {status}
                </span>
              )
            },
            {
              title: "Updated At",
              dataIndex: "updatedAt",
              render: (value) => new Date(value).toLocaleDateString(), 
            },
          ]}
          dataSource={dataSource}
          pagination={{
            pageSize: 10,
          }}
          scroll={{ y: 'calc(100vh - 180px)' }} 
        />
      </Space>
    </div>
  );
}

export default Inventory;
