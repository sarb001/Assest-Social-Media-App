import { configureStore } from '@reduxjs/toolkit';
import { getAllUsers, getPostofFollowing, userReducer } from './Reducers/User';

const store = configureStore({
    reducer : {
        user: userReducer,
        postofFollowing :getPostofFollowing,
        allusers : getAllUsers
    }
})

export default store 