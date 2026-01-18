'use client'

import { useEffect, useState } from 'react'

/**
 * ClientOnly Component
 * Renders children only on client-side to prevent SSR hydration mismatches
 * Useful for components affected by browser extensions
 */
export default function ClientOnly({
  children,
  fallback = null
}: {
  children: React.ReactNode
  fallback?: React.ReactNode
}) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return fallback
  }

  return <>{children}</>
}