import { createReducer } from '@reduxjs/toolkit' ;

const initialState = {
    isAuthenticated: false,
}

export const userReducer = createReducer(initialState, {
    
    LoginRequest: (state) => {
        state.loading = true;
    },
    LoginSuccess: (state,action) => {
        state.loading = false;
        state.user  = action.payload;
        state.isAuthenticated = true;
    },
    LoginFailure: (state,action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },

    RegisterRequest: (state) => {
        state.loading = true;
    },
    RegisterSuccess: (state,action) => {
        state.loading = false;
        state.user  = action.payload;
    },
    RegisterFailure: (state,action) => {
        state.loading = false;
        state.error = action.payload;
    },

    LoadUserRequest: (state) => {
        state.loading = true;
    },
    LoadUserSuccess: (state,action) => {
        state.loading = false;
        state.user  = action.payload;
        state.isAuthenticated = true;
    },
    LoadUserFailure: (state,action) => {
        state.loading = false;
        state.error = action.payload; 
        state.isAuthenticated = false;
    },
    
    LogOutRequest: (state) => {
        state.loading = true;
    },
    LogOutSuccess: (state,action) => {
        state.loading = false;
        state.user  = null;
        state.isAuthenticated = false;
    },
    LogOutFailure: (state,action) => {
        state.loading = false;
        state.error = action.payload; 
        state.isAuthenticated = true;
    },

    NewPostRequest: (state) => {
        state.loading = true;
    },
    NewPostSuccess: (state,action) => {
        state.loading = false;
        state.message  = action.payload;
        state.isAuthenticated = false;
    },
    NewPostFailure: (state,action) => {
        state.loading = false;
        state.error   = action.payload; 
        state.isAuthenticated = true;
    },

    UpdateCaptionRequest: (state) => {
        state.loading = true;
    },
    UpdateCaptionSuccess: (state,action) => {
        state.loading = false;
        state.message  = action.payload;
        state.isAuthenticated = false;
    },
    UpdateCaptionFailure: (state,action) => {
        state.loading = false;
        state.error   = action.payload; 
        state.isAuthenticated = true;
    },
}) 


export const getPostofFollowing = createReducer(initialState , {
    GetFollowingPostRequest: (state) => {
        state.loading = true;
    },
    GetFollowingPostSuccess: (state,action) => {
        state.loading = false;
        state.posts  = action.payload;
        state.isAuthenticated = true;
    },
    GetFollowingPostFailure: (state,action) => {
        state.loading = false;
        state.error = action.payload; 
        state.isAuthenticated = false;
    }
})


export const getAllUsers = createReducer(initialState , {
    GetgetAllUsersRequest: (state) => {
        state.loading = true;
    },
    GetgetAllUsersSuccess: (state,action) => {
        state.loading = false;
        state.users  = action.payload;
        state.isAuthenticated = true;
    },
    GetgetAllUsersFailure: (state,action) => {
        state.loading = false;
        state.error = action.payload; 
        state.isAuthenticated = false;
    }
})

export const likePost = createReducer(initialState, {
    LikeRequest: (state) => {
        state.loading = true;
    },
    LikeSuccess: (state,action) => {
        state.loading  = false;
        state.message  = action.payload;
    },
    LikeFailure: (state,action) => {
        state.loading = false;
        state.error = action.payload; 
    }
})

export const CommentPost = createReducer(initialState , {
    CommentRequest: (state) => {
        state.loading = true;
    },
    CommentSuccess: (state,action) => {
        state.loading  = false;
        state.message  = action.payload;
    },
    CommentFailure: (state,action) => {
        state.loading = false;
        state.error = action.payload; 
    }
})

export const DeleteComment = createReducer(initialState, {
    DeleteCommentRequest: (state) => {
        state.loading = true;
    },
    DeleteCommentSuccess: (state,action) => {
        state.loading  = false;
        state.message  = action.payload;
    },
    DeleteCommentFailure: (state,action) => {
        state.loading = false;
        state.error = action.payload; 
    }
})

export const GetAllMyPost = createReducer(initialState , {
    GetPostRequest: (state) => {
        state.loading = true;
    },
    GetPostSuccess: (state,action) => {
        state.loading  = false;
        state.posts  = action.payload;
        state.isAuthenticated = true;
    },
    GetPostFailure: (state,action) => {
        state.loading = false;
        state.error = action.payload; 
        state.isAuthenticated = false;
    }
})

