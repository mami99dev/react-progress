import React, { useEffect, useState } from "react";
import { MainView } from './../../views'
import { OrdersService, CustomersService } from './../../../services';

const MainAction = () => {
  const ordersService = new OrdersService(import.meta.env.VITE_API_URL);
  const customersService = new CustomersService(import.meta.env.VITE_API_URL);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [ventasMes, setVentasMes] = useState(0);
  const [ordenesPendientes, setOrdenesPendientes] = useState({ pendientes: 0, total: 0 });
  const [clientesSemana, setClientesSemana] = useState(0);
  const [gaugeMax, setGaugeMax] = useState({ ventas: 100, pendientes: 100, clientes: 100 });
  const [lineSeries, setLineSeries] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  const getDayOfWeek = (dateStr) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.getDay(); // 0=Dom, 1=Lun, ...
  };

  useEffect(() => {
    const fetchData = async () => {
      const dataOrders = await ordersService.getOrders();
      const allOrders = dataOrders.dsOrderOrderLine.ttOrder || [];
      setOrders(allOrders);
      const dataCustomers = await customersService.getCustomers();
      const allCustomers = dataCustomers.dscust.tmpcust || [];
      setCustomers(allCustomers);

      // Calcular fechas de hace 2 años
      const today = new Date();
      const twoYearsAgo = new Date(today);
      twoYearsAgo.setFullYear(today.getFullYear() - 2);
      const monthAndYearTwoYearsAgo = twoYearsAgo.toISOString().slice(0, 7); // YYYY-MM

      // 1. Ventas del mes de hace 2 años
      const ordersMes = allOrders.filter(order => order.OrderDate && order.OrderDate.startsWith(monthAndYearTwoYearsAgo));
      const ventasMesValue = ordersMes.reduce((acc, order) => acc + (order.Amount || 1), 0);
      setVentasMes(ventasMesValue);
      setGaugeMax(g => ({ ...g, ventas: Math.max(ventasMesValue * 2, 100) })); // Max value for gauge

      // 2. Órdenes pendientes (OrderStatus === 'Ordered') respecto al total de ese mes
      const pendientes = ordersMes.filter(order => order.OrderStatus === 'Ordered').length;
      setOrdenesPendientes({ pendientes, total: ordersMes.length });
      setGaugeMax(g => ({ ...g, pendientes: ordersMes.length || 1 }));

      // 3. Productos más vendidos (SalesRep) de la semana en curso de hace 2 años
      // Encontrar la semana actual de hace 2 años
      const getMonday = (date) => {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // lunes
        return new Date(d.setDate(diff));
      };
      const mondayTwoYearsAgo = getMonday(twoYearsAgo);
      const sundayTwoYearsAgo = new Date(mondayTwoYearsAgo);
      sundayTwoYearsAgo.setDate(mondayTwoYearsAgo.getDate() + 6);
      const formatDate = (date) => date.toISOString().slice(0, 10);
      const weekStart = formatDate(mondayTwoYearsAgo);
      const weekEnd = formatDate(sundayTwoYearsAgo);
      const ordersSemana = allOrders.filter(order => order.OrderDate && order.OrderDate >= weekStart && order.OrderDate <= weekEnd);
      // Agrupar por SalesRep y por día de la semana
      const salesRepDayCount = {};
      for (const order of ordersSemana) {
        if (!order.SalesRep || !order.OrderDate) continue;
        if (!salesRepDayCount[order.SalesRep]) salesRepDayCount[order.SalesRep] = Array(7).fill(0);
        const dayIdx = getDayOfWeek(order.OrderDate);
        salesRepDayCount[order.SalesRep][dayIdx] += 1;
      }
      // Top 5 productos (SalesRep) por total de la semana
      const topSalesReps = Object.entries(salesRepDayCount)
        .map(([name, arr]) => [name, arr.reduce((a, b) => a + b, 0)])
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name]) => name);
      setTopProducts(topSalesReps);
      // Series para el chart - Ensure data order matches weekDays (Lun, Mar, ..., Dom)
      const series = topSalesReps.map(rep => ({
        name: rep,
        data: [1, 2, 3, 4, 5, 6, 0].map(idx => salesRepDayCount[rep]?.[idx] || 0) // Maps getDayOfWeek (1=Lun, ..., 0=Dom) to weekDays array order (Lun=index0, ..., Dom=index6)
      }));
      setLineSeries(series);

      // 4. Total de clientes que compraron en esa semana
      const clientesCompraron = new Set(ordersSemana.map(order => order.CustNum));
      setClientesSemana(clientesCompraron.size);
      setGaugeMax(g => ({ ...g, clientes: allCustomers.length || 100 }));
    };
    fetchData();
  }, []);

  return (
    <MainView
      weekDays={weekDays}
      clientesSemana={clientesSemana}
      gaugeMax={gaugeMax}
      ventasMes={ventasMes}
      ordenesPendientes={ordenesPendientes}
      lineSeries={lineSeries}
    />
  )
}

export default MainAction