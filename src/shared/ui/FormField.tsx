import type { ReactNode } from 'react'

type FormFieldProps = {
  label: string
  htmlFor: string
  error?: string
  children: ReactNode
}

export function FormField({ label, htmlFor, error, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
