import { Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { GetDeleteComment, GetFollowingPostRequest } from '../../Actions/User';
import RemoveIcon from '@mui/icons-material/Remove';

// userId    - loggeduser id
// commentId -  commentId  

const CommentCard = ({userId,commentId,name,avatar,comment,postId,isAccount}) => {
    
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const DeleteHandler   = async() => {
        await dispatch(GetDeleteComment(postId,commentId));
         dispatch(GetFollowingPostRequest());         // for getting updated Data 
    }

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
        {/* {isAccount ? (
            <Button onClick = {DeleteHandler}>
                 <DeleteIcon /> 
            </Button>
        ) : userId === user._id ? (
            <Button onClick = {DeleteHandler}> <DeleteIcon /> </Button>
        ) : null
        } */}

        {userId === user._id ? (
               <Button onClick = {DeleteHandler}> <DeleteIcon />  </Button>
            ) : (
                <Button> <RemoveIcon /> </Button>
        )}


    </div>
  )
}

export default CommentCard