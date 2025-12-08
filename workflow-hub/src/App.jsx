import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom' 
import Home from './Pages/Home'
import Corbeille from './Pages/Corbeille'

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/corbeille" element={<Corbeille/>} />
      </Routes>

      </BrowserRouter>
    </div>
  )
}
