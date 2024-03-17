import { useParams } from 'react-router-dom'

export default function EditRolePage() {
  const { roleName } = useParams()
  return <div>{roleName}</div>
}
