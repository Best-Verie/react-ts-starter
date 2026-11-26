import { keepPreviousData, queryOptions } from '@tanstack/react-query'
import {
  fetchTicket,
  fetchTickets,
  type TicketFilters,
} from '@/features/tickets/api/fake-tickets-api'

export const ticketKeys = {
  all: ['tickets'] as const,
  lists: () => [...ticketKeys.all, 'list'] as const,
  list: (filters: TicketFilters) => [...ticketKeys.lists(), filters] as const,
  details: () => [...ticketKeys.all, 'detail'] as const,
  detail: (id: string) => [...ticketKeys.details(), id] as const,
}

export function ticketsQueryOptions(filters: TicketFilters) {
  return queryOptions({
    queryKey: ticketKeys.list(filters),
    queryFn: ({ signal }) => fetchTickets(filters, signal),
    placeholderData: keepPreviousData,
  })
}

export function ticketQueryOptions(id: string) {
  return queryOptions({
    queryKey: ticketKeys.detail(id),
    queryFn: ({ signal }) => fetchTicket(id, signal),
  })
}
