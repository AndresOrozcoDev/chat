import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

// --------------------------------------------------
// Control de ruta para cada test
// --------------------------------------------------
let testRoute = '/'

// --------------------------------------------------
// Mocks de páginas
// --------------------------------------------------
vi.mock('./features/auth/pages/Login', () => ({
  default: () => <div>Login Page</div>,
}))

vi.mock('./features/auth/pages/Register', () => ({
  default: () => <div>Register Page</div>,
}))

vi.mock('./features/chat/pages/Dashboard', () => ({
  default: () => <div>Dashboard Page</div>,
}))

vi.mock('./features/profile/pages/Account', () => ({
  default: () => <div>Account Page</div>,
}))

vi.mock('./shared/pages/NotFound', () => ({
  default: () => <div>Not Found Page</div>,
}))

// --------------------------------------------------
// Mock de react-router-dom
// --------------------------------------------------
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom')

  return {
    ...actual,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => (
      <actual.MemoryRouter initialEntries={[testRoute]}>
        {children}
      </actual.MemoryRouter>
    ),
  }
})

// ⬇️ IMPORTAR APP DESPUÉS DE LOS MOCKS
import App from './App'

// --------------------------------------------------
// Tests
// --------------------------------------------------
describe('App.tsx routing', () => {
  it('renders Login on "/"', () => {
    testRoute = '/'
    render(<App />)

    expect(screen.getByText('Login Page')).toBeInTheDocument()
  })

  it('renders Register on "/register"', () => {
    testRoute = '/register'
    render(<App />)

    expect(screen.getByText('Register Page')).toBeInTheDocument()
  })

  it('renders Dashboard on "/dashboard"', () => {
    testRoute = '/dashboard'
    render(<App />)

    expect(screen.getByText('Dashboard Page')).toBeInTheDocument()
  })

  it('renders Account on "/account"', () => {
    testRoute = '/account'
    render(<App />)

    expect(screen.getByText('Account Page')).toBeInTheDocument()
  })

  it('renders NotFound on unknown route', () => {
    testRoute = '/unknown'
    render(<App />)

    expect(screen.getByText('Not Found Page')).toBeInTheDocument()
  })
})
