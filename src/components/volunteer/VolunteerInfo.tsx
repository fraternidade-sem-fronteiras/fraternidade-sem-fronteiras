import Volunteer from '../../entities/volunteer.entity.ts'
import DeleteVolunteerModal from './DeleteVolunteerModal.tsx'

interface VolunteerInfoProps {
  handleShowModal: (volunteer: Volunteer) => void
  volunteer: Volunteer
}

export default function VolunteerInfo({
  handleShowModal,
  volunteer,
}: Readonly<VolunteerInfoProps>) {
  return (
    <tr key={volunteer.id}>
      <td>{volunteer.id}</td>
      <td className="info">{volunteer.name}</td>
      <td>{volunteer.email}</td>
      <td className="niveis">
        {volunteer.levelId}
        <div className="badge badge-outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-4 h-4 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
          Administrador
        </div>
        <div className="badge badge-primary badge-outline">Psicólogo</div>
        <div className="badge badge-secondary badge-outline">Voluntários</div>
        <div className="badge badge-accent badge-outline">Médico</div>
      </td>
      <th>
        <button className="btn btn-outline btn-info">Editar</button>
      </th>
      <th className="excluir">
        <button className="btn" onClick={() => handleShowModal(volunteer)}>
          excluir
        </button>
        <DeleteVolunteerModal key={volunteer.id} volunteer={volunteer} />
      </th>
    </tr>
  )
}
