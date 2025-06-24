import axios from 'axios'

class CustomersService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl
  }

  async getCustomers() {
    const response = await axios.get(`${this.apiUrl}/Cliente/rest/ClienteService/leeClientes`, {})
    return response.data
  }
}
export default CustomersService