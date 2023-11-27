import React, { useEffect, useState } from 'react'
import Post from '../Post/Post'
import { useSelector } from 'react-redux';
import { Avatar, Button, Dialog, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import User from '../User/User';
import '../Account/Account.css';
import { useDispatch } from 'react-redux';
import { GetMyPost } from '../../Actions/User';

const UserProfile = () => {
    
     const { posts } = useSelector((state) => state.myposts);
     const { user }  = useSelector((state) => state.user);

     const params   = useParams();
     const dispatch = useDispatch();
     const [FollowerToggle,setFollowerToggle]   = useState(false);
     const [FollowingToggle,setFollowingToggle] = useState(false);
     const [following,setfollowing] = useState(false);
     const [myProfile,setmyProfile] = useState(false);

     const logoutHandler = () => {};
     const deleteProfileHandler = () => {}

     const FollowHandler = () => {
        setfollowing(!following);
     }

     useEffect(() => {
        dispatch(GetMyPost());
        if(user?._id === params.id){        // if id from url === logged User means myProfile is showing 
            setmyProfile(true);
        }
     },[dispatch,user._id,params.id])

  return (
    <div className="account-container">
         
         <div className="accountleft">
            {posts  && posts?.length  > 0  ? (
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

        <div className="accountright">
            <Avatar src = {user.avatar.url} />
            <Typography variant='h5'> {user.name} </Typography>
            
            <div>
                <button onClick={() => setFollowerToggle(!FollowerToggle)}> 
                    <Typography> Followers </Typography>
                </button>
                    <Typography> {user.followers.length} </Typography>
            </div>

            <div>
                <button onClick={() => setFollowingToggle(!FollowingToggle)}> 
                    <Typography> Following </Typography>
                </button>
                    <Typography> {user.following.length} </Typography>
            </div>

            <div>
                <Typography> Posts </Typography>
                <Typography> {user.posts.length} </Typography>
            </div>

                {myProfile ? null : (
                    <Button 
                    variant ="contained"
                    style={{ background: following ? "red" : "" }}
                    onClick={FollowHandler}> 
                        {following ? "UnFollow"  : "Follow" } 
                    </Button>  
                )}


                        {/* Followers Toggle  */}
                <Dialog
                    open={FollowerToggle}
                    onClose={() => setFollowerToggle(!FollowerToggle)}
                    >
                    <div className="DialogBox">
                        <Typography variant="h4">Followers</Typography>

                        {user && user.followers.length > 0 ? (
                        user.followers.map((follower) => (
                            <User
                            key={follower._id}
                            userId={follower._id}
                            name={follower.name}
                            avatar={follower.avatar.url}
                            />
                        ))
                ) : (
                <Typography style={{ margin: "2vmax" }}>
                    You have no followers
                </Typography>
                )}
            </div>
                </Dialog>

                    {/*  Following Toggle Here */}
                <Dialog
                open={FollowingToggle}
                onClose={() => setFollowingToggle(!FollowingToggle)}
                >
                <div className="DialogBox">
                    <Typography variant="h4">Following</Typography>

                    {user && user.following.length > 0 ? (
                    user.following.map((follow) => (
                        <User
                        key={follow._id}
                        userId={follow._id}
                        name={follow.name}
                        avatar={follow?.avatar?.url}
                        />
                    ))
                    ) : (
                    <Typography style={{ margin: "2vmax" }}>
                        You're not following anyone
                    </Typography>
                    )}
                </div>
                </Dialog>

        </div>
    </div>
  )
}

export default UserProfile