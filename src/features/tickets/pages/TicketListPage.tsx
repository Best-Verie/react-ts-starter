import { Link, useSearchParams } from 'react-router'
import { StatusBadge } from '@/features/tickets/components/StatusBadge'
import { MOCK_TICKETS } from '@/features/tickets/mock-data'
import { STATUS_LABELS } from '@/features/tickets/status'
import { isTicketStatus, TICKET_STATUSES } from '@/features/tickets/types'

export function TicketListPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q') ?? ''
  const statusParam = searchParams.get('status')
  const status = isTicketStatus(statusParam) ? statusParam : undefined

  const normalizedQuery = query.trim().toLowerCase()
  const tickets = MOCK_TICKETS.filter((ticket) => {
    const matchesQuery = ticket.title.toLowerCase().includes(normalizedQuery)
    const matchesStatus = status === undefined || ticket.status === status
    return matchesQuery && matchesStatus
  })

  function updateParam(key: 'q' | 'status', value: string) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value) {
          next.set(key, value)
        } else {
          next.delete(key)
        }
        return next
      },
      { replace: true },
    )
  }

  return (
    <section>
      <h1>Tickets</h1>

      <div>
        <label>
          Search{' '}
          <input
            type="search"
            value={query}
            onChange={(event) => updateParam('q', event.target.value)}
          />
        </label>{' '}
        <label>
          Status{' '}
          <select
            value={status ?? ''}
            onChange={(event) => updateParam('status', event.target.value)}
          >
            <option value="">All</option>
            {TICKET_STATUSES.map((value) => (
              <option key={value} value={value}>
                {STATUS_LABELS[value]}
              </option>
            ))}
          </select>
        </label>
      </div>

      {tickets.length === 0 ? (
        <p>No tickets match these filters.</p>
      ) : (
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket.id}>
              <Link to={`/tickets/${ticket.id}`}>{ticket.title}</Link>{' '}
              <StatusBadge status={ticket.status} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
