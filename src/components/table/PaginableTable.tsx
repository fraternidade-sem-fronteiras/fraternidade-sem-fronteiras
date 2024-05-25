import React, { useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Select,
  Skeleton,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react'

interface PaginableTableProps<T> {
  items: (T & { id: number })[]

  headers: { name: string; width?: string | number }[]
  content: (item: T) => React.ReactNode[]

  isLoading?: boolean
  skeleton?: React.ReactNode

  onFirstPage?: (currentPage: number, lastPage: number, currentMaxPage: number) => void
  onNextPage?: (currentPage: number, lastPage: number, currentMaxPage: number) => void

  onPreviousPage?: (currentPage: number, lastPage: number, currentMaxPage: number) => void
  onLastPage?: (currentPage: number, lastPage: number, currentMaxPage: number) => void
}

export default function PaginableTable<T>({
  items,
  headers,
  content,
  isLoading,

  onFirstPage,
  onNextPage,
  onPreviousPage,
  onLastPage,
}: Readonly<PaginableTableProps<T>>) {
  const [currentItemsPerPage, setCurrentItemsPerPage] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const currentMaxPage = Math.max(Math.round(items.length / currentItemsPerPage), currentPage)

  const handleNextPage = () => {
    setCurrentPage((prevState) => Math.min(prevState + 1, 10))

    if (onNextPage) {
      onNextPage(currentPage + 1, currentPage, currentMaxPage)
    }
  }

  const handlePreviousPage = () => {
    setCurrentPage((prevState) => Math.max(prevState - 1, 1))

    if (onPreviousPage) {
      onPreviousPage(currentPage - 1, currentPage, currentMaxPage)
    }
  }

  const handleFirstPage = () => {
    setCurrentPage(1)

    if (onFirstPage) {
      onFirstPage(1, currentPage, currentMaxPage)
    }
  }

  const handleLastPage = () => {
    setCurrentPage(currentMaxPage)

    if (onLastPage) {
      onLastPage(currentMaxPage, currentPage, currentMaxPage)
    }
  }

  const handleChangePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const currentItemsPerPage = Number(event.target.value)

    setCurrentItemsPerPage(currentItemsPerPage)
    setCurrentPage(
      Math.max(1, Math.min(currentPage, Math.round(items.length / currentItemsPerPage)))
    )
  }

  return (
    <TableContainer>
      <Box as={Table} variant="simple">
        <TableCaption>
          <Flex alignItems="center" justifyContent={'flex-end'} gap={2}>
            <Tooltip label="Primeira Página">
              <Button
                colorScheme="white"
                color="black"
                isDisabled={currentPage == 1}
                onClick={handleFirstPage}
              >
                {'«'}
              </Button>
            </Tooltip>

            <Tooltip label="Página anterior">
              <Button
                colorScheme="white"
                color="black"
                isDisabled={currentPage == 1}
                onClick={handlePreviousPage}
              >
                {'<'}
              </Button>
            </Tooltip>

            {currentPage + ' de ' + currentMaxPage}

            <Select width={'12%'} value={currentItemsPerPage} onChange={handleChangePageSize}>
              {[10, 20, 30, 40, 50].map((size) => (
                <option value={size} key={size}>
                  Mostrar {size}
                </option>
              ))}
            </Select>

            <Tooltip label="Próxima página">
              <Button
                colorScheme="white"
                color="black"
                isDisabled={currentPage >= currentMaxPage}
                onClick={handleNextPage}
              >
                {'>'}
              </Button>
            </Tooltip>

            <Tooltip label="Última página">
              <Button
                colorScheme="white"
                color="black"
                isDisabled={currentPage >= currentMaxPage}
                onClick={handleLastPage}
              >
                {'»'}
              </Button>
            </Tooltip>
          </Flex>
        </TableCaption>
        <Thead>
          <Tr>
            {headers.map((header) => (
              <Th key={header.name} width={header?.width ?? '100px'}>
                {header.name}
              </Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {isLoading
            ? Array(7)
                .fill(1)
                .map((_, idx) => (
                  <Tr key={idx}>
                    {headers.map((header) => (
                      <Th key={header.name} maxWidth={header?.width ?? '100px'}>
                        <Skeleton height={'20px'} />
                      </Th>
                    ))}
                  </Tr>
                ))
            : items
                .slice((currentPage - 1) * currentItemsPerPage, currentPage * currentItemsPerPage)
                .map((item) => (
                  <Tr key={item.id}>
                    {content(item).map((content, idx) => (
                      <Td key={idx} maxWidth={headers[0]?.width ?? '100px'}>
                        {content}
                      </Td>
                    ))}
                  </Tr>
                ))}
        </Tbody>
      </Box>
    </TableContainer>
  )
}
