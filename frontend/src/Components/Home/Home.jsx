import React from 'react'
import User from '../User/User'
import './Home.css' ;

const Home = () => {
  return (
    <div className="home">
      <div className='homeleft'> Hello  </div>
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