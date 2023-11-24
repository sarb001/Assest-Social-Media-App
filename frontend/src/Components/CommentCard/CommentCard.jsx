import { Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
;
// userId    - loggeduser id
// commentId -  commentId  

const CommentCard = ({userId,commentId,name,avatar,comment,postId,isAccount}) => {
    
    const { user } = useSelector((state) => state.user);

  return (  
    <div className='commentUser'>  

     
      <Link to = {`/user/${userId}`}>
         <img src = {avatar} alt = {name} />
          <Typography style = {{minWidth:'6vmax'}}>
            {name} 
        </Typography>
      </Link>

        <Typography> {comment} </Typography>

        {/* If userId(logged User) ===  user in state    ( means logged user is deleting then show icon else null )   */}
        {isAccount ? (
            <Button> <DeleteIcon /> </Button>
        ) : userId === user._id ? (
            <Button> <DeleteIcon /> </Button>
        ) : null
        }
    </div>
  )
}

export default CommentCard