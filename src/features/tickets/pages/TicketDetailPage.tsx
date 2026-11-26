import { Link, useParams } from 'react-router'
import { StatusBadge } from '@/features/tickets/components/StatusBadge'
import { findTicket } from '@/features/tickets/mock-data'

export function TicketDetailPage() {
  const { ticketId } = useParams()
  const ticket = ticketId ? findTicket(ticketId) : undefined

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