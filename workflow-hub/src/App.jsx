import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom' 
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Home from './Pages/Home'
import Corbeille from './Pages/Corbeille'
import Navbar from './Components/Navbar'

export default function App() {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
          <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/corbeille" element={<Corbeille/>} />
          </Routes>
          </BrowserRouter>
      </DndProvider>
    </div>
  )
}
