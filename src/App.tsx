import './App.css'
import { useTheme } from './context/ThemeContext'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className='bg-white dark:bg-gray-800 p-5'>
      <p className='text-black dark:text-white'>Hello Chat!</p>
      <button 
        className='text-black dark:text-white' 
        onClick={toggleTheme}
      >
        Cambiar a modo {theme === 'dark' ? 'claro' : 'oscuro'}
      </button>
    </div>
  )
}

export default App
