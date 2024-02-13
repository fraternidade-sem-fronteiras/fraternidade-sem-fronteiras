import { Spinner } from '@chakra-ui/react'
import React from 'react'

export default function SuspenseFallback() {
  function getTheme() {
    const localTheme = localStorage.getItem('theme')
    console.log('localTheme', localTheme)
    return localTheme ? (localTheme as 'light' | 'dark') : 'light'
  }

  return (
    <div data-theme={getTheme()}>
      <Spinner />
    </div>
  )
}
