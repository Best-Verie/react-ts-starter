import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router'
import { ticketQueryOptions } from '@/features/tickets/api/queries'
import { StatusBadge } from '@/features/tickets/components/StatusBadge'
import { ErrorMessage } from '@/shared/ui/ErrorMessage'

export function TicketDetailPage() {
  const { ticketId = '' } = useParams()
  const ticketQuery = useQuery(ticketQueryOptions(ticketId))

  if (ticketQuery.isPending) {
    return <p>Loading ticket…</p>
  }

  if (ticketQuery.isError) {
    return <ErrorMessage error={ticketQuery.error} onRetry={() => void ticketQuery.refetch()} />
  }

  const ticket = ticketQuery.data

  if (!ticket) {
    return (
      <section>
        <h1>Ticket not found</h1>
        <p>No ticket with id "{ticketId}".</p>
        <Link to="/tickets">Back to tickets</Link>
      </section>
    )
  }

  return (
    <article>
      <Link to="/tickets">← Back to tickets</Link>
      <h1>{ticket.title}</h1>
      <p>
        <StatusBadge status={ticket.status} /> · Priority: {ticket.priority}
      </p>
      <p>{ticket.description}</p>
      <p>
        <small>Created {new Date(ticket.createdAt).toLocaleString()}</small>
      </p>
    </article>
  )
}
