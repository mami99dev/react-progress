import axios from 'axios';

class OrdersService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async getOrders() {
    const response = await axios.get(`${this.apiUrl}/order/web/pdo/orderService/OrderOrderLine-BE`, {});
    return response.data;
  }
}

export default OrdersService; 