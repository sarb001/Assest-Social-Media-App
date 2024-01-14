import { configureStore } from '@reduxjs/toolkit';
import { FollowandUnfollow, GetAllMyPost, 
getAllUsers, getPostofFollowing, 
getUserPosts, getUserProfile, 
likePost, userReducer } from './Reducers/User';

const store = configureStore({
    reducer : {
        user: userReducer,
        postofFollowing :getPostofFollowing,
        allusers : getAllUsers,
        like : likePost,
        myposts : GetAllMyPost,
        userposts : getUserPosts,
        userprofile :getUserProfile,
        followandunfollow :FollowandUnfollow
    }
})

export default store 