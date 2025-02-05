import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queryAndMutations'

const Topbar = () => {
  const {mutateAsync: signOut, isSuccess } = useSignOutAccount()
  const navigate = useNavigate()

  useEffect(() => {
    if(isSuccess) navigate('/sign-in')

  }, [isSuccess])

  return (
    <section className='topbar'>
      <div>
        <Link to='/' className='flex gap-3 items-center'>
          <img 
            src="/assets/images/logo.svg" 
            alt="logo" 
            width={130}
            height={325}
          />
        </Link>
        
        <div className='flex gap-4'>
          <Button variant='ghost' className='shad-button_ghost' onClick={
          () => signOut()
          }>
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Topbar
