import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import Products from './pages/Product-List';
import Product from './pages/Product'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/product-list' element={<Products />} />
          <Route path='/product' element={<Product />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
