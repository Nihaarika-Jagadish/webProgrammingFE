import {createSlice} from '@reduxjs/toolkit'
import Swal from 'sweetalert2';
// call dispatch function 
import * as Api from '../../Api'
export const userSlice = createSlice({
    name:"userSlice",
    initialState:{
        // define initial list to be empty or default static values me,isSupervisor is state variable
        me:{},
        token:false,
        profile:[]
    },
    reducers:{
        //to create an action to update state variable called list in the initial State
        setMe:(state,action) => {
            state.me = action.payload;
        },
        setToken:(state,action) => {
            state.token = action.payload;
        },
        setProfile:(state,action) => {
            state.profile = action.payload;
        }

    }
});

//to expose actions that can be called from any where in the application
export const {setMe, setToken, setProfile} = userSlice.actions;

//to expose selectors when components need store values in store
export const UserMeSelector = (state) => state.user.me;
export const TokenSelector = (state) => state.user.token;
export const ProfileSelector = (state) => state.user.profile;


//make an api call & get list of announcements or assign static variables 
export function registerUser(formData){
    // 
    return async (dispatch) => {
        try{
            dispatch(setMe({}));
            dispatch(setToken(false))
            Api.call("/user/register",{method:'POST', body: formData },(response)=> {
                //if success
                response = JSON.parse(response);
                localStorage.setItem("token", response['data']['token']);
                localStorage.setItem("user_id", response['data']['user_id']);
                localStorage.setItem("role_id", response['data']['role_id']);
                localStorage.setItem("tokenPresent", true);
                dispatch(setToken(true))
                dispatch(setMe(response['data']))
                Swal.fire('', response["message"], 'success').then((result) => {
                window.location.replace(response['data']['url'])
                })
                
            },(error,status,content)=>{
                //error send to snackbar
            dispatch(setMe({}))


            });
        }catch(error){
            dispatch(setMe({}))
        }
    }
}

export function loginUser(formData){
    // 
    return async (dispatch) => {
        try{
            dispatch(setMe({}));
            dispatch(setToken(false))
            Api.call("/user/login",{method:'POST', body: formData },(response)=> {
                //if success
                response = JSON.parse(response);
                localStorage.setItem("token", response['data']['token']);
                localStorage.setItem("user_id", response['data']['user_id']);
                localStorage.setItem("role_id", response['data']['role_id']);
                localStorage.setItem("tokenPresent", true);
                dispatch(setToken(true))
                dispatch(setMe(response['data']))
                Swal.fire('', response["message"], 'success').then((result) => {
                    window.location.replace(response['data']['url'])
                    })
                
            },(error,status,content)=>{
                //error send to snackbar
            dispatch(setMe({}))


            });
        }catch(error){
            dispatch(setMe({}))
        }
    }
}

export function getProfileInfo(token){
    // 
    return async (dispatch) => {
        try{
            dispatch(setProfile([]))
            Api.call("/user/profile?token="+token,{method:'GET' },(response)=> {
                //if success
                response = JSON.parse(response);
                dispatch(setProfile(response['data']))
                
            },(error,status,content)=>{
                //error send to snackbar
            dispatch(setProfile([]))


            });
        }catch(error){
            dispatch(setProfile([]))
        }
    }
}

export function updateProfile(formData){
    // 
    return async (dispatch) => {
        try{
            Api.call("/user/profile",{method:'POST', body: formData },(response)=> {
                //if success
                response = JSON.parse(response);
                Swal.fire('', response["message"], 'success').then((result) => {
                    })
            },(error,status,content)=>{
                //error send to snackbar


            });
        }catch(error){
            dispatch(setMe({}))
        }
    }
}

export function changePasswordApi(formData){
    // 
    return async (dispatch) => {
        try{
            Api.call("/user/changePassword",{method:'POST', body: formData },(response)=> {
                //if success
                response = JSON.parse(response);
                Swal.fire('', response["message"], 'success').then((result) => {
                })
            },(error,status,content)=>{
                //error send to snackbar


            });
        }catch(error){
            dispatch(setMe({}))
        }
    }
}

export function forgotPswd(formData){
    // 
    return async (dispatch) => {
        try{
            Api.call("/user/forgotPswd",{method:'POST', body: formData },(response)=> {
                //if success
                response = JSON.parse(response);
                Swal.fire('', response["message"], 'success').then((result) => {
                })
            },(error,status,content)=>{
                //error send to snackbar


            });
        }catch(error){
            dispatch(setMe({}))
        }
    }
}


// to avoid class we write export default to make this useSlice.js available to weherever it is called.
export default userSlice.reducer;