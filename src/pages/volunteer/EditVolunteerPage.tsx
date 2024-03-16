import Volunteer from '@/entities/volunteer.entity'
import axios from '@/utils/axios.instance'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useUser } from '@/hooks/user.hook'

export default function EditVolunteerPage() {
  const { id } = useParams()
  const { state } = useLocation()
  const [currentVolunteer, setCurrentVolunteer] = useState<Volunteer>(state)

  const { volunteer } = useUser()

  useEffect(() => {
    axios
      .get(`/volunteers/${id}`)
      .then(({ data }) => setCurrentVolunteer(data))
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return <p>{JSON.stringify(currentVolunteer)}</p>
}
