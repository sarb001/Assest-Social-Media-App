import { configureStore } from '@reduxjs/toolkit';
import { getAllUsers, getPostofFollowing, likePost, userReducer } from './Reducers/User';

const store = configureStore({
    reducer : {
        user: userReducer,
        postofFollowing :getPostofFollowing,
        allusers : getAllUsers,
        like : likePost
    }
})

export default store 