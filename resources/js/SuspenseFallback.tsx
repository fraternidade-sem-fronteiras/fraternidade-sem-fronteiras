import { Spinner } from '@chakra-ui/react'
import React from 'react'

export default function SuspenseFallback() {
  return (
    <div data-theme={localStorage.getItem('theme') ?? 'light'}>
      <Spinner />
    </div>
  )
}
