import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import InvoiceDashboard from './pages/InvoiceDashboard'
import InvoiceDetails from './pages/InvoiceDetails'
import Header from './widgets/Header'
import { Modal } from '@mui/material'

import './App.css'

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" Component={InvoiceDashboard} />
          <Route path="/invoice/:id" Component={InvoiceDetails} />
        </Routes>
      </Router>
    </>
  )
}

export default App
