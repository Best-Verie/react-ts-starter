import { NavLink, Outlet } from 'react-router'
import { env } from '@/config/env'

export function RootLayout() {
  return (
    <>
      <header>
        <strong>{env.appName}</strong>
        <nav>
          <NavLink to="/tickets">Tickets</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
