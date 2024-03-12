import { Button, Td, Tr, useDisclosure } from '@chakra-ui/react'
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

export default function VolunteerInfo({ volunteer }: Readonly<VolunteerInfoProps>) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Tr key={volunteer.id}>
      <Td className="info">{volunteer.name}</Td>
      <Td>{volunteer.email}</Td>
      <Td className="niveis">
        <Badge levelId={volunteer.levelId} />
      </Td>
      <Td>
        <Link to={`/dashboard/voluntario/${volunteer.id}/editar-perfil`} state={volunteer}>
          <Button colorScheme="blue" width={'75%'}>
            Editar
          </Button>
        </Link>
      </Td>
      <Td>
        <Button colorScheme="red" width={'75%'} onClick={onOpen}>
          Excluir
        </Button>
        <DeleteVolunteerModal volunteer={volunteer} isOpen={isOpen} onClose={onClose} />
      </Td>
    </Tr>
  )
}
