import axios from "axios"

export const loginUser = (email,password) => async(dispatch) => {
    try {
         dispatch({type:"LoginRequest"});

        const {data} = await  axios.post('/api/v1/login', {email,password},
        { headers : 
              {
                "Content-Type" : 'application/json'
                }
        })
        console.log('data in Login -',{data});
        dispatch({type:"LoginSuccess",payload: data.user})

    } catch (error) {
        console.log('error in fail -',error);
        dispatch({type:"LoginFailure",payload: error})
    }
}

export const loaduser = () => async(dispatch) => {
    try {
         dispatch({type:"LoadUserRequest"});

         const { data } = await  axios.get('/api/v1/myprofile');

         dispatch({type:"LoadUserSuccess", payload : data.user})
    } catch (error) {
        dispatch({type:"LoadUserFailure" , payload : error})
    }
}
// get Posts of User that Follow logged User 

export const GetFollowingPostRequest = () => async(dispatch) => {
    try {
        dispatch({type:"GetFollowingPostRequest"});
        
        const { data } = await axios.get('/api/v1/followpost');
        dispatch({type:"GetFollowingPostSuccess",payload : data.posts});

    } catch (error) {
         dispatch({type:"GetFollowingPostFailure",payload: error})
    }
}


export const GetAllUsers = () => async(dispatch) => {
    try {
        dispatch({type:"GetgetAllUsersRequest"})

        const {data} = await axios.get('/api/v1/users');

        dispatch({type:"GetgetAllUsersSuccess",payload : data.users})
    } catch (error) {
        dispatch({type:"GetgetAllUsersFailure"})
    }
}

export const GetlikePost = (id) => async(dispatch) => {
    try {
        dispatch({type:"LikeRequest"});
        
        const {data} = await axios.get(`/api/v1/post/${id}`)

        dispatch({type:"LikeSuccess",payload : data.message })
    } catch (error) {
        dispatch({type:"LikeFailure"})
    }
}