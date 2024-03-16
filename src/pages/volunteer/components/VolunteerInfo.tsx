import { Button, Td, useDisclosure } from '@chakra-ui/react'
import Volunteer from '@/entities/volunteer.entity'
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
      <Td>{volunteer.name}</Td>
      <Td>{volunteer.email}</Td>
      <Td>
        <Badge levelId={volunteer.levelId} />
      </Td>
      <Td>
        <Link to={`/dashboard/voluntario/${volunteer.id}/editar-perfil`} state={volunteer}>
          <Button colorScheme="blue">Editar</Button>
        </Link>
      </Td>
      <Td>
        <Button colorScheme="red" onClick={onOpen}>
          Excluir
        </Button>
        <DeleteVolunteerModal volunteer={volunteer} isOpen={isOpen} onClose={onClose} />
      </Td>
    </>
  )
}
