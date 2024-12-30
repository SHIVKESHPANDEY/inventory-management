export const getOrders = () => {
  return fetch("https://dummyjson.com/carts/").then((res) => res.json());
};

export const getRevenue = () => {
  return fetch("https://dummyjson.com/carts") // Adjust URL as needed
    .then((res) => res.json())
    .then((data) => {
      // Example mock data for the months
      const mockRevenueData = {
        January: 1000,
        February: 1200,
        March: 1500
      };

      // Here you would typically process `data` to get actual monthly revenue
      // For now, we are returning static mock data
      return {
        months: Object.keys(mockRevenueData),
        revenue: Object.values(mockRevenueData)
      };
    });
};


export const getInventory = () => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
};

export const getCustomers = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
};
export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};

export const getOrderStatus = () => {
  return new Promise((resolve) => {
    resolve({
      status: {
        pending: 45,
        delivered: 47,
        returned: 15,
        dispatched: 11,
      },
    });
  });
};

export const getProducts = () => {
  return new Promise((resolve) => {
    resolve({
      products: [
        { title: "Product A", sales: 1200, price: 100 },
        { title: "Product B", sales: 950, price: 200 },
        { title: "Product C", sales: 850, price: 150 },
        { title: "Product D", sales: 700, price: 120 },
        { title: "Product E", sales: 500, price: 180 },
        { title: "Product F", sales: 300, price: 90 },
      ],
    });
  });
};

export const getCategories = () => {
  return new Promise((resolve) => {
    resolve({
      categories: [
        { category: "Electronics", sales: 3000 },
        { category: "Clothing", sales: 2500 },
        { category: "Home Appliances", sales: 2000 },
        { category: "Books", sales: 1500 },
        { category: "Toys", sales: 1200 },
        { category: "Sports", sales: 1000 },
      ],
    });
  });
};
