import { useState, useEffect } from 'react';
import { OrdersView } from './../../views'
import { OrdersService } from './../../../services';

const OrdersAction = () => {
  const ordersService = new OrdersService(import.meta.env.VITE_API_URL);
  const [paginatedData, setPaginatedData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showAddEdit, setShowAddEdit] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [page, setPage] = useState({ skip: 0, take: 5 });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState(orders);

  // Obtener las órdenes al cargar el componente
  useEffect(() => {
    getCurrentOrders();
  }, []);

  // Paginación sobre las órdenes
  useEffect(() => {
    setPaginatedData(orders.slice(page.skip, page.skip + page.take));
  }, [orders, page]);

  // Servicio para obtener las órdenes
  const getCurrentOrders = async () => {
    const data = await ordersService.getOrders();
    const currentOrders = data.dsOrderOrderLine.ttOrder
    setOrders(currentOrders);
  };

  // Handler para agregar una orden
  const handleAdd = () => {
    setShowAddEdit(true);
  };

  // Estado para las órdenes filtradas
  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  // Filtrar cuando searchTerm cambie
  useEffect(() => {
    if (!searchTerm) {
      setFilteredOrders(orders);
    } else {
      const lower = searchTerm.toLowerCase();
      setFilteredOrders(
        orders.filter(order =>
          String(order.OrderNum).toLowerCase().includes(lower) ||
          String(order.CustNum).toLowerCase().includes(lower) ||
          (order.OrderStatus && order.OrderStatus.toLowerCase().includes(lower)) ||
          (order.OrderDate && order.OrderDate.toLowerCase().includes(lower)) ||
          (order.ShipDate && order.ShipDate.toLowerCase().includes(lower)) ||
          (order.SalesRep && order.SalesRep.toLowerCase().includes(lower))
        )
      );
    }
  }, [searchTerm, orders]);

  // Paginación sobre los filtrados
  const paginatedFiltered = filteredOrders.slice(page.skip, page.skip + page.take);

  // Handler para buscar al presionar el ícono
  const handleSearchClick = () => {
    // El filtro ya se aplica automáticamente, pero podrías forzar el efecto aquí si lo deseas
    setSearchTerm(searchTerm.trim());
  };

  // Handler para Enter en el input
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') handleSearchClick();
  };

  return (
    <OrdersView
      orders={orders}
      paginatedData={paginatedData}
      page={page}
      setPage={setPage}
      showAddEdit={showAddEdit}
      setShowAddEdit={setShowAddEdit}
      showFilter={showFilter}
      setShowFilter={setShowFilter}
      handleAdd={handleAdd}
      handleSearchClick={handleSearchClick}
      handleInputKeyDown={handleInputKeyDown}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      paginatedFiltered={paginatedFiltered}
      filteredOrders={filteredOrders}
    />
  )
}

export default OrdersAction