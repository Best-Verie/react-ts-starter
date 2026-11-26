import type { TicketPriority, TicketStatus } from '@/features/tickets/types'

// keep STATUS_LABELS as is, then add:
export const PRIORITY_LABELS: Record<TicketPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}
