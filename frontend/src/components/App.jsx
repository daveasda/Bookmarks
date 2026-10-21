import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home.jsx'
import Shop from './Shop.jsx'
// import Login from './Login.jsx'
// import Register from './Register.jsx'
// import Dashboard from './Dashboard.jsx'
// import AdminDashboard from './AdminDashboard.jsx'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Shop />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/:userId" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}

      </Routes>
    </Router>
     
  )
}

export default App
