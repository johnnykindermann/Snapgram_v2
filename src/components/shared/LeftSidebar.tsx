import { sidebarLinks } from '@/constants'
import { useUserContext } from '@/context/AuthContext'
import { INavLink } from '@/types'
import React, { useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { signOutAccount } from '@/lib/appwrite/api'
import { useSignOutAccount } from '@/lib/react-query/queryAndMutations'

const LeftSidebar = () => {
  const {user} = useUserContext()

  const {mutateAsync:signOutAccount, isSuccess} = useSignOutAccount()
  const {pathname} = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if(isSuccess) navigate(0)
      
  }, [isSuccess])


  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>
        <Link to='/' className='flex gap-3
        items-center'>
          <img src="/assets/images/logo.svg" 
              alt="logo" 
              width={170}
              height={36}
          />
        </Link>

        <Link to={`/profile/${user.id}`}>
          <img src={user.imageUrl || '/assets/icons/profile-placeholder.svg'} 
          alt="profile"
          className='h-14 w-14 rounded-full' />
        </Link>
        <div className='flex flex-col'>
          <p className='body-bold'>
            {user.name}
          </p>
          <p className='small-regular 
          text-light-3'>
            @{user.username}
          </p>
        </div>
        <ul className='flex flex-col gap-6'>
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route
            
            return (
              <li key={link.label}
              className={`leftsidebar-link ${isActive && 'bg-primary-500'}`}
              >
                <NavLink
                  to={link.route}
                  className='flex gap-4items-center p-4'
                >
                  <img 
                  src={link.imgURL} 
                  alt={link.label} 
                  className={`group-hover: invert-white ${isActive && 'invert-white'}`}
                  />
                  {link.label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
      <Button variant='ghost'
      className='shad-button_ghost'
      onClick={() => signOutAccount()}>
        <img src="/assets/icons/logout.svg" alt="svg" />
        <p>Logout</p>
      </Button>
    </nav>
  )
}

export default LeftSidebar
