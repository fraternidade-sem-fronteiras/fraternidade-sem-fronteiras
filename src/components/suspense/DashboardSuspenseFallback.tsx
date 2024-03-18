import { Spinner } from '@chakra-ui/react'

export default function DashboardSuspenseFallback() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-xl text-gray-500">Carregando, aguarde alguns instantes</p>
      <Spinner size="xl" />
    </div>
  )
}
