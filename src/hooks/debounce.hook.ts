import { useState } from 'react'

/**
 *
 * The principle of the debounce hook is to delay the execution of a function until a certain time has passed without the function being called again.
 *
 * @param callback The function to be called after the delay
 * @param delay The time to wait before calling the function in milliseconds
 * @returns a function that will be called after the delay
 */

export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout | null>(null)

  function debounceFunction(...args: Parameters<T>): Promise<ReturnType<T>> {
    if (currentTimeout) clearTimeout(currentTimeout)

    return new Promise((resolve) => {
      setCurrentTimeout(setTimeout(() => resolve(callback(...args)), delay))
    })
  }

  return debounceFunction
}
