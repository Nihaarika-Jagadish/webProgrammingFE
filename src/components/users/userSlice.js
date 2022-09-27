import {createSlice} from '@reduxjs/toolkit'
// call dispatch function 
import * as Api from '../../Api'
export const userSlice = createSlice({
    name:"userSlice",
    initialState:{
        // define initial list to be empty or default static values me,isSupervisor is state variable
        me:{},
        token:''
    },
    reducers:{
        //to create an action to update state variable called list in the initial State
        setMe:(state,action) => {
            state.me = action.payload;
        },
        setToken:(state,action) => {
            state.token = action.payload;
        }

    }
});

//to expose actions that can be called from any where in the application
export const {setMe, setToken} = userSlice.actions;

//to expose selectors when components need store values in store
export const UserMeSelector = (state) => state.user.me;
export const TokenSelector = (state) => state.user.token;

//make an api call & get list of announcements or assign static variables 
export function getUserInfo(){
    // 
    return async (dispatch) => {
        try{
            dispatch(setMe({}));
            Api.call("/",{method:'GET'},(response)=> {
                //if success
                response = JSON.parse(response);
                dispatch(setMe(response['UserInfo']));
            },(error,status,content)=>{
                //error send to snackbar
            dispatch(setMe({}))


            });
        }catch(error){
            dispatch(setMe({}))
        }
    }
}


// to avoid class we write export default to make this useSlice.js available to weherever it is called.
export default userSlice.reducer;