import { useState, useEffect } from 'react';
import { CustomersView } from './../../views'
import { CustomersService } from './../../../services';

const CustomersAction = () => {
  const customersService = new CustomersService(import.meta.env.VITE_API_URL);
  const [paginatedData, setPaginatedData] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showAddEdit, setShowAddEdit] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [page, setPage] = useState({ skip: 0, take: 5 });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  // Obtener los clientes al cargar los componentes
  useEffect(() => {
    getCurrentCustomers();
  }, []);

  // Paginación sobre los clientes
  useEffect(() => {
    setPaginatedData(customers.slice(page.skip, page.skip + page.take));
  }, [customers, page]);

  // Servicio para obtener los clientes
  const getCurrentCustomers = async () => {
    const data = await customersService.getCustomers();
    const currentCustomers = data.dscust.tmpcust
    setCustomers(currentCustomers);
  }

  // Handler para agregar un cliente
  const handleAdd = () => {
    setShowAddEdit(true);
  };

  // Estado para las órdenes filtradas
  useEffect(() => {
    setFilteredCustomers(customers);
  }, [customers]);

  // Filtrar cuando searchTerm cambie
  useEffect(() => {
    if (!searchTerm) {
      setFilteredCustomers(customers);
    } else {
      const lower = searchTerm.toLowerCase();
      setFilteredCustomers(
        customers.filter(customer =>
          String(customer.CustNum).toLowerCase().includes(lower) ||
          (customer.Name && customer.Name.toLowerCase().includes(lower)) ||
          (customer.City && customer.City.toLowerCase().includes(lower)) ||
          (customer.State && customer.State.toLowerCase().includes(lower)) ||
          (customer.SalesRep && customer.SalesRep.toLowerCase().includes(lower))
        )
      );
    }
  }, [searchTerm, customers]);

  // Paginación sobre los filtrados
  const paginatedFiltered = filteredCustomers.slice(page.skip, page.skip + page.take);

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
    <CustomersView
      customers={customers}
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
      filteredCustomers={filteredCustomers}
    />
  )
}

export default CustomersAction