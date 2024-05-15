"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "./FileUploader"
import { PostValidation } from "@/validation/PostValidation"
import { Models } from "appwrite"
import { useCreatePost } from "@/lib/react-query/queryAndMutations"
import { useUserContext } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import Loader from "./Loader"
import { toast } from "../ui/use-toast"

type PostFormProps = {
    post: Models.Document
}

const PostForm = () => {
    const {mutateAsync:createPost, isPending: isCreatingPost, isSuccess} = useCreatePost()

    const navigate = useNavigate()

    const {user} = useUserContext()

    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
          caption: "",
          file: [],
          location: '',
          tags: ''
        },
      })

      async function onSubmit(values: z.infer<typeof PostValidation>) {
        const newPost = await createPost({
          ...values,
          userId: user.id
        }
      )
        if(!newPost) 
          return toast({
          title: 'Post-create failed. Please try again/'
        })
          
        toast({
          title: 'Post-create success.'})
        
        navigate('/')
      }

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="caption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Caption</FormLabel>
                  <FormControl>
                    <Textarea className="shad-textarea custom-scrollbar" {...field} />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Add photos</FormLabel>
                  <FormControl>
                    <FileUploader
                        fieldChange={field.onChange}
                        mediaUrl=''
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Add Location</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Add Tags (seperated by comma ",")</FormLabel>
                  <FormControl>
                    <Input 
                        type="text"
                        className="shad-input"
                        placeholder='Art, Expression, Learn'
                        {...field}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
            <div className="flex gap-4 items-center justify-end">
            <Button type="button" className="shad-button_dark_4">Cancel</Button>
            <Button type="submit" className="shad-button_primary whitespace-nowrap">
              {isCreatingPost ? (
              <div className="flex-center gap-2">
                <Loader />  Creating Post ...
              </div>
              ) : 'Create Post'}
            </Button>
            </div>
          </form>
        </Form>
      )
}

export default PostForm
