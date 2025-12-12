import React from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Home from './Pages/Home'
import Corbeille from './Pages/Corbeille'
import Navbar from './Components/Navbar'
import Login from './Pages/Login'

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function App() {
  return (
    <div>
 <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/corbeille" element={<Corbeille />} />
        </Routes>

      </BrowserRouter>
    </DndProvider>
    </div>
  )
}
