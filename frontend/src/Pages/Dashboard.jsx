import { Card, Col, Row, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory, getOrders, getRevenue, getOrderStatus, getProducts, getCategories } from "../API/index.js";
import { ShoppingCartOutlined, ShoppingOutlined, DollarCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Bar, Pie as PieChart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Dashboard() {
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [topRecentOrders, setTopRecentOrders] = useState([]);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [topSellingCategories, setTopSellingCategories] = useState([]);
  const [leastStockProducts, setLeastStockProducts] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState({ months: [], revenue: [] });
  const [orderStatus, setOrderStatus] = useState({ pending: 0, delivered: 0, dispatched: 0, returned: 0 });

  useEffect(() => {
    getOrders().then((res) => {
      console.log(res);

      setOrders(res.total);
      setRevenue(res.discountedTotal);
      const formattedData = res.carts
        .slice(0, 5) // Limit to the top 5 orders
        .map(order => ({
          id: order.id,
          userId: order.userId,
          products: order.products.map(product => `${product.title} (Qty: ${product.quantity})`).join(', '),
          total: `$${order.total.toFixed(2)}`,
          status: 'Pending', // Default status
        }));


      setTopRecentOrders(formattedData);
    }).catch(console.error);

    getInventory().then((res) => {
      setInventory(res.total);
      setLeastStockProducts(res.products.sort((a, b) => a.stock - b.stock).slice(0, 5)); // Least stock products
    }).catch(console.error);

    getCustomers().then((res) => {
      setCustomers(res.total);
    }).catch(console.error);

    getRevenue().then((res) => {
      setMonthlyRevenue({
        months: res.months,
        revenue: res.revenue
      });
    }).catch(console.error);

    getProducts().then((res) => {
      setTopSellingProducts(res.products.sort((a, b) => b.sales - a.sales).slice(0, 5)); // Top 5 selling products
    }).catch(console.error);

    getCategories().then((res) => {
      setTopSellingCategories(res.categories.sort((a, b) => b.sales - a.sales).slice(0, 5)); // Top 5 selling categories
    }).catch(console.error);

    getOrderStatus().then((res) => {
      setOrderStatus({
        pending: res.status.pending || 0,
        delivered: res.status.delivered || 0,
        dispatched: res.status.dispatched || 0, // Add dispatched
        returned: res.status.returned || 0,
      });
    }).catch(console.error);
  }, []);

  return (
    <div style={{ padding: 50 }}>
      <Typography.Title level={4}>Last 30 Days Insights</Typography.Title>
      <Row gutter={200}>
        <Col span={6}>
          <DashboardCard
            icon={<ShoppingCartOutlined style={iconStyle('rgba(24,1,97,1)')} />}
            title="Orders"
            value={orders}
          />
        </Col>
        <Col span={6}>
          <DashboardCard
            icon={<ShoppingOutlined style={iconStyle('rgba(79,23,135,1)')} />}
            title="Inventory"
            value={inventory}
          />
        </Col>
        <Col span={6}>
          <DashboardCard
            icon={<UserOutlined style={iconStyle('rgba(235,54,120,1)')} />}
            title="Customers"
            value={customers}
          />
        </Col>
        <Col span={6}>
          <DashboardCard
            icon={<DollarCircleOutlined style={iconStyle('rgba(251,119,60,1)')} />}
            title="Revenue"
            value={revenue}
          />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={12}>
          <Typography.Text style={{ fontSize: 24 }}>Last 3 Months Revenue</Typography.Text>
          <Card style={{ height: '50%' }}>
            <Bar
              options={chartOptions("Revenue by Month")}
              data={{
                labels: monthlyRevenue.months,
                datasets: [{
                  label: "Revenue",
                  data: monthlyRevenue.revenue,
                  backgroundColor: "rgba(255, 99, 132, 0.2)",
                  borderColor: "rgba(255, 99, 132, 1)",
                  borderWidth: 1,
                }],
              }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Typography.Text style={{ fontSize: 24 }}>Order Status</Typography.Text>
          <Card style={{ height: '100%' }}>
            <PieChart
              data={{
                labels: ["Pending", "Delivered", "Dispatched", "Returned"], // Add Dispatched
                datasets: [{
                  data: [
                    orderStatus.pending,
                    orderStatus.delivered,
                    orderStatus.dispatched,
                    orderStatus.returned,
                  ],
                  backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#cc65fe"], // Colors for Dispatched
                }]
              }}
              options={chartOptions("Order Status")}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 60 }}>
        <Col span={12}>
          <Typography.Text style={{ fontSize: 24 }}>Top 5 Selling Products</Typography.Text>
          <Table
            columns={[
              { title: "Title", dataIndex: "title" },
              { title: "Sales", dataIndex: "sales" },
              { title: "Price", dataIndex: "price" },
            ]}
            dataSource={topSellingProducts}
            pagination={false}
          />
        </Col>
        <Col span={12}>
          <Typography.Text style={{ fontSize: 24 }}>Top 5 Selling Categories</Typography.Text>
          <Table
            columns={[
              { title: "Category", dataIndex: "category" },
              { title: "Sales", dataIndex: "sales" },
            ]}
            dataSource={topSellingCategories}
            pagination={false}
          />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 40 }}>
        <Col span={24}>
          <Typography.Text style={{ fontSize: 24 }}>Top 5 Recent Orders</Typography.Text>
          {/* <Table
            columns={[
              { title: "Title", dataIndex: "title" },
              { title: "Quantity", dataIndex: "quantity" },
              { title: "Price", dataIndex: "price" },
            ]}
            dataSource={topRecentOrders}
            pagination={false}
          /> */}
          <Table
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
            ]}
            pagination={false}
            dataSource={topRecentOrders}
          />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 40 }}>
        <Col span={24}>
          <Typography.Text style={{ fontSize: 24 }}>Least Stock Products</Typography.Text>
          <Table
            columns={[
              { title: "Title", dataIndex: "title" },
              { title: "Stock", dataIndex: "stock" },
              { title: "Price", dataIndex: "price" },
            ]}
            dataSource={leastStockProducts}
            pagination={false}
          />
        </Col>
      </Row>
    </div>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

const iconStyle = (backgroundColor) => ({
  color: "white",
  backgroundColor,
  borderRadius: 20,
  fontSize: 24,
  padding: 8,
});

const chartOptions = (titleText) => ({
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: titleText,
    },
  },
});

export default Dashboard;
