import type { TicketStatus } from '@/features/tickets/types'

const STATUS_LABELS: Record<TicketStatus, string> = {
  open: 'Open',
  in_progress: 'In progress',
  resolved: 'Resolved',
}

type StatusBadgeProps = {
  status: TicketStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span data-status={status}>{STATUS_LABELS[status]}</span>
}