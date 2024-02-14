import { useDisclosure } from '@chakra-ui/react'
import Volunteer from '../../../entities/volunteer.entity.js'
import DeleteVolunteerModal from './DeleteVolunteerModal.jsx'

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
    <tr key={volunteer.id}>
      <td>{volunteer.id}</td>
      <td className="info">{volunteer.name}</td>
      <td>{volunteer.email}</td>
      <td className="niveis">
        <Badge levelId={volunteer.levelId} />
      </td>
      <th>
        <button className="btn btn-outline btn-info">Editar</button>
      </th>
      <th>
        <button className="btn" onClick={onOpen}>
          Excluir
        </button>
        <DeleteVolunteerModal volunteer={volunteer} isOpen={isOpen} onClose={onClose} />
      </th>
    </tr>
  )
}
