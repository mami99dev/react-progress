import { MainAction, CustomersAction, OrdersAction } from './components/actions'
import { BrowserRouter, Routes, Route } from 'react-router'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <MainAction /> } />
        <Route path="/customers" element={ <CustomersAction /> } />
        <Route path="/orders" element={ <OrdersAction /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default Router