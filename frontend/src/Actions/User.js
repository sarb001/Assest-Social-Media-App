import axios from "axios"

const BACK_URL = 'https://social-media-backend-33gv.onrender.com'


export const userRegister = (name,email,password,avatar) => async(dispatch) => {
    try {
        dispatch({type:"RegisterRequest"});
        
        const {data} = await axios.post(`${BACK_URL}/api/v1/register` , 
        { name,email,password , avatar },
        {
            headers : {
                'Content-Type' :'application/json',
            }
        })

        dispatch({type:"RegisterSuccess" ,payload : data.user});

    } catch (error) {
        dispatch({type:"RegisterFailure"})
    }
}


export const  loginUser = (email,password) => async(dispatch) => {
    try {
         dispatch({type:"LoginRequest"});
         console.log('data started  -');
        const { data } = await  axios.post(`${BACK_URL}/api/v1/login`, 
        {email,password},{
                 withCredentials : true,
                headers : { 
                    "Content-Type" : 'application/json' ,
                }
        });
        
        console.log('data inlogin -',{data});
        dispatch({type:"LoginSuccess",payload: data.user})

    } catch (error) {
        console.log('error in login -',error);
        dispatch({type:"LoginFailure",payload: error})
    }
}


export const loaduser = () => async(dispatch) => {
    try {
         dispatch({type:"LoadUserRequest"});

         const { data } = await  axios.get(`${BACK_URL}/api/v1/myprofile` , {
                withCredentials : true,
         });

         dispatch({type:"LoadUserSuccess", payload : data.user})
    } catch (error) {
        dispatch({type:"LoadUserFailure" , payload : error})
    }
}
// get Posts of User that Follow logged User 

export const GetFollowingPostRequest = () => async(dispatch) => {
    try {
        dispatch({type:"GetFollowingPostRequest"});
        
        const { data } = await axios.get(`${BACK_URL}/api/v1/followpost`,
        {
            withCredentials : true,
        }
        );
        dispatch({type:"GetFollowingPostSuccess",payload : data.posts});
        console.log(' following data -',{data});

    } catch (error) {
        console.log(' following posts -',error);
         dispatch({type:"GetFollowingPostFailure",payload: error})
    }
}


export const GetAllUsers = (name = "") => async(dispatch) => {
    try {
        dispatch({type:"GetgetAllUsersRequest"})

        const {data} = await axios.get(`${BACK_URL}/api/v1/users?name=${name}`, 
        {
            withCredentials : true,
        });

        dispatch({type:"GetgetAllUsersSuccess",payload : data.users});
    } catch (error) {
        dispatch({type:"GetgetAllUsersFailure"})
    }
}

export const GetlikePost = (id) => async(dispatch) => {
    try {
        dispatch({type:"LikeRequest"});
        
        const {data} = await axios.get(`${BACK_URL}/api/v1/post/${id}` , {
                withCredentials : true
        })

        dispatch({type:"LikeSuccess",payload : data.message })
    } catch (error) {
        dispatch({type:"LikeFailure"})
    }
}

export const GetMyPost = () => async(dispatch) => {
    try {
        dispatch({type: "GetPostRequest"});

        const { data } = await axios.get(`${BACK_URL}/api/v1/my/posts` , {
            withCredentials : true,
        })

        dispatch({type: "GetPostSuccess",payload : data.posts})
    } catch (error) {
        dispatch({type: "GetPostFailure"})
    }
}


export const GetComments = (id,comment) => async(dispatch) => {
    try {
        dispatch({type:"CommentRequest"}) 
        const  { data } = await axios.put(`${BACK_URL}/api/v1/posts/comment/${id}` , 
        {
            withCredentials : true,
        },
        {
            comment
        },{
            headers : {
                "Content-Type" : 'application/json',
            }
        })
        dispatch({type:"CommentSuccess",payload: data.message}); 
    } catch (error) {
        dispatch({type:"CommentFailure"}) 
    }
}

export const GetDeleteComment = (id,commentId) => async(dispatch) => {
    try {
        dispatch({type:"DeleteCommentRequest"})

        const { data } = await axios.delete(`${BACK_URL}/api/v1/posts/comment/${id}` ,{
            withCredentials : true,
        },
        {
            data : { commentId },
        });
        
        dispatch({type:"DeleteCommentSuccess",payload:data.message});
    } catch (error) {
        dispatch({type:"DeleteCommentFailure"}) 
    }
}


export const LogoutUser = () => async(dispatch) => {
    try {
        dispatch({type:"LogOutRequest"});
        
        await axios.get(`${BACK_URL}/api/v1/logout`);

        dispatch({type:"LogOutSuccess"})
    } catch (error) {
        dispatch({type:"LogOutFailure"})
    }
}


export const CreateNewPost = (caption,image) => async(dispatch) => {
    try {
          dispatch({type:"NewPostRequest"});
            const { data } = await axios.post(`${BACK_URL}/api/v1/post/upload`, 
            {
                caption , 
                image
            },
            {
                withCredentials : true,
                headers : {
                    "Content-Type" : "application/json",
                }
            })

          dispatch({type:"NewPostSuccess",payload : data.message });
          
        } catch (error) {   
            dispatch({type:"NewPostFailure"});
    }
}

export const UpdateCaption = (caption,id) => async(dispatch) => {
    try {
            dispatch({type:"UpdateCaptionRequest"});

            const { data } = await axios.put(`${BACK_URL}/api/v1/post/${id}` , {
                withCredentials : true,
            },{
                caption
            },{
                headers: {
                    'Content-Type' : 'application/json'
                }
            })

            dispatch({type:"UpdateCaptionSuccess",payload : data.message  });

        }catch (error) {
        dispatch({type:"UpdateCaptionFailure"});
    }
}

export const DeletePost = (id) => async(dispatch) => {
    try {
        dispatch({type:"DeletePostRequest"});
        
        const { data } = await axios.delete(`${BACK_URL}/api/v1/post/${id}` , {
            withCredentials : true,
        })

        dispatch({type:"DeletePostSuccess" , payload : data.message });
    } catch (error) {
        
        dispatch({type:"DeletePostFailure"})
    }
}


export const GetUpdatedProfile = (name,email,avatar) =>  async(dispatch) => {
    try {
        dispatch({type:"updateProfileRequest"});

        const { data } = await axios.put(`${BACK_URL}/api/v1/update/profile` , 
        {
            withCredentials : true,
        },
        { name,email,avatar },
        {
                headers : {
                    'Content-Type' : 'application/json'
                } 
        });  

        dispatch({type:"updateProfileSuccess" ,payload : data.message });
    } catch (error) {
        dispatch({type:"updateProfileFailure"});
    }
}


export const DeleteProfile = () => async(dispatch) => {
    try {
        dispatch({type:"DeleteProfileRequest"});

        const {data} = await axios.delete(`${BACK_URL}/api/v1/delete/me` , {
            withCredentials : true,
        });

        dispatch({type:"DeleteProfileSuccess",payload: data.message });

    } catch (error) {
        dispatch({type:"DeleteProfileRequest"});
    }
}


export const GetUserProfile = (id) => async(dispatch) => {
    try {
         dispatch({type:"GetUserProfileRequest"});
         const {data} = await axios.get(`${BACK_URL}/api/v1/user/${id}` , {
            withCredentials : true,
        })
         dispatch({type:"GetUserProfileSuccess" , payload : data.user});
        } catch (error) {
        dispatch({type:"GetUserProfileFailure"});
    }
}

export const GetUserPost = (id) =>  async(dispatch) => {
    try {
        dispatch({type:"GetUserPostRequest"});
        const {data} = await axios.get(`${BACK_URL}/api/v1/userposts/${id}`, {
                withCredentials : true,
        })

        dispatch({type:"GetUserPostSuccess" , payload : data.posts});
       } catch (error) {

       dispatch({type:"GetUserPostFailure"});
   }
}

export const FollowandUnfollowUser = (id) =>  async(dispatch) => {
    try {
        dispatch({type:"FollowandUnfollowRequest"});
        const {data} = await axios.get(`${BACK_URL}/api/v1/follow/${id}` ,{
            withCredentials : true,
        })

        dispatch({type:"FollowandUnfollowSuccess" , payload : data.message});
       } catch (error) {

       dispatch({type:"FollowandUnfollowFailure"});
   }
}