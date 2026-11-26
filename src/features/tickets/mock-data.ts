import type { Ticket } from '@/features/tickets/types'

export const MOCK_TICKETS: Ticket[] = [
  {
    id: 'T-1001',
    title: 'Cannot log in to mobile app',
    description: 'Login fails with "invalid session" after entering the OTP.',
    status: 'open',
    priority: 'high',
    createdAt: '2026-11-20T08:15:00Z',
  },
  {
    id: 'T-1002',
    title: 'Loan statement missing March entry',
    description: 'The March repayment is not shown on the downloaded statement.',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2026-11-21T10:40:00Z',
  },
  {
    id: 'T-1003',
    title: 'Update phone number',
    description: 'Member requested a phone number change after losing their SIM.',
    status: 'resolved',
    priority: 'low',
    createdAt: '2026-11-22T14:05:00Z',
  },
]

export function findTicket(id: string): Ticket | undefined {
  return MOCK_TICKETS.find((ticket) => ticket.id === id)
}
