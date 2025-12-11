import React from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Home from './Pages/Home'
import Corbeille from './Pages/Corbeille'
import Navbar from './Components/Navbar'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/corbeille" element={<Corbeille />} />
        </Routes>
        
      </BrowserRouter>
    </div>
  )
}
