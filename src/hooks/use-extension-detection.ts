'use client'

import { useEffect, useState } from 'react'

/**
 * useExtensionDetection Hook
 * Detects browser extensions that commonly cause hydration issues
 */
export function useExtensionDetection() {
  const [extensions, setExtensions] = useState<string[]>([])
  
  useEffect(() => {
    // Check for common extension indicators
    const detectedExtensions: string[] = []
    
    // Check for LastPass
    if ((window as any).lpcurruser || (window as any).lastpass) {
      detectedExtensions.push('LastPass')
    }
    
    // Check for 1Password
    if ((window as any)._1password) {
      detectedExtensions.push('1Password')
    }
    
    // Check for Dashlane
    if ((window as any).dashlane) {
      detectedExtensions.push('Dashlane')
    }
    
    // Check for general password managers
    if (document.querySelector('[data-form-type]')) {
      detectedExtensions.push('Password Manager')
    }
    
    setExtensions(detectedExtensions)
  }, [])
  
  return { extensions, hasProblematicExtensions: extensions.length > 0 }
}

/**
 * useDelayedHydration Hook
 * Delays hydration-sensitive operations until extensions settle
 */
export function useDelayedHydration(delayMs = 200) {
  const [isReady, setIsReady] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true)
    }, delayMs)
    
    return () => clearTimeout(timer)
  }, [delayMs])
  
  return isReady
}