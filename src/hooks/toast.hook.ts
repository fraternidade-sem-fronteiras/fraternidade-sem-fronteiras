import { ToastId, useToast as useToastChakra } from '@chakra-ui/react'

export default function useToast() {
  const toast = useToastChakra()

  const handleErrorToast = (
    title: string,
    description: string,
    duration: number = 5000,
    isClosable: boolean = true
  ): ToastId => {
    return toast({
      title,
      description,
      position: 'top-right',
      status: 'error',
      duration,
      isClosable,
    })
  }

  const handleToast = (
    title: string,
    description: string,
    duration: number = 5000,
    isClosable: boolean = true
  ): ToastId => {
    return toast({
      title,
      description,
      position: 'top-right',
      status: 'success',
      duration,
      isClosable,
    })
  }

  return {
    handleToast,
    handleErrorToast,
  }
}
