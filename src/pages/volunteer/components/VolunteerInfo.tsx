import { Button, Skeleton, Td, Tr, useDisclosure } from '@chakra-ui/react'
import Volunteer from '../../../entities/volunteer.entity.js'
import DeleteVolunteerModal from './DeleteVolunteerModal.jsx'
import { Link } from 'react-router-dom'

interface VolunteerInfoProps {
  volunteer: Volunteer
}

const Badge = ({ levelId }: { levelId: number }): React.ReactNode => {
  const levels: { [key: number]: React.ReactNode } = {
    1: <div className="badge badge-outline">Administrador</div>,
    2: <div className="badge badge-primary badge-outline">Psicólogo</div>,
    3: <div className="badge badge-secondary badge-outline">Voluntário</div>,
    4: <div className="badge badge-accent badge-outline">Médico</div>,
  }

  return levels[levelId]
}

export function VolunteerInfo({ volunteer }: Readonly<VolunteerInfoProps>) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Td width={'100%'}>{volunteer.name}</Td>
      <Td width={'100%'}>{volunteer.email}</Td>
      <Td width={'100%'}>
        <Badge levelId={volunteer.levelId} />
      </Td>
      <Td width={'100%'}>
        <Link to={`/dashboard/voluntario/${volunteer.id}/editar-perfil`} state={volunteer}>
          <Button colorScheme="blue" width={'75%'}>
            Editar
          </Button>
        </Link>
      </Td>
      <Td width={'100%'}>
        <Button colorScheme="red" width={'75%'} onClick={onOpen}>
          Excluir
        </Button>
        <DeleteVolunteerModal volunteer={volunteer} isOpen={isOpen} onClose={onClose} />
      </Td>
    </>
  )
}

export function VolunteerInfoSkeleton() {
  return (
    <>
      <Td>
        <Skeleton height="20px" width="150px" />
      </Td>
      <Td>
        <Skeleton height="20px" width="170px" />
      </Td>
      <Td>
        <Skeleton height="20px" width="150px" />
      </Td>
      <Td>
        <Skeleton height="20px" width="75%" />
      </Td>
      <Td>
        <Skeleton height="20px" width="75%" />
      </Td>
    </>
  )
}
