import axios from "axios"

export const loginUser = (email,password) => async(dispatch) => {
    try {
         dispatch({type:"LoginRequest"});

        const {data} = await  axios.post('/api/v1/login', {email,password},
        { headers : {
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