import { BrowserRouter, Route, Routes } from 'react-router-dom'

import NotFound from './utils/pages/NotFound'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Dashboard from './features/chat/pages/Dashboard'

import './App.css'
import Account from './features/profile/pages/Account'


function App() {
  return (
    <div className='w-dvw h-dvh relative bg-white text-black dark:bg-neutral-200'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
