import { Avatar, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './Post.css';

const Post = ({postImage,ownerName,caption,ownerId,isAccount,isDelete}) => {

    const [liked,setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
    }

  return (
    <div className="post-container">
            {isAccount ? <MoreVertIcon /> : ""}
            <div className="post-header">
                <img src = {postImage}  alt = "Post"  
                style = {{width:'30%',height:'100%'}} />
                <div className="postdetails">
                    <Avatar  src= {ownerName} alt= "user" />    
                    <Link to = {`/user/${ownerId}`}>
                      {ownerName}
                     </Link>
                <Typography>  {caption} </Typography>
                </div>
                <button   style = {{border:'none'}}> 
                <Typography> 5 Likes </Typography> </button>
                    
                    <div className="postFooter">
                        <Button onClick={handleLike}>
                            {liked ? <FavoriteIcon /> :<FavoriteBorderIcon /> }
                        </Button>
                        <Button>
                            <ChatBubbleOutlineIcon />
                        </Button>
                        {isDelete ?  
                        <Button>
                            <DeleteOutlineIcon />
                        </Button>
                            : ""}
                    </div>

            </div>
    </div>
  )
}

export default Post