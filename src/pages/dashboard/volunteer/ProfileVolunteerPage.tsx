import { useParams } from 'react-router-dom'

export default function ProfileVolunteerPage() {
  const { id } = useParams()
  return <p>{id}</p>
}
