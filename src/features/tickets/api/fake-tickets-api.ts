import { MOCK_TICKETS } from '@/features/tickets/mock-data'
import type { Ticket, TicketStatus } from '@/features/tickets/types'
import { sleep } from '@/shared/lib/sleep'

const LATENCY_MS = 600
const FAILURE_RATE = 0.2

export type TicketFilters = {
  q?: string
  status?: TicketStatus
}

function maybeFail() {
  if (Math.random() < FAILURE_RATE) {
    throw new Error('Simulated network error. Try again.')
  }
}

export async function fetchTickets(
  filters: TicketFilters,
  signal?: AbortSignal,
): Promise<Ticket[]> {
  await sleep(LATENCY_MS, signal)
  maybeFail()

  const q = filters.q?.toLowerCase() ?? ''
  return MOCK_TICKETS.filter(
    (ticket) =>
      ticket.title.toLowerCase().includes(q) &&
      (filters.status === undefined || ticket.status === filters.status),
  )
}

export async function fetchTicket(id: string, signal?: AbortSignal): Promise<Ticket | null> {
  await sleep(LATENCY_MS, signal)
  maybeFail()

  return MOCK_TICKETS.find((ticket) => ticket.id === id) ?? null
}
