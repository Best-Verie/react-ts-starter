import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTicket } from '@/features/tickets/api/fake-tickets-api'
import { ticketKeys } from '@/features/tickets/api/queries'
import type { CreateTicketInput } from '@/features/tickets/schemas'

export function useCreateTicket() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateTicketInput) => createTicket(input),
    onSuccess: (ticket) => {
      queryClient.setQueryData(ticketKeys.detail(ticket.id), ticket)
      return queryClient.invalidateQueries({ queryKey: ticketKeys.lists() })
    },
  })
}
