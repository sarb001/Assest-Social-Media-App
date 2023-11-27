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
import { DeletePost, GetComments, GetFollowingPostRequest, GetMyPost, GetlikePost, UpdateCaption } from '../../Actions/User';
import User from '../User/User';
import CommentCard from '../CommentCard/CommentCard';

const Post = ({postImage,
    postId,
    caption,
    ownerName,
    likes = [],
    comments = [],
    ownerImage,
    ownerId,
    isAccount = true,
    isDelete = true
}) => {

    const dispatch = useDispatch();
    const [liked,setLiked] = useState(false);
    const [likeuser,setlikeuser] = useState(false);     // For Dialog Box 
    const [commentvalue,setcommentvalue] = useState('');     // for Form value
    const [commentToggle,setcommentToggle] = useState(false);     // for Form value
   
    const [captionvalue,setcaptionvalue] = useState(caption);     // for Form value
    const [captionToggle,setcaptionToggle] = useState(false);     // for Form value

    const {  user , message ,error } = useSelector((state) => state.user)

    const handleLike = async() => {
        setLiked(!liked);
        await dispatch(GetlikePost(postId));
        if(isAccount){
            dispatch(GetMyPost());
        }else{
            dispatch(GetFollowingPostRequest());
        }
    }

    const addCommentHandler = async(e) => {
        e.preventDefault();
        await dispatch(GetComments(postId,commentvalue));
        setcommentvalue('');
        dispatch(GetFollowingPostRequest());            // update all Data 
    }

    const updateCaptionHandler = async(e) => {
        e.preventDefault();
        dispatch(UpdateCaption(captionvalue,postId))
        dispatch(GetMyPost())
    }

    const DeleteHandler =  async() => {
        await dispatch(DeletePost(postId));
        console.log('moved now ');
         dispatch(GetMyPost());
    }


    // For checking logged liked user === logged user
    // So 
    useEffect(() => {
        likes.forEach((item) => {
            if(item._id === user?._id){
                setLiked(true);
            }
        })
    },[likes,user?._id])


  return (
    <div className="post-container">
            {isAccount ? <MoreVertIcon  onClick = {() => setcaptionToggle(!captionToggle)} /> : ""}

            {/* Update Caption */}

                 <Dialog open = {captionToggle} onClose = {() => setcaptionToggle(!captionToggle)}>  
                    <div className='DialogBox'>
                            <Typography variant='h4'> Captions </Typography>
                            <form className='commentForm' onSubmit={updateCaptionHandler}>
                                <input 
                                    type = "text"
                                    value = {captionvalue}
                                    onChange={(e) => setcaptionvalue(e.target.value)}
                                    placeholder='Caption Here....'
                                    required
                                />
                                <Button type = "submit" variant='contained'> Update </Button>
                            </form>

                    </div>
                 </Dialog> 

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
                    disabled={likes.length === 0 ? true : false}> 
                <Typography > {likes.length} Likes </Typography> </button>
                    
                    <div className="postFooter">
                        <Button onClick = {handleLike}>
                            {liked ? <FavoriteIcon style = {{color:'red'}} /> :<FavoriteBorderIcon /> }
                        </Button>
                        <Button onClick = {() => setcommentToggle(!commentToggle)}>
                            <ChatBubbleOutlineIcon />
                        </Button>
                        {isDelete ? <Button onClick={DeleteHandler}> <DeleteOutlineIcon />  </Button> : ""}
                    </div>


                {/*  Dialog Box for Like Post  */}
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

                {/*  Dialog Box for Comment Section */}
                <Dialog open = {commentToggle} onClose={() => setcommentToggle(!commentToggle)}>  
                    <div className='DialogBox'>
                            <Typography variant='h4'>  Comments </Typography>
                            <form className='commentForm' onSubmit={addCommentHandler}>
                                <input 
                                    type = "text"
                                    value = {commentvalue}
                                    onChange={(e) => setcommentvalue(e.target.value)}
                                    placeholder='Comment Here....'
                                    required
                                />
                                <Button type = "submit" variant='contained'> Add </Button>
                            </form>

                        {/*  All Comments  */}
                            {comments.length > 0 ? (
                                comments.map((item) => (
                                    <CommentCard 
                                    key = {item._id}
                                    userId = {item.user._id}        // logged user id 
                                    commentId = {item._id}  
                                    name = {item.user.name}
                                    avatar={item.user.avatar.url}
                                    comment={item.comment}
                                    isAccount = {isAccount}
                                    postId={postId}
                                    />
                            ))) : (
                                <Typography> No Comments Yet </Typography>
                            )}
                    </div>
                </Dialog> 

            </div>
    </div>
  )
}

export default Post