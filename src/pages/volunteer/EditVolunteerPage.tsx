import { useEffect, useState } from 'react'
import Volunteer from '../../entities/volunteer.entity.js'
import { useLocation, useParams } from 'react-router-dom'
import getAxiosInstance from '../../utils/axios.instance.js'
import { useUser } from '../../hooks/user.hook.js'

export default function EditVolunteerPage() {
  const { id } = useParams()
  const { state } = useLocation()
  const [currentVolunteer, setCurrentVolunteer] = useState<Volunteer>(state)

  const { volunteer } = useUser()

  useEffect(() => {
    getAxiosInstance()
      .get(`/volunteers/${id}`)
      .then(({ data }) => setCurrentVolunteer(data))
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return <p>{JSON.stringify(currentVolunteer)}</p>
}
