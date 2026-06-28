import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, } from 'react-router'
import './index.css'
import App from './App.jsx'
import Manutencao from './pages/Manutencao.jsx'
import Itens from './pages/Itens.jsx'
import Veiculos from './pages/Veiculos.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/itens" element={<Itens />} />
        <Route path="/veiculos" element={<Veiculos />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
