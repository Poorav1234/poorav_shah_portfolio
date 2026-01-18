'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * SafeInput Component
 * Prevents hydration mismatches by delaying attribute processing
 * until after React hydration is complete
 */
export function SafeInput({
  defaultValue = '',
  value,
  onChange,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isHydrated, setIsHydrated] = useState(false)
  
  // Use controlled or uncontrolled based on props
  const isControlled = value !== undefined
  const [localValue, setLocalValue] = useState(
    isControlled ? value : defaultValue
  )

  useEffect(() => {
    // Mark as hydrated after first render
    setIsHydrated(true)
    
    // Sync with any extension modifications after a safe delay
    const timer = setTimeout(() => {
      if (inputRef.current) {
        // For controlled components, respect the prop value
        // For uncontrolled, sync with DOM if needed
        if (!isControlled && inputRef.current.value !== localValue) {
          setLocalValue(inputRef.current.value)
        }
      }
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  // Update local value when controlled prop changes
  useEffect(() => {
    if (isControlled && value !== localValue) {
      setLocalValue(value || '')
    }
  }, [value, isControlled])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setLocalValue(newValue)
    onChange?.(e)
  }

  // Only apply value prop after hydration to prevent mismatches
  const inputProps = {
    ...props,
    id: props.id, // Explicitly preserve id for label association
    ref: inputRef,
    onChange: handleChange,
    // Remove conflicting props
    ...(isHydrated 
      ? { value: localValue }
      : isControlled 
        ? { defaultValue: value }
        : { defaultValue }
    )
  }

  // Remove the conflicting value/defaultValue from spread props
  delete (inputProps as any).value
  delete (inputProps as any).defaultValue

  return <input {...inputProps} />
}

/**
 * SafeButton Component
 * Prevents hydration mismatches in button elements
 */
export function SafeButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Remove problematic attributes during SSR
  const buttonProps = { ...props }
  
  if (!isHydrated) {
    // Remove attributes that extensions commonly add
    delete (buttonProps as any)['fdprocessedid']
    delete (buttonProps as any)['data-form-type']
  }

  return (
    <button {...buttonProps}>
      {children}
    </button>
  )
}