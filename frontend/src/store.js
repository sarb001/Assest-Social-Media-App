import { configureStore } from '@reduxjs/toolkit';
import { GetAllMyPost, getAllUsers, getPostofFollowing, likePost, userReducer } from './Reducers/User';

const store = configureStore({
    reducer : {
        user: userReducer,
        postofFollowing :getPostofFollowing,
        allusers : getAllUsers,
        like : likePost,
        myposts : GetAllMyPost
    }
})

export default store 