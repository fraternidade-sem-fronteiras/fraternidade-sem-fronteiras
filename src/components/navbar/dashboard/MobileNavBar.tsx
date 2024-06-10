import { useLocation, useNavigate } from 'react-router-dom'
import { Avatar, Divider } from '@chakra-ui/react'
import HomeIcon from '../../../assets/svg/navbar/home.icon.jsx'
import VolunteerIcon from '../../../assets/svg/navbar/volunteer.icon.jsx'
import { useState } from 'react'
import { useUser } from '@/hooks/user.hook'
import LeaveIcon from '../../../assets/svg/leave.icon.jsx'
import DoubleArrowIcon from '../../../assets/svg/double-arrow.icon.jsx'

export default function MobileNavBar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { user, onOpenLogoutModal: openLogoutModal } = useUser()

  const [isSidebarEnabled, setIsSidebarEnabled] = useState(false)

  const avatarUrl = 'https://bit.ly/dan-abramov'

  const paths = [
    {
      name: 'Página Inicial',
      path: '/dashboard/navegar',
      icon: HomeIcon,
      children: [],
      isCurrentPath: false,
    },
    {
      name: 'Voluntário',
      icon: VolunteerIcon,
      children: [
        { name: 'Listar voluntários', path: '/dashboard/voluntario/' },
        { name: 'Cadastrar voluntário', path: '/dashboard/voluntario/cadastrar' },
      ],
      isCurrentPath: false,
    },
  ]

  const redirectTo = (path?: string) => {
    if (path && path !== pathname) navigate(path)
  }

  const handleSidebar = () => {
    setIsSidebarEnabled((prevState) => !prevState)
  }

  return (
    <div className="fixed left-0 w-full z-50">
      <div className="flex h-[100px] bg-dark-blue">
        <button className="ml-4 my-5 bg-light-blue-opacity w-[10%] rounded" onClick={handleSidebar}>
          <div className="ml-1.5">
            <DoubleArrowIcon rotate={isSidebarEnabled ? 50 : 5} />
          </div>
        </button>
      </div>
      {isSidebarEnabled && (
        <aside
          className="sticky top-0 w-[360px] float-left bg-light-blue flex flex-col justify-between"
          style={{
            height: 'calc(100vh - 100px)',
          }}
        >
          <nav>
            {paths.map((path) => (
              <div
                key={path.name}
                className="flex items-center pl-4 h-16 text-white hover:bg-dark-blue"
                onClick={() => redirectTo(path.path)}
              >
                <div className="mr-4">
                  <path.icon />
                </div>
                {path.name}
                {path.children.length > 0 &&
                  path.children.map((child) => (
                    <div
                      key={child.name}
                      className="flex items-center pl-4 h-16 text-white hover:bg-dark-blue"
                      onClick={() => redirectTo(child.path)}
                    >
                      {child.name}
                    </div>
                  ))}
              </div>
            ))}
          </nav>
          <footer className="text-white py-4 mb-4">
            <Divider
              className="my-10 mx-auto"
              borderWidth={'medium'}
              borderRadius={'50px'}
              borderColor="pink"
              width={'332px'}
            />
            <div className="flex items-center mb-2 ml-8">
              <div className="flex-shrink-0 mr-4">
                <Avatar
                  name="avatar"
                  src={avatarUrl}
                  onClick={() => redirectTo('/dashboard/voluntario/meu-perfil')}
                />
              </div>
              <div>
                <p className="text-lg text-white">{user?.name}</p>
                <p className="text-sm text-gray-400">{user?.email}</p>
              </div>
              <div className="ml-auto mr-4">
                <LeaveIcon onClick={openLogoutModal} />
              </div>
            </div>
          </footer>
        </aside>
      )}
    </div>
  )
}
