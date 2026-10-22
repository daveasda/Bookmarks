import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home.jsx'
import Shop from './Shop.jsx'
import About from './About.jsx'
import Checkout from './Checkout.jsx'
import Cart from './Cart.jsx'
import MyProfile from './MyProfile.jsx'
import Account from './Account.jsx'
import BookDetails from './BookDetails.jsx'
// import Dashboard from './Dashboard.jsx'
// import AdminDashboard from './AdminDashboard.jsx'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/account" element={<Account />} />
        <Route path="/book/:id" element={<BookDetails />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/:userId" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}

      </Routes>
    </Router>
     
  )
}

export default App
