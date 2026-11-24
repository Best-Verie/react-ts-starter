import { env } from '@/config/env'

export function App() {
  return (
    <main>
      <h1>{env.appName}</h1>
      <p>API: {env.apiBaseUrl}</p>
    </main>
  )
}
