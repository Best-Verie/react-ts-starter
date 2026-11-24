import { z } from 'zod'

const envSchema = z.object({
  VITE_APP_NAME: z.string().min(1).default('Tickets'),
  VITE_API_BASE_URL: z.url(),
})

const parsed = envSchema.safeParse(import.meta.env)

if (!parsed.success) {
  console.error(z.prettifyError(parsed.error))
  throw new Error('Invalid environment variables. Check .env.example.')
}

export const env = {
  appName: parsed.data.VITE_APP_NAME,
  apiBaseUrl: parsed.data.VITE_API_BASE_URL,
} as const
