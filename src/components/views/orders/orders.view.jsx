import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import searchIcon from './../../../assets/search.svg';
import addIcon from './../../../assets/add.svg';
import editIcon from './../../../assets/edit.svg';
import deleteIcon from './../../../assets/delete.svg';
import filterIcon from './../../../assets/filter.svg';
import './orders.css';
import { useState, useEffect } from 'react';

const OrdersView = (props) => {
  const {
    page,
    setPage,
    showAddEdit,
    setShowAddEdit,
    showFilter,
    setShowFilter,
    handleAdd,
    handleSearchClick,
    handleInputKeyDown,
    searchTerm,
    setSearchTerm,
    paginatedFiltered,
    filteredOrders,
  } = props;

  return (
    <div className="orders-view">
      <div className="header-row">
        <h1>Órdenes</h1>
      </div>

      <GridToolbar>
        <div className="toolbar-container">
          <div className="search-box">
            <img src={searchIcon} className="k-icon k-i-search" style={{ cursor: 'pointer' }} onClick={handleSearchClick} />
            <input
              type="text"
              placeholder="Buscar"
              className="k-input"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={handleInputKeyDown}
            />
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
          style={{ height: '320px', width: '100%' }}
          data={paginatedFiltered}
          skip={page.skip}
          take={page.take}
          total={filteredOrders.length}
          onPageChange={(e) => setPage(e.page)}
          pageable={{ buttonCount: 5, pageSizes: true, info: true }}
          sortable
          resizable
          scrollable="scrollable"
          autoGenerateColumns={false}
          tableLayout="fixed"
        >
          <GridColumn field="OrderNum" title="# Orden" width="120px" />
          <GridColumn field="CustNum" title="Cliente" width="180px" />
          <GridColumn field="OrderStatus" title="Estado" width="170px" />
          <GridColumn field="OrderDate" title="Fecha de orden" width="170px" />
          <GridColumn field="ShipDate" title="Fecha de envío" width="170px" />
          <GridColumn field="SalesRep" title="Vendedor" />
        </Grid>
      </div>

      {showAddEdit && (
        <Dialog title="Agregar una orden" onClose={() => setShowAddEdit(false)}>
          <div style={{ minWidth: 400 }}>
            <p>Formulario de orden (pendiente de implementación)</p>
          </div>
          <DialogActionsBar>
            <Button onClick={() => setShowAddEdit(false)}>Cancelar</Button>
            <Button themeColor="primary">Guardar</Button>
          </DialogActionsBar>
        </Dialog>
      )}

      {showFilter && (
        <Dialog title="Filtrar Órdenes" onClose={() => setShowFilter(false)}>
          <div style={{ minWidth: 300 }}>
            <p>Formulario de filtro...</p>
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

export default OrdersView;
