import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom' 
import Home from './Pages/Home'
import Corbeille from './Pages/Corbeille'
import Login from "./Pages/Login"

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/corbeille" element={<Corbeille />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
