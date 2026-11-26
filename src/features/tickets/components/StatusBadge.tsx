import type { TicketStatus } from '@/features/tickets/types'
import { STATUS_LABELS } from '@/features/tickets/status'

type StatusBadgeProps = {
  status: TicketStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span data-status={status}>{STATUS_LABELS[status]}</span>
}
