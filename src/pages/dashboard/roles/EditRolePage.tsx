import Role from '@/entities/role.entity'
import axios from '@/utils/axios.instance'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

export default function EditRolePage() {
  const { roleId } = useParams()
  const { state } = useLocation()

  const [role, setRole] = useState<Role>(state)

  useEffect(() => {
    axios
      .get(`/roles/${roleId}`)
      .then(({ data }) => setRole(data))
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return <div>{JSON.stringify(role, null, 2)}</div>
}
