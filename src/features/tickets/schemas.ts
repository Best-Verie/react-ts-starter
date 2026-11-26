import { z } from 'zod'
import { TICKET_PRIORITIES } from '@/features/tickets/types'

export const createTicketSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, 'Title must be at least 5 characters.')
    .max(120, 'Title must be at most 120 characters.'),
  description: z
    .string()
    .trim()
    .min(10, 'Describe the problem in at least 10 characters.')
    .max(2000, 'Description must be at most 2000 characters.'),
  priority: z.enum(TICKET_PRIORITIES),
})

export type CreateTicketInput = z.infer<typeof createTicketSchema>

export function isCreateTicketField(field: string): field is keyof CreateTicketInput {
  return Object.hasOwn(createTicketSchema.shape, field)
}
