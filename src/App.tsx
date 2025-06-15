import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useTheme } from './context/ThemeContext'
import { Sun } from 'lucide-react';

import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Dashboard from './features/chat/pages/Dashboard'
import NotFound from './utils/pages/NotFound'

import './App.css'


function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className='w-screen h-dvh relative bg-white text-black dark:bg-neutral-200'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <div className='bg-neutral-300 rounded-full absolute p-3 right-3 bottom-3 dark:bg-white' title={theme === 'light' ? 'Modo oscuro' : 'Modo claro'}>
        <Sun 
          color="black" 
          size={24} 
          onClick={toggleTheme} 
          className='cursor-pointer' 
          aria-label={theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
        />
      </div>
    </div>
  )
}

export default App
