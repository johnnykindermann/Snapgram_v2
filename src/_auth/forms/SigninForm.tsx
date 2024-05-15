"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast" 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SigninValidation } from "@/validation/SigninFormValidation"
import Loader from "@/components/shared/Loader"
import { Link, useNavigate } from "react-router-dom"
import { createUserAccount, signInAccount } from "@/lib/appwrite/api"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queryAndMutations"
import { useUserContext } from "@/context/AuthContext"

const SigninForm = () => {
  const {mutateAsync: signInAccount, isPending: isSigningInAccount} = useSignInAccount()
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()
  const navigate = useNavigate()
  const {toast} = useToast()

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof SigninValidation>) {

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })

    if(!session) {
      return toast({title: 'Sign in failed, please try again.'})
    }

    const isLoggedIn = await checkAuthUser()
  
    if(isLoggedIn) {
      form.reset()
      navigate('/')
    } else {
      return toast({ title: 'Sign in failed. Please try again.' })
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
      
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Sign in</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">To use Snapgram please
        enter your dettails</p>
      

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Email" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit"
         className="shad-button_primary">
          {isSigningInAccount ? (
            <div className="flex-center gap-2">
              <Loader />  Loading ...
            </div>
          ) : 'Sign in'}
         </Button>

      </form>
      <p>Don't have an account yet?
          <Link to='/sign-up'
          className="text-primary-500 text-small-semibold ml-1"
          >
            Sign up
          </Link>
      </p>
      </div>
    </Form>
  )
}

export default SigninForm
