import { configureStore } from '@reduxjs/toolkit';
import { getPostofFollowing, userReducer } from './Reducers/User';

const store = configureStore({
    reducer : {
        user: userReducer,
        postofFollowing :getPostofFollowing
    }
})

export default store 