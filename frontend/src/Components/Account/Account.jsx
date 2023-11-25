import React, { useEffect } from 'react'
import Post from '../Post/Post'
import { Typography } from '@mui/material'
import { GetMyPost } from '../../Actions/User'
import { useDispatch, useSelector } from 'react-redux'

const Account = () => {

    const dispatch = useDispatch();
    const { posts  , loading , error } = useSelector((state) => state.myposts)

     useEffect(() => {
        dispatch(GetMyPost());
     },[dispatch])

  return (
    <div className="account-container">
        <div className="accountleft">
            {posts  && posts.length  > 0  ? (
                posts.map((post) => (
                    <Post
                    key = {post._id}
                    postId = {post._id}
                    caption = {post.caption}
                    postImage = {post.image.url}
                    likes = {post.likes}
                    comments = {post.comments}
                    ownerName = {post.owner.name}
                    ownerImage = {post.owner.avatar.url}
                    ownerId= {post.owner._id}
                  />
                ))
            ) : (
                <Typography variant='h6'> You have not made any Posts </Typography>
            )}
        </div>
        <div className="accountright"></div>
    </div>
  )
}

export default Account