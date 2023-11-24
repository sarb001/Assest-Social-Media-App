import React, { useEffect } from 'react'
import User from '../User/User'
import './Home.css' ;
import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux' ;
import { GetFollowingPostRequest } from '../../Actions/User';
import Loader from '../Loader/Loader';

const Home = () => {
    const dispatch = useDispatch();

    const { loading ,error ,posts  } = useSelector((state) =>  state.postofFollowing);

    console.log('fullstaterr -',loading ,error ,posts );

   useEffect(() => {
        dispatch(GetFollowingPostRequest());
   },[])

  return (
      <div className="home">
        <div className='homeleft'> 
          {posts && posts?.length > 0 ? ( posts.map((post) =>  (
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
          ) : " No Posts Yet "}
        </div>

        <div className='homeright'> 
            <User 
              userId = {"user._id"}
              name   = {"SarbSingh11"}
              avatar = {"https://images.unsplash.com/photo-1694439977533-e047e5c56c67?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTd8fHxlbnwwfHx8fHw%3D"} 
            />
        </div>

      </div>
    )
}

export default Home