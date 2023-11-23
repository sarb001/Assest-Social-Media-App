import React from 'react'
import User from '../User/User'
import './Home.css' ;
import Post from '../Post/Post';

const Home = () => {
  return (
    <div className="home">
      <div className='homeleft'> 
       <Post 
         postImage = "https://images.unsplash.com/photo-1691413436815-be2465a5db0b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
         ownerName = {"mesarbsingh"}
         caption = " This is sample  Post "
         isAccount = {true}
       />
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