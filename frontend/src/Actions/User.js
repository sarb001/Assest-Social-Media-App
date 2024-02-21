import axios from "axios"
import { toast } from 'react-toastify';


export const userRegister = (name,email,password,avatar) => async(dispatch) => {
    try {
        dispatch({type:"RegisterRequest"});
        const {data} = await axios.post(`https://social-media-api-5d67.onrender.com/api/register` , 
        { name,email,password , avatar },
        {
            headers : {
                'Content-Type' :'application/json',
            }
        })
            toast.success(' Registered Successfully ');
            dispatch({type:"RegisterSuccess" ,payload : data.user});

        } catch (error) {
            
            toast.error(' SignUp Error ');
            dispatch({type:"RegisterFailure" , payload : error.response.data.message})
        }
}


export const  loginUser = (email,password) => async(dispatch) => {
    try {
         dispatch({type:"LoginRequest"});
         console.log('data started  -');
        const  data  = await  axios.post(`https://social-media-api-5d67.onrender.com/api/login`, 
        {email,password},
        {
                headers : {
                    "Content-Type" : 'application/json' ,
                },
                withCredentials : true
        });

        console.log('data is -',data);

        toast.success('Logged In Successfully');
        dispatch({type: "LoginSuccess", payload: data.user});
       
    } catch (error) {
        console.log('error login -',error);
        toast.error(' Login Error ');
        dispatch({type:"LoginFailure",payload: error.response.data.message})
    }
}


export const GetlikePost = (id) => async(dispatch) => {
    try {
        dispatch({type:"LikeRequest"});
        const options = {
            headers : {
                'Content-Type' : 'application/json',
            },
            withCredentials : true
        }
        const {data} = await axios.get(`https://social-media-api-5d67.onrender.com/api/post/${id}` , options )

        toast.success(data.message);
        dispatch({type:"LikeSuccess",payload : data.message })

    } catch (error) {
        toast.error('Error while Liking Post');
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

         const { data } = await  axios.get(`https://social-media-api-5d67.onrender.com/api/myprofile` , options);

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

        const {data} = await axios.get(`https://social-media-api-5d67.onrender.com/api/followpost` ,options);
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

        const {data} = await axios.get(`https://social-media-api-5d67.onrender.com/api/users?name=${name}`,options);

        dispatch({type:"GetgetAllUsersSuccess",payload : data.users});
    } catch (error) {
        dispatch({type:"GetgetAllUsersFailure" ,payload: error.response.data.message})
    }
}



export const GetMyPost = () => async(dispatch) => {
    try {
        dispatch({type: "GetPostRequest"});

        const options = {
            headers : {
                'Content-Type' : 'application/json',
            },
            withCredentials : true
        }

        const { data } = await axios.get(`https://social-media-api-5d67.onrender.com/api/my/posts` , options)

        dispatch({type: "GetPostSuccess",payload : data.posts})
    } catch (error) {
        dispatch({type: "GetPostFailure" ,payload: error.response.data.message})
    }
}


export const GetComments = (id,comment) => async(dispatch) => {
    try {
        dispatch({type:"CommentRequest"}) 
        const  { data } = await axios.put(`https://social-media-api-5d67.onrender.com/api/posts/comment/${id}`, 
        {
            comment
        },{
            headers : {
                "Content-Type" : 'application/json',
            },
            withCredentials:true
        })
        dispatch({type:"CommentSuccess",payload: data.message}); 
    } catch (error) {
        dispatch({type:"CommentFailure",payload: error.response.data.message}) 
    }
}

export const GetDeleteComment = (id,commentId) => async(dispatch) => {
    try {
        dispatch({type:"DeleteCommentRequest"})
        const options = {
            headers : {
                'Content-Type' : 'application/json',
            },
            withCredentials : true
        }
        const { data } = await axios.delete(`https://social-media-api-5d67.onrender.com/api/posts/comment/${id}` ,
        {
            data : { commentId },
        },options);
        
        toast.success(' Comment Deleted ');
        dispatch({type:"DeleteCommentSuccess",payload:data.message});
    } catch (error) {
        dispatch({type:"DeleteCommentFailure",payload: error.response.data.message}) 
    }
}


export const LogoutUser = () => async(dispatch) => {
    try {
        dispatch({type:"LogOutRequest"});
        const options = {
            headers : {
                'Content-Type' : 'application/json',
            },
            withCredentials : true
        }
        await axios.get(`https://social-media-api-5d67.onrender.com/api/logout` ,options);

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
            const { data } = await axios.post(`https://social-media-api-5d67.onrender.com/api/post/upload`, 
            {
                caption , 
                image
            },
            {
                headers : {
                    "Content-Type" : "application/json",
                },
                withCredentials : true
            })

          dispatch({type:"NewPostSuccess",payload : data.message });
          toast.success(' New Post Created ');          
        } catch (error) {   
            dispatch({type:"NewPostFailure" ,payload: error.response.data.message });
    }
}

export const UpdateCaption = (caption,id) => async(dispatch) => {
    try {
            dispatch({type:"UpdateCaptionRequest"});

            const { data } = await axios.put(`https://social-media-api-5d67.onrender.com/api/post/${id}` ,{
                caption
            },{
                headers: {
                    'Content-Type' : 'application/json'
                },
                withCredentials : true
            })

            dispatch({type:"UpdateCaptionSuccess",payload : data.message  });
            toast.success(' Caption Updated Successfully')

        }catch (error) {
        dispatch({type:"UpdateCaptionFailure",payload: error.response.data.message});
    }
}

export const DeletePost = (id) => async(dispatch) => {
    try {
        dispatch({type:"DeletePostRequest"});
        
        const options = {
            headers : {
                'Content-Type' : 'application/json',
            },
            withCredentials : true
        } 
        const { data } = await axios.delete(`https://social-media-api-5d67.onrender.com/api/post/${id}` ,options)

        dispatch({type:"DeletePostSuccess" , payload : data.message });
        toast.success('Post Deleted Successfully ')
    } catch (error) {
        toast.error(' Post Not Deleted ')
        dispatch({type:"DeletePostFailure" ,payload: error.response.data.message})
    }
}


export const GetUpdatedProfile = (name,email,avatar) =>  async(dispatch) => {
    try {
        dispatch({type:"updateProfileRequest"});

        const { data } = await axios.put(`https://social-media-api-5d67.onrender.com/api/update/profile` ,
        { name,email,avatar },
        {
                headers : {
                    'Content-Type' : 'application/json'
                },
                withCredentials: true 
        });  

        dispatch({type:"updateProfileSuccess" ,payload : data.message });
        toast.success('Profile Updated ');
    } catch (error) {
        toast.error(' Something Went Wrong');
        dispatch({type:"updateProfileFailure",payload: error.response.data.message});
    }
}


export const DeleteProfile = () => async(dispatch) => {
    try {
        dispatch({type:"DeleteProfileRequest"});
        const options = {
            headers : {
                'Content-Type' : 'application/json',
            },
            withCredentials : true
        }
        const {data} = await axios.delete(`https://social-media-api-5d67.onrender.com/api/delete/me` , options);

        dispatch({type:"DeleteProfileSuccess",payload: data.message });
        toast.success(' Profile Deleted Successfully ');

    } catch (error) {
        dispatch({type:"DeleteProfileRequest" ,payload: error.response.data.message});
    }
}


export const GetUserProfile = (id) => async(dispatch) => {
    try {
         dispatch({type:"GetUserProfileRequest"});
         const options = {
            headers : {
                'Content-Type' : 'application/json',
            },
            withCredentials : true
        }
         const {data} = await axios.get(`https://social-media-api-5d67.onrender.com/api/user/${id}` , options)

         dispatch({type:"GetUserProfileSuccess" , payload : data.user});

        } catch (error) {
        dispatch({type:"GetUserProfileFailure" ,payload: error.response.data.message});
    }
}

export const GetUserPost = (id) =>  async(dispatch) => {
    try {
        dispatch({type:"GetUserPostRequest"});
        const options = {
            headers : {
                'Content-Type' : 'application/json',
            },
            withCredentials : true
        }
        const {data} = await axios.get(`https://social-media-api-5d67.onrender.com/api/userposts/${id}`  ,options)

        dispatch({type:"GetUserPostSuccess" , payload : data.posts});
       } catch (error) {

       dispatch({type:"GetUserPostFailure",payload: error.response.data.message});
   }
}

export const FollowandUnfollowUser = (id) =>  async(dispatch) => {
    try {
        dispatch({type:"FollowandUnfollowRequest"});
        const options = {
            headers : {
                'Content-Type' : 'application/json',
            },
            withCredentials : true
        }
        const {data} = await axios.get(`https://social-media-api-5d67.onrender.com/api/follow/${id}` ,options)

        dispatch({type:"FollowandUnfollowSuccess" , payload : data.message});
       } catch (error) {

       dispatch({type:"FollowandUnfollowFailure" ,payload: error.response.data.message});
   }
}