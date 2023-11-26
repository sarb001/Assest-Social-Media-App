import React, { useEffect } from 'react'
import User from '../User/User'
import './Home.css' ;
import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux' ;
import { GetAllUsers, GetFollowingPostRequest } from '../../Actions/User';


const Home = () => {
    const dispatch = useDispatch();

    const { loading ,error ,posts  } = useSelector((state) =>  state.postofFollowing);
    const { users } = useSelector((state) => state.allusers);

   useEffect(() => {
        dispatch(GetFollowingPostRequest());
        dispatch(GetAllUsers());
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
                isAccount = {false}
                isDelete = {false}
              />
              ))
          ) : " No Posts Yet "}
        </div>

        <div className='homeright'> 
        {users && users?.length > 0 ? (
          users.map((item) => 
          <User 
            key = {item._id}
            userId = {item._id}
            name   = {item.name}
            avatar = {item.avatar.url} 
          />
          )
        ) : "No Users Present"}
        </div>

      </div>
    )
}

export default Home