import { Link, useSearchParams } from 'react-router'
import { StatusBadge } from '@/features/tickets/components/StatusBadge'
import { STATUS_LABELS } from '@/features/tickets/status'
import { isTicketStatus, TICKET_STATUSES } from '@/features/tickets/types'

import { useQuery } from '@tanstack/react-query'
import type { TicketFilters } from '@/features/tickets/api/fake-tickets-api'
import { ticketsQueryOptions } from '@/features/tickets/api/queries'
import { ErrorMessage } from '@/shared/ui/ErrorMessage'

export function TicketListPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q') ?? ''
  const statusParam = searchParams.get('status')
  const status = isTicketStatus(statusParam) ? statusParam : undefined

  const filters: TicketFilters = { q: query.trim() || undefined, status }
  const ticketsQuery = useQuery(ticketsQueryOptions(filters))

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
      <p>
        <Link to="/tickets/new">New ticket</Link>
      </p>
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

      {ticketsQuery.isPending ? (
        <p>Loading tickets…</p>
      ) : ticketsQuery.isError ? (
        <ErrorMessage error={ticketsQuery.error} onRetry={() => void ticketsQuery.refetch()} />
      ) : ticketsQuery.data.length === 0 ? (
        <p>No tickets match these filters.</p>
      ) : (
        <ul
          aria-busy={ticketsQuery.isFetching}
          style={{ opacity: ticketsQuery.isPlaceholderData ? 0.6 : 1 }}
        >
          {ticketsQuery.data.map((ticket) => (
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
