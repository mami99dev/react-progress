import { MainAction, CustomersAction, OrdersAction } from './components/actions'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainAction />} />
          <Route path="/customers" element={<CustomersAction />} />
          <Route path="/orders" element={<OrdersAction />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router