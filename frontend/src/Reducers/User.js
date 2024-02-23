import { createReducer } from '@reduxjs/toolkit' ;

const initialState = {
    isAuthenticated: false,
}

// user, post , message 

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
        state.isAuthenticated = false;
    },
    RegisterFailure: (state,action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
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
        state.isAuthenticated = false;
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

    DeletePostRequest: (state) => {
        state.loading = true;
    },
    DeletePostSuccess: (state,action) => {
        state.loading = false;
        state.message  = action.payload;
    },
    DeletePostFailure: (state,action) => {
        state.loading = false;
        state.error   = action.payload; 
    },

    updateProfileRequest: (state) => {
        state.loading = true;
    },
    updateProfileSuccess : (state,action) => {
        state.loading = false;
        state.message  = action.payload;
        state.isAuthenticated = false;
    },
    updateProfileFailure : (state,action) => {
        state.loading = false;
        state.error   = action.payload; 
        state.isAuthenticated = true;
    },

    DeleteProfileRequest : (state) => {
        state.loading = true;
    },

    DeleteProfileSuccess : (state,action) => {
        state.loading  = false;
        state.message  = action.payload;
    },
    DeleteProfileFailure : (state,action) => {
        state.loading = false;
        state.error   = action.payload; 
    },
    clearErrors : (state) => {
        state.error = null;
    }
}) 

// Get User Profile 

export const getUserProfile = createReducer(initialState ,{
    // user Profile
    GetUserProfileRequest : (state) =>  {
        state.loading = true;
    },
    GetUserProfileSuccess : (state,action) =>  {
        state.loading = false;
        state.user = action.payload;
    },
    GetUserProfileFailure : (state,action) =>  {
        state.loading = false;
        state.error = action.payload;
    },
})

// Get User Posts 

export const getUserPosts = createReducer(initialState , {
 //  User Posts 
    GetUserPostRequest : (state) =>  {
        state.loading = true;
    },
    GetUserPostSuccess : (state,action) =>  {
        state.loading = false;
        state.posts = action.payload;
    },
    GetUserPostFailure : (state,action) =>  {
        state.loading = false;
        state.error = action.payload;
    }
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
    },
    GetPostFailure: (state,action) => {
        state.loading = false;
        state.error = action.payload; 
    }
})

export const FollowandUnfollow = createReducer(initialState, {
     FollowandUnfollowRequest: (state) => {
        state.loading = true;
    },
    FollowandUnfollowSuccess: (state,action) => {
        state.loading  = false;
        state.message  = action.payload;
    },
    FollowandUnfollowFailure: (state,action) => {
        state.loading = false;
        state.error = action.payload; 
    }
 })

