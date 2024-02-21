import axios from "axios"
import { toast } from 'react-toastify';


export const userRegister = (name,email,password,avatar) => async(dispatch) => {
    try {
        dispatch({type:"RegisterRequest"});
        const {data} = await axios.post(`/api/v1/register` , 
        { name,email,password , avatar },
        {
            headers : {
                'Content-Type' :'application/json',
            }
        })
            toast.success(' Registered Successfully ');
            dispatch({type:"RegisterSuccess" ,payload : data.user});

        } catch (error) {
            
            toast.error(' Something Went Wrong ');
            dispatch({type:"RegisterFailure" , payload : error.response.data.message})
        }
    }


export const  loginUser = (email,password) => async(dispatch) => {
    try {
         dispatch({type:"LoginRequest"});
         console.log('data started  -');
        const { data } = await  axios.post(`/api/v1/login`, 
        {email,password},
        {
                headers : {
                    "Content-Type" : 'application/json' ,
                },
                withCredentials : true
        });
        console.log('data login -',{data});
        toast.success(' Logged In Successfully ');
        dispatch({type:"LoginSuccess",payload: data.user})

    } catch (error) {
        console.log('error login -',error);
        dispatch({type:"LoginFailure",payload: error.response.data.message})
    }
}


export const GetlikePost = (id) => async(dispatch) => {
    try {
        dispatch({type:"LikeRequest"});
        
        const {data} = await axios.get(`/api/v1/post/${id}` )

        toast.success(data.message);
        dispatch({type:"LikeSuccess",payload : data.message })

    } catch (error) {
        dispatch({type:"LikeFailure" ,payload: error.response.data.message})
    }
}

export const loaduser = () => async(dispatch) => {
    try {
         dispatch({type:"LoadUserRequest"});

         const options = {
            headers : {
                'Content-Type' : 'application/json',
            },
            withCredentials : true
        }

         const { data } = await  axios.get(`/api/v1/myprofile` , options);

         dispatch({type:"LoadUserSuccess", payload : data.user});

    } catch (error) {
        console.log('error in loading -',error);
        dispatch({type:"LoadUserFailure",payload: error.response.data.message})
    }
}
// get Posts of User that Follow logged User 

export const GetFollowingPostRequest = () => async(dispatch) => {

    try {
        dispatch({type:"GetFollowingPostRequest"});
        
        const options = {
            headers : {
                'Content-Type' : 'application/json',
            },
            withCredentials : true
        }

        const {data} = await axios.get(`/api/v1/followpost` ,options);
        console.log(' following data -',{data});
        dispatch({type:"GetFollowingPostSuccess",payload : data.posts});


    } catch (error) {
         dispatch({type:"GetFollowingPostFailure",payload: error.response.data.message})
    }
}


export const GetAllUsers = (name = "") => async(dispatch) => {
    try {
        dispatch({type:"GetgetAllUsersRequest"})
        const options = {
            headers : {
                'Content-Type' : 'application/json',
            },
            withCredentials : true
        }

        const {data} = await axios.get(`/api/v1/users?name=${name}`,options);

        dispatch({type:"GetgetAllUsersSuccess",payload : data.users});
    } catch (error) {
        dispatch({type:"GetgetAllUsersFailure" ,payload: error.response.data.message})
    }
}



export const GetMyPost = () => async(dispatch) => {
    try {
        dispatch({type: "GetPostRequest"});

        const { data } = await axios.get(`/api/v1/my/posts` )

        dispatch({type: "GetPostSuccess",payload : data.posts})
    } catch (error) {
        dispatch({type: "GetPostFailure" ,payload: error.response.data.message})
    }
}


export const GetComments = (id,comment) => async(dispatch) => {
    try {
        dispatch({type:"CommentRequest"}) 
        const  { data } = await axios.put(`/api/v1/posts/comment/${id}`, 
        {
            comment
        },{
            headers : {
                "Content-Type" : 'application/json',
            }
        })
        dispatch({type:"CommentSuccess",payload: data.message}); 
    } catch (error) {
        dispatch({type:"CommentFailure",payload: error.response.data.message}) 
    }
}

export const GetDeleteComment = (id,commentId) => async(dispatch) => {
    try {
        dispatch({type:"DeleteCommentRequest"})

        const { data } = await axios.delete(`/api/v1/posts/comment/${id}` ,
        {
            data : { commentId },
        });
        
        toast.success(' Comment Deleted ');
        dispatch({type:"DeleteCommentSuccess",payload:data.message});
    } catch (error) {
        dispatch({type:"DeleteCommentFailure",payload: error.response.data.message}) 
    }
}


export const LogoutUser = () => async(dispatch) => {
    try {
        dispatch({type:"LogOutRequest"});
        await axios.get(`/api/v1/logout`);

        toast.success(' LogOut Successfully ');
        dispatch({type:"LogOutSuccess"})
    } catch (error) {

        dispatch({type:"LogOutFailure",payload: error.response.data.message})

    }
}


export const CreateNewPost = (caption,image) => async(dispatch) => {
    try {
          dispatch({type:"NewPostRequest"});
          console.log('captionfront -',caption);
          console.log(' image front -',image);
            const { data } = await axios.post(`/api/v1/post/upload`, 
            {
                caption , 
                image
            },
            {
                headers : {
                    "Content-Type" : "application/json",
                }
            })

          dispatch({type:"NewPostSuccess",payload : data.message });
          
        } catch (error) {   
            dispatch({type:"NewPostFailure" ,payload: error.response.data.message });
    }
}

export const UpdateCaption = (caption,id) => async(dispatch) => {
    try {
            dispatch({type:"UpdateCaptionRequest"});

            const { data } = await axios.put(`/api/v1/post/${id}` ,{
                caption
            },{
                headers: {
                    'Content-Type' : 'application/json'
                }
            })

            dispatch({type:"UpdateCaptionSuccess",payload : data.message  });

        }catch (error) {
        dispatch({type:"UpdateCaptionFailure",payload: error.response.data.message});
    }
}

export const DeletePost = (id) => async(dispatch) => {
    try {
        dispatch({type:"DeletePostRequest"});
        
        const { data } = await axios.delete(`/api/v1/post/${id}` )

        dispatch({type:"DeletePostSuccess" , payload : data.message });
    } catch (error) {
        
        dispatch({type:"DeletePostFailure" ,payload: error.response.data.message})
    }
}


export const GetUpdatedProfile = (name,email,avatar) =>  async(dispatch) => {
    try {
        dispatch({type:"updateProfileRequest"});

        const { data } = await axios.put(`/api/v1/update/profile` ,
        { name,email,avatar },
        {
                headers : {
                    'Content-Type' : 'application/json'
                } 
        });  

        dispatch({type:"updateProfileSuccess" ,payload : data.message });
    } catch (error) {
        dispatch({type:"updateProfileFailure",payload: error.response.data.message});
    }
}


export const DeleteProfile = () => async(dispatch) => {
    try {
        dispatch({type:"DeleteProfileRequest"});

        const {data} = await axios.delete(`/api/v1/delete/me` );

        dispatch({type:"DeleteProfileSuccess",payload: data.message });

    } catch (error) {
        dispatch({type:"DeleteProfileRequest" ,payload: error.response.data.message});
    }
}


export const GetUserProfile = (id) => async(dispatch) => {
    try {
         dispatch({type:"GetUserProfileRequest"});
         const {data} = await axios.get(`/api/v1/user/${id}` , )

         dispatch({type:"GetUserProfileSuccess" , payload : data.user});

        } catch (error) {
        dispatch({type:"GetUserProfileFailure" ,payload: error.response.data.message});
    }
}

export const GetUserPost = (id) =>  async(dispatch) => {
    try {
        dispatch({type:"GetUserPostRequest"});
        const {data} = await axios.get(`/api/v1/userposts/${id}`)

        dispatch({type:"GetUserPostSuccess" , payload : data.posts});
       } catch (error) {

       dispatch({type:"GetUserPostFailure",payload: error.response.data.message});
   }
}

export const FollowandUnfollowUser = (id) =>  async(dispatch) => {
    try {
        dispatch({type:"FollowandUnfollowRequest"});
        const {data} = await axios.get(`/api/v1/follow/${id}`)

        dispatch({type:"FollowandUnfollowSuccess" , payload : data.message});
       } catch (error) {

       dispatch({type:"FollowandUnfollowFailure" ,payload: error.response.data.message});
   }
}