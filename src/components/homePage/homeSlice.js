import {createSlice} from '@reduxjs/toolkit'
import Swal from 'sweetalert2';
// call dispatch function 
import * as Api from '../../Api'
export const homeSlice = createSlice({
    name:"homeSlice",
    initialState:{
        // define initial list to be empty or default static values me,isSupervisor is state variable
        allUsers:[]
    },
    reducers:{
        //to create an action to update state variable called list in the initial State
        setAllUsers:(state,action) => {
            state.allUsers = action.payload;
        }

    }
});

//to expose actions that can be called from any where in the application
export const {setAllUsers} = homeSlice.actions;

//to expose selectors when components need store values in store
export const AllUsersSelector = (state) => state.homeSlice.allUsers;


//make an api call & get list of announcements or assign static variables 
export function getAllUsers(){
    // 
    return async (dispatch) => {
        try{
            dispatch(setAllUsers([]));
            Api.call("/user/allUsers",{method:'GET' },(response)=> {
                //if success
                response = JSON.parse(response);
                dispatch(setAllUsers(response['data']))
            },(error,status,content)=>{
                //error send to snackbar
            dispatch(setAllUsers([]))
            });
        }catch(error){
            dispatch(setAllUsers([]))
        }
    }
}

export function approveUser(email){
    // 
    return async (dispatch) => {
        try{
            // dispatch(setAllUsers([]));
            Api.call("/user/approveUser",{method:'PUT', body:{'email': email} },(response)=> {
                //if success
                response = JSON.parse(response);
                Swal.fire('', response["message"], 'success').then((result) => {
                dispatch(getAllUsers());
                })
            },(error,status,content)=>{
                //error send to snackbar
            dispatch(setAllUsers([]))


            });
        }catch(error){
            dispatch(setAllUsers([]))
        }
    }
}



// to avoid class we write export default to make this useSlice.js available to weherever it is called.
export default homeSlice.reducer;