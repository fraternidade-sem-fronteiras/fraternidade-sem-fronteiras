import React from 'react'

export default function SuspenseFallback() {
  return (
    <div data-light={localStorage.getItem('theme') ?? 'light'} className="flex flex-col items-center justify-center h-screen">
      <p className="text-xl text-gray-500">Sua página será carregada em breve...</p>
    </div>
  )
}
