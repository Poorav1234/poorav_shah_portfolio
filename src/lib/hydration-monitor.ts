/**
 * Hydration Monitor Utility
 * Helps debug and monitor hydration issues during development
 */

export class HydrationMonitor {
  private static instance: HydrationMonitor
  private errors: string[] = []
  private startTime: number = 0

  private constructor() {}

  static getInstance(): HydrationMonitor {
    if (!HydrationMonitor.instance) {
      HydrationMonitor.instance = new HydrationMonitor()
    }
    return HydrationMonitor.instance
  }

  startMonitoring() {
    if (process.env.NODE_ENV !== 'development') return
    
    this.startTime = Date.now()
    console.log('%c[Hydration Monitor] Started monitoring...', 'color: #8B5CF6; font-weight: bold')
    
    // Capture console errors
    const originalConsoleError = console.error
    console.error = (...args) => {
      const message = args[0]
      if (typeof message === 'string' && message.includes('Hydration')) {
        this.errors.push(message)
        console.warn('%c[Hydration Error Detected]', 'color: #EF4444; font-weight: bold', message)
      }
      originalConsoleError(...args)
    }
  }

  stopMonitoring() {
    if (process.env.NODE_ENV !== 'development') return
    
    const duration = Date.now() - this.startTime
    console.log(
      `%c[Hydration Monitor] Stopped. Duration: ${duration}ms. Errors: ${this.errors.length}`,
      'color: #8B5CF6; font-weight: bold'
    )
    
    if (this.errors.length > 0) {
      console.table(this.errors.map((error, index) => ({
        '#': index + 1,
        'Error': error.substring(0, 100) + '...'
      })))
    }
  }

  getErrors(): string[] {
    return [...this.errors]
  }

  hasErrors(): boolean {
    return this.errors.length > 0
  }

  clearErrors() {
    this.errors = []
  }
}

// Auto-start in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Delay to ensure all components are loaded
  setTimeout(() => {
    HydrationMonitor.getInstance().startMonitoring()
  }, 1000)
  
  // Stop monitoring after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      HydrationMonitor.getInstance().stopMonitoring()
    }, 2000)
  })
}

export default HydrationMonitor