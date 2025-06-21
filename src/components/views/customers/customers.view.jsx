import { useState } from 'react';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import searchIcon from './../../../assets/search.svg'
import addIcon from './../../../assets/add.svg'
import editIcon from './../../../assets/edit.svg'
import deleteIcon from './../../../assets/delete.svg'
import filterIcon from './../../../assets/filter.svg'
import './customers.css';

const initialCustomers = [
  {
    CustNum: 1,
    Country: 'México',
    Name: 'Comercial Mexicana',
    Address: 'Av. Insurgentes 123',
    Address2: '',
    City: 'CDMX',
    State: 'CDMX',
    PostalCode: '01000',
    Contact: 'Juan Pérez',
    Phone: '555-1234',
    SalesRep: 'SR01',
    CreditLimit: 100000,
    Balance: 25000.50,
    Terms: 'Contado',
    Discount: 10,
    Comments: '',
    Fax: '',
    EmailAddress: 'contacto@comercial.mx',
  },
  {
    CustNum: 2,
    Country: 'Colombia',
    Name: 'Distribuciones Andinas',
    Address: 'Cra 45 #67-89',
    Address2: '',
    City: 'Bogotá',
    State: 'Cundinamarca',
    PostalCode: '110111',
    Contact: 'María Gómez',
    Phone: '601-555-6789',
    SalesRep: 'SR02',
    CreditLimit: 50000,
    Balance: 12000.00,
    Terms: '30 días',
    Discount: 5,
    Comments: '',
    Fax: '',
    EmailAddress: 'ventas@andinas.co',
  },
  {
    CustNum: 3,
    Country: 'México',
    Name: 'Distribuciones Andinas',
    Address: 'Cra 45 #67-89',
    Address2: '',
    City: 'Bogotá',
    State: 'Cundinamarca',
    PostalCode: '110111',
    Contact: 'María Gómez',
    Phone: '601-555-6789',
    SalesRep: 'SR02',
    CreditLimit: 50000,
    Balance: 12000.00,
    Terms: '30 días',
    Discount: 5,
    Comments: '',
    Fax: '',
    EmailAddress: 'ventas@andinas.co',
  },
  {
    CustNum: 4,
    Country: 'Argentina',
    Name: 'Distribuciones Andinas',
    Address: 'Cra 45 #67-89',
    Address2: '',
    City: 'Bogotá',
    State: 'Cundinamarca',
    PostalCode: '110111',
    Contact: 'María Gómez',
    Phone: '601-555-6789',
    SalesRep: 'SR02',
    CreditLimit: 50000,
    Balance: 12000.00,
    Terms: '30 días',
    Discount: 5,
    Comments: '',
    Fax: '',
    EmailAddress: 'ventas@andinas.co',
  },
  {
    CustNum: 5,
    Country: 'Chile',
    Name: 'Distribuciones Andinas',
    Address: 'Cra 45 #67-89',
    Address2: '',
    City: 'Bogotá',
    State: 'Cundinamarca',
    PostalCode: '110111',
    Contact: 'María Gómez',
    Phone: '601-555-6789',
    SalesRep: 'SR02',
    CreditLimit: 50000,
    Balance: 12000.00,
    Terms: '30 días',
    Discount: 5,
    Comments: '',
    Fax: '',
    EmailAddress: 'ventas@andinas.co',
  },
  {
    CustNum: 6,
    Country: 'Ecuador',
    Name: 'Distribuciones Andinas',
    Address: 'Cra 45 #67-89',
    Address2: '',
    City: 'Bogotá',
    State: 'Cundinamarca',
    PostalCode: '110111',
    Contact: 'María Gómez',
    Phone: '601-555-6789',
    SalesRep: 'SR02',
    CreditLimit: 50000,
    Balance: 12000.00,
    Terms: '30 días',
    Discount: 5,
    Comments: '',
    Fax: '',
    EmailAddress: 'ventas@andinas.co',
  },
  {
    CustNum: 7,
    Country: 'Brasil',
    Name: 'Distribuciones Andinas',
    Address: 'Cra 45 #67-89',
    Address2: '',
    City: 'Bogotá',
    State: 'Cundinamarca',
    PostalCode: '110111',
    Contact: 'María Gómez',
    Phone: '601-555-6789',
    SalesRep: 'SR02',
    CreditLimit: 50000,
    Balance: 12000.00,
    Terms: '30 días',
    Discount: 5,
    Comments: '',
    Fax: '',
    EmailAddress: 'ventas@andinas.co',
  },
  {
    CustNum: 8,
    Country: 'Canadá',
    Name: 'Distribuciones Andinas',
    Address: 'Cra 45 #67-89',
    Address2: '',
    City: 'Bogotá',
    State: 'Cundinamarca',
    PostalCode: '110111',
    Contact: 'María Gómez',
    Phone: '601-555-6789',
    SalesRep: 'SR02',
    CreditLimit: 50000,
    Balance: 12000.00,
    Terms: '30 días',
    Discount: 5,
    Comments: '',
    Fax: '',
    EmailAddress: 'ventas@andinas.co',
  },
  {
    CustNum: 9,
    Country: 'USA',
    Name: 'Distribuciones Andinas',
    Address: 'Cra 45 #67-89',
    Address2: '',
    City: 'Bogotá',
    State: 'Cundinamarca',
    PostalCode: '110111',
    Contact: 'María Gómez',
    Phone: '601-555-6789',
    SalesRep: 'SR02',
    CreditLimit: 50000,
    Balance: 12000.00,
    Terms: '30 días',
    Discount: 5,
    Comments: '',
    Fax: '',
    EmailAddress: 'ventas@andinas.co',
  },
  {
    CustNum: 10,
    Country: 'Uruguay',
    Name: 'Distribuciones Andinas',
    Address: 'Cra 45 #67-89',
    Address2: '',
    City: 'Bogotá',
    State: 'Cundinamarca',
    PostalCode: '110111',
    Contact: 'María Gómez',
    Phone: '601-555-6789',
    SalesRep: 'SR02',
    CreditLimit: 50000,
    Balance: 12000.00,
    Terms: '30 días',
    Discount: 5,
    Comments: '',
    Fax: '',
    EmailAddress: 'ventas@andinas.co',
  },
  {
    CustNum: 11,
    Country: 'Bolivia',
    Name: 'Distribuciones Andinas',
    Address: 'Cra 45 #67-89',
    Address2: '',
    City: 'Bogotá',
    State: 'Cundinamarca',
    PostalCode: '110111',
    Contact: 'María Gómez',
    Phone: '601-555-6789',
    SalesRep: 'SR02',
    CreditLimit: 50000,
    Balance: 12000.00,
    Terms: '30 días',
    Discount: 5,
    Comments: '',
    Fax: '',
    EmailAddress: 'ventas@andinas.co',
  },
];

const CustomersView = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [showAddEdit, setShowAddEdit] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [page, setPage] = useState({ skip: 0, take: 5 });

  const paginatedData = customers.slice(page.skip, page.skip + page.take);

  const handleAdd = () => {
    setEditingCustomer(null);
    setShowAddEdit(true);
  };

  return (
    <div className="customers-view">
      <div className="header-row">
        <h1>Clientes</h1>
      </div>

      <GridToolbar>
        <div className="toolbar-container">
          <div className="search-box">
            <img src={searchIcon} className="k-icon k-i-search" />
            <input type="text" placeholder="Buscar" className="k-input" />
          </div>
          <div className="toolbar-actions">
            <Button type="button" onClick={handleAdd}>
              <span className="button-content">
                <img src={addIcon} alt="Agregar" />
                Agregar
              </span>
            </Button>
            <Button type="button" onClick={handleAdd}>
              <span className="button-content">
                <img src={editIcon} alt="Editar" />
                Editar
              </span>
            </Button>
            <Button type="button" onClick={handleAdd}>
              <span className="button-content">
                <img src={deleteIcon} alt="Eliminar" />
                Eliminar
              </span>
            </Button>
            <Button type="button" onClick={() => setShowFilter(true)}>
              <span className="button-content">
                <img src={filterIcon} alt="Filtrar" />
                Filtrar
              </span>
            </Button>
          </div>
        </div>
      </GridToolbar>

      <div className="grid-wrapper">
        <Grid
          style={{ height: '410px', width: '100%' }}
          data={paginatedData}
          skip={page.skip}
          take={page.take}
          total={customers.length}
          onPageChange={(e) => setPage(e.page)}
          pageable={{ buttonCount: 5, pageSizes: true, info: true }}
          sortable
          resizable
          scrollable="scrollable"
          autoGenerateColumns={false}
          tableLayout="auto"
        >

          {/* Columnas hasta EmailAddress */}
          <GridColumn field="CustNum" title="ID" />
          <GridColumn field="Name" title="Nombre" />
          <GridColumn field="City" title="Ciudad" />
          <GridColumn field="State" title="Estado" />
          <GridColumn field="Phone" title="Teléfono" />
          <GridColumn field="EmailAddress" title="Correo" />
        </Grid>
      </div>

      {showAddEdit && (
        <Dialog title="Formulario de Cliente" onClose={() => setShowAddEdit(false)}>
          <div style={{ minWidth: 400 }}>
            <p>Formulario de cliente (pendiente de implementación)</p>
          </div>
          <DialogActionsBar>
            <Button onClick={() => setShowAddEdit(false)}>Cancelar</Button>
            <Button themeColor="primary">Guardar</Button>
          </DialogActionsBar>
        </Dialog>
      )}

      {showFilter && (
        <Dialog title="Filtrar Clientes" onClose={() => setShowFilter(false)}>
          <div style={{ minWidth: 300 }}>
            <p>Formulario de filtro (pendiente de implementación)</p>
          </div>
          <DialogActionsBar>
            <Button onClick={() => setShowFilter(false)}>Cancelar</Button>
            <Button themeColor="primary">Aplicar</Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  );
};

export default CustomersView;
