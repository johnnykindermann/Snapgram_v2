import { Route, Routes } from 'react-router-dom'
import './globals.css'
import { CreatePost, Explore, Home, People, Saved } from './_root/pages'
import SignupForm from './_auth/forms/SignupForm'
import SigninForm from './_auth/forms/SigninForm'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import { Toaster } from './components/ui/toaster'

const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<SigninForm />} />
          <Route path='/sign-up' element={<SignupForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route path='/' element={<Home />}/>
          <Route path='/explore' element={<Explore />}/>
          <Route path='/create-post' element={<CreatePost />}/>
          <Route path='/all-users' element={<People />}/>
          <Route path='/saved' element={<Saved />}/>
        </Route>
      </Routes>

      <Toaster />
    </main>
  )
}

export default App
