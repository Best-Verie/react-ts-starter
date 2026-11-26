import { Link } from 'react-router'
import { StatusBadge } from '@/features/tickets/components/StatusBadge'
import { MOCK_TICKETS } from '@/features/tickets/mock-data'

export function TicketListPage() {
  return (
    <section>
      <h1>Tickets</h1>
      <ul>
        {MOCK_TICKETS.map((ticket) => (
          <li key={ticket.id}>
            <Link to={`/tickets/${ticket.id}`}>{ticket.title}</Link>{' '}
            <StatusBadge status={ticket.status} />
          </li>
        ))}
      </ul>
    </section>
  )
}
