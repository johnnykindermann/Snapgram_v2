import PostForm from '@/components/shared/PostForm'
import React from 'react'

const CreatePost = () => {
  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div>
          <img src="/assets/icons/add-post.svg" alt="add" width={36} height={36} />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Create Post</h2>
        </div>

        <PostForm />
      </div>
    </div>
  )
}

export default CreatePost
