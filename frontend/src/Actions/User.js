import axios from "axios"
import { toast } from 'react-toastify';

export const userRegister = (name,email,password,avatar) => async(dispatch) => {
    try {
        dispatch({type:"RegisterRequest"});
<<<<<<< HEAD
        
        const {data} = await axios.post(`/api/register` , 
=======
        const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/register` , 
>>>>>>> f723c21c853a3b4776d7d4b3c6b54a270eb816ed
        { name,email,password , avatar },
        {
            headers : {
                'Content-Type' :'application/json',
            }
        })
            toast.success(' Registered Successfully ');
            dispatch({type:"RegisterSuccess" ,payload : data.user});

        } catch (error) {
            console.log('error register-',error);
            toast.error(' Something Went Wrong Register ');
            dispatch({type:"RegisterFailure" , payload : error.response.data.message})
        }
}


export const  loginUser = (email,password) => async(dispatch) => {
    try {
         dispatch({type:"LoginRequest"});
         console.log('data started  -');
<<<<<<< HEAD
        const  data  = await  axios.post(`/api/login`, 
        {email,password},
        {
                // withCredentials : true,
                headers : { 
                    "Content-Type" : 'application/json' ,
                }
            });
            
        console.log('login user-',{data});
=======
        const data  = await  axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/login`, 
        {email,password},
        {
                headers : {
                    "Content-Type" : 'application/json' ,
                },
                withCredentials : true
        });
        console.log('data login -',{data});
>>>>>>> f723c21c853a3b4776d7d4b3c6b54a270eb816ed
        toast.success(' Logged In Successfully ');
        dispatch({type:"LoginSuccess",payload: data.user})

    } catch (error) {
<<<<<<< HEAD
        console.log('error in login -',error);
=======
        console.log('error login -',error);
>>>>>>> f723c21c853a3b4776d7d4b3c6b54a270eb816ed
        dispatch({type:"LoginFailure",payload: error.response.data.message})
    }
}

<<<<<<< HEAD
=======

export const GetlikePost = (id) => async(dispatch) => {
    try {
        dispatch({type:"LikeRequest"});
        
        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${id}` )

        toast.success(data.message);
        dispatch({type:"LikeSuccess",payload : data.message })

    } catch (error) {
        dispatch({type:"LikeFailure" ,payload: error.response.data.message})
    }
}

>>>>>>> f723c21c853a3b4776d7d4b3c6b54a270eb816ed
export const loaduser = () => async(dispatch) => {
    try {
         dispatch({type:"LoadUserRequest"});

<<<<<<< HEAD
         const { data } = await  axios.get(`/api/myprofile`);
=======
         const options = {
            headers : {
                'Content-Type' : 'application/json',
            },
            withCredentials : true
        }

         const { data } = await  axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/myprofile` , options);
>>>>>>> f723c21c853a3b4776d7d4b3c6b54a270eb816ed

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
        
<<<<<<< HEAD
        const { data } = await axios.get(`/api/followpost`);
=======
        const options = {
            headers : {
                'Content-Type' : 'application/json',
            },
            withCredentials : true
        }

        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/followpost` ,options);
        console.log(' following data -',{data});
>>>>>>> f723c21c853a3b4776d7d4b3c6b54a270eb816ed
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

<<<<<<< HEAD
        const {data} = await axios.get(`/api/users?name=${name}`);
=======
        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users?name=${name}`,options);
>>>>>>> f723c21c853a3b4776d7d4b3c6b54a270eb816ed

        dispatch({type:"GetgetAllUsersSuccess",payload : data.users});
    } catch (error) {
        dispatch({type:"GetgetAllUsersFailure" ,payload: error.response.data.message})
    }
}



export const GetMyPost = () => async(dispatch) => {
    try {
        dispatch({type: "GetPostRequest"});

<<<<<<< HEAD
        const { data } = await axios.get(`/api/my/posts` )
=======
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/my/posts` )
>>>>>>> f723c21c853a3b4776d7d4b3c6b54a270eb816ed

        dispatch({type: "GetPostSuccess",payload : data.posts})
    } catch (error) {
        dispatch({type: "GetPostFailure" ,payload: error.response.data.message})
    }
}


export const GetComments = (id,comment) => async(dispatch) => {
    try {
        dispatch({type:"CommentRequest"}) 
<<<<<<< HEAD
        const  { data } = await axios.put(`/api/posts/comment/${id}`, 
=======
        const  { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/comment/${id}`, 
>>>>>>> f723c21c853a3b4776d7d4b3c6b54a270eb816ed
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

<<<<<<< HEAD
        const { data } = await axios.delete(`/api/posts/comment/${id}` ,
=======
        const { data } = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/comment/${id}` ,
>>>>>>> f723c21c853a3b4776d7d4b3c6b54a270eb816ed
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
<<<<<<< HEAD
        await axios.get(`/api/logout`);
=======
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/logout`);
>>>>>>> f723c21c853a3b4776d7d4b3c6b54a270eb816ed

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
<<<<<<< HEAD
            const { data } = await axios.post(`/api/post/upload`, 
=======
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/post/upload`, 
>>>>>>> f723c21c853a3b4776d7d4b3c6b54a270eb816ed
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

<<<<<<< HEAD
            const { data } = await axios.put(`/api/post/${id}` ,{
=======
            const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${id}` ,{
>>>>>>> f723c21c853a3b4776d7d4b3c6b54a270eb816ed
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
        
<<<<<<< HEAD
        const { data } = await axios.delete(`/api/post/${id}` )
=======
        const { data } = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${id}` )
>>>>>>> f723c21c853a3b4776d7d4b3c6b54a270eb816ed

        dispatch({type:"DeletePostSuccess" , payload : data.message });
    } catch (error) {
        
        dispatch({type:"DeletePostFailure" ,payload: error.response.data.message})
    }
}


export const GetUpdatedProfile = (name,email,avatar) =>  async(dispatch) => {
    try {
        dispatch({type:"updateProfileRequest"});

<<<<<<< HEAD
        const { data } = await axios.put(`/api/update/profile` ,
=======
        const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/update/profile` ,
>>>>>>> f723c21c853a3b4776d7d4b3c6b54a270eb816ed
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

<<<<<<< HEAD
        const {data} = await axios.delete(`/api/delete/me` );
=======
        const {data} = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/delete/me` );
>>>>>>> f723c21c853a3b4776d7d4b3c6b54a270eb816ed

        dispatch({type:"DeleteProfileSuccess",payload: data.message });

    } catch (error) {
        dispatch({type:"DeleteProfileRequest" ,payload: error.response.data.message});
    }
}


export const GetUserProfile = (id) => async(dispatch) => {
    try {
         dispatch({type:"GetUserProfileRequest"});
<<<<<<< HEAD
         const {data} = await axios.get(`/api/user/${id}` , )
=======
         const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${id}` , )
>>>>>>> f723c21c853a3b4776d7d4b3c6b54a270eb816ed

         dispatch({type:"GetUserProfileSuccess" , payload : data.user});

        } catch (error) {
        dispatch({type:"GetUserProfileFailure" ,payload: error.response.data.message});
    }
}

export const GetUserPost = (id) =>  async(dispatch) => {
    try {
        dispatch({type:"GetUserPostRequest"});
<<<<<<< HEAD
        const {data} = await axios.get(`/api/userposts/${id}`)
=======
        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/userposts/${id}`)
>>>>>>> f723c21c853a3b4776d7d4b3c6b54a270eb816ed

        dispatch({type:"GetUserPostSuccess" , payload : data.posts});
       } catch (error) {

       dispatch({type:"GetUserPostFailure",payload: error.response.data.message});
   }
}

export const FollowandUnfollowUser = (id) =>  async(dispatch) => {
    try {
        dispatch({type:"FollowandUnfollowRequest"});
<<<<<<< HEAD
        const {data} = await axios.get(`/api/follow/${id}`)
=======
        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/follow/${id}`)
>>>>>>> f723c21c853a3b4776d7d4b3c6b54a270eb816ed

        dispatch({type:"FollowandUnfollowSuccess" , payload : data.message});
       } catch (error) {

       dispatch({type:"FollowandUnfollowFailure" ,payload: error.response.data.message});
   }
}