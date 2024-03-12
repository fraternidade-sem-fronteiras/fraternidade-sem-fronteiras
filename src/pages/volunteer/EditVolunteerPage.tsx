import { useEffect, useState } from 'react'
import Volunteer from '../../entities/volunteer.entity.js'
import { useLocation, useParams } from 'react-router-dom'
import getAxiosInstance from '../../utils/axios.instance.js'

export default function EditVolunteerPage() {
  const { id } = useParams()
  const { state } = useLocation()
  const [volunteer, setVolunteer] = useState<Volunteer>(state)

  useEffect(() => {
    getAxiosInstance()
      .get(`/volunteers/${id}`)
      .then(({ data }) => setVolunteer(data))
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return <p>{JSON.stringify(volunteer)}</p>
}
