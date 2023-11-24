import { Avatar, Button, Dialog, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './Post.css';
import { useDispatch, useSelector } from 'react-redux';
import { GetFollowingPostRequest, GetlikePost } from '../../Actions/User';
import User from '../User/User';

const Post = ({postImage,
    postId,
    caption,
    ownerName,
    likes = [],
    comments = [],
    ownerImage,
    ownerId,
    isAccount = false,
    isDelete = false
}) => {
    const dispatch = useDispatch();
    const [liked,setLiked] = useState(false);
    const [likeuser,setlikeuser] = useState(false);

    const {  user } = useSelector((state) => state.user)

    const handleLike = async() => {
        setLiked(!liked);
        await dispatch(GetlikePost(postId));
        dispatch(GetFollowingPostRequest());
    }

    // For checking logged liked user === logged user
    // So 
    useEffect(() => {
        likes.forEach((item) => {
            if(item._id === user?._id){
                setLiked(true);
            }
        })
    },[likes,user._id])


  return (
    <div className="post-container">
            {isAccount ? <MoreVertIcon /> : ""}
            <div className="post-header">
                <span style = {{width:'50%',height:'100%'}}>
                    <img src = {postImage}  alt = "Post"  
                    style = {{width:'30%',height:'100%',objectFit:'cover'}} />
                </span>
                <div className="postdetails">
                    <Avatar  src= {ownerName} alt= "user" />    
                    <Link to = {`/user/${ownerId}`}> {ownerName} </Link>
                    <Typography>  {caption} </Typography>
                </div>
                <button  style = {{border:'none'}}
                 onClick = {() => setlikeuser(!likeuser)}
                 disabled={likes.length === 0 ? true : false}
                 > 
                <Typography > {likes.length} Likes </Typography> </button>
                    
                    <div className="postFooter">
                        <Button onClick={handleLike}>
                            {liked ? <FavoriteIcon style = {{color:'red'}} /> :<FavoriteBorderIcon /> }
                        </Button>
                        <Button>
                            <ChatBubbleOutlineIcon />
                        </Button>
                        {isDelete ? <Button> <DeleteOutlineIcon />  </Button> : ""}
                    </div>

                <Dialog open = {likeuser} onClose={() => setlikeuser(!likeuser)}>  
                    <div className='DialogBox'>
                            <Typography variant='h4'> Liked By </Typography>
                            {likes.map((like) => (
                                <User 
                                key    = {like._id}
                                userId = {like._id}
                                name = {like.name}
                                avatar={like.avatar.url}
                                />
                            ))}
                    </div>
                </Dialog>               

            </div>
    </div>
  )
}

export default Post