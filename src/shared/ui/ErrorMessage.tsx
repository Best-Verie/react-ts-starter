type ErrorMessageProps = {
     error: unknown
     onRetry?: () => void
}

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
     const message = error instanceof Error ? error.message : 'Something went wrong.'

     return (
          <div role="alert">
               <p>{message}</p>
               {onRetry && (
                    <button type="button" onClick={onRetry}>
                         Try again
                    </button>
               )}
          </div>
     )
}