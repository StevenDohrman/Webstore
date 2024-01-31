import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import Products from './pages/Product-List';
import Product from './pages/Product';
import Contact from './pages/Contact';
import Review from './pages/Review';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/product-list' element={<Products />} />
          <Route path='/product/:slug' element={<Product />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/review' element={<Review />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
