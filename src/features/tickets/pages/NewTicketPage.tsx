import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { useCreateTicket } from '@/features/tickets/api/mutations'
import { createTicketSchema, isCreateTicketField } from '@/features/tickets/schemas'
import { PRIORITY_LABELS } from '@/features/tickets/status'
import { TICKET_PRIORITIES } from '@/features/tickets/types'
import { isApiError } from '@/shared/lib/api-error'
import { FormField } from '@/shared/ui/FormField'

export function NewTicketPage() {
  const navigate = useNavigate()
  const createTicket = useCreateTicket()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createTicketSchema),
    defaultValues: { title: '', description: '', priority: 'medium' },
  })

  const onSubmit = handleSubmit(async (values) => {
    try {
      const ticket = await createTicket.mutateAsync(values)
      void navigate(`/tickets/${ticket.id}`)
    } catch (error) {
      if (isApiError(error) && Object.keys(error.fieldErrors).length > 0) {
        for (const [field, message] of Object.entries(error.fieldErrors)) {
          if (isCreateTicketField(field)) {
            setError(field, { type: 'server', message })
          }
        }
        return
      }
      setError('root.server', {
        type: 'server',
        message: error instanceof Error ? error.message : 'Could not create the ticket.',
      })
    }
  })

  return (
    <section>
      <h1>New ticket</h1>

      <form onSubmit={onSubmit} noValidate>
        <FormField label="Title" htmlFor="title" error={errors.title?.message}>
          <input
            id="title"
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'title-error' : undefined}
            {...register('title')}
          />
        </FormField>
        <FormField label="Description" htmlFor="description" error={errors.description?.message}>
          <textarea
            id="description"
            rows={5}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={errors.description ? 'description-error' : undefined}
            {...register('description')}
          />
        </FormField>
        <FormField label="Priority" htmlFor="priority" error={errors.priority?.message}>
          <select id="priority" {...register('priority')}>
            {TICKET_PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {PRIORITY_LABELS[priority]}
              </option>
            ))}
          </select>
        </FormField>
        {errors.root?.server && <p role="alert">{errors.root.server.message}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating…' : 'Create ticket'}
        </button>{' '}
        <Link to="/tickets">Cancel</Link>
      </form>
    </section>
  )
}
