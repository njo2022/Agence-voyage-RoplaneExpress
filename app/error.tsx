'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log l'erreur à un service de reporting si nécessaire
    console.error('Erreur capturée:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <h2 className="text-4xl font-bold text-foreground mb-4">
          Quelque chose s'est mal passé
        </h2>
        <p className="text-muted-foreground mb-8">
          Nous nous excusons pour ce désagrément. Veuillez réessayer.
        </p>
        <Button
          onClick={() => reset()}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Réessayer
        </Button>
      </div>
    </div>
  )
}
