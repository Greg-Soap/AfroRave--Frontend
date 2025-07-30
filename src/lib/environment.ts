export function runOnlyOnDev(fn: () => void) {
  if (process.env.NODE_ENV === 'development') {
    fn()
  }
}

export function runOnlyOnProd(fn: () => void) {
  if (process.env.NODE_ENV === 'production') {
    fn()
  }
}

export const isDev = process.env.NODE_ENV === 'development'
