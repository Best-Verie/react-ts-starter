import { createBrowserRouter, Navigate } from 'react-router'
import { RootLayout } from '@/app/layouts/RootLayout'
import { NotFoundPage } from '@/app/pages/NotFoundPage'
import { RouteErrorBoundary } from '@/app/RouteErrorBoundary'
import { TicketListPage } from '@/features/tickets/pages/TicketListPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteErrorBoundary />,
    hydrateFallbackElement: <p>Loading…</p>,
    children: [
      { index: true, element: <Navigate to="/tickets" replace /> },
      { path: 'tickets', element: <TicketListPage /> },
      {
        path: 'tickets/:ticketId',
        lazy: async () => {
          const { TicketDetailPage } = await import('@/features/tickets/pages/TicketDetailPage')
          return { Component: TicketDetailPage }
        },
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
