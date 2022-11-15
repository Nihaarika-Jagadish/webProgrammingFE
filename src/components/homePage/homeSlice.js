import {createSlice} from '@reduxjs/toolkit'
import Swal from 'sweetalert2';
// call dispatch function 
import * as Api from '../../Api'
export const homeSlice = createSlice({
    name:"homeSlice",
    initialState:{
        // define initial list to be empty or default static values me,isSupervisor is state variable
        allUsers:[],
        elasticSearchResults: {},
        allGroups:[],
        allUserGroups:[],
        annotatedSearchResults: []
    },
    reducers:{
        //to create an action to update state variable called list in the initial State
        setAllUsers:(state,action) => {
            state.allUsers = action.payload;
        },
        setElasticSearchResults:(state,action) => {
            state.elasticSearchResults = action.payload;
        },
        setAllGroups:(state,action) => {
            state.allGroups = action.payload;
        },
        setAllUserGroups:(state,action) => {
            state.allUserGroups = action.payload;
        },
        setAnnotatedSearchResults:(state,action) => {
            state.annotatedSearchResults = action.payload;
        }

    }
});

//to expose actions that can be called from any where in the application
export const {setAllUsers, setElasticSearchResults, setAllGroups, setAllUserGroups, setAnnotatedSearchResults} = homeSlice.actions;

//to expose selectors when components need store values in store
export const AllUsersSelector = (state) => state.homeSlice.allUsers;
export const ElasticSearchSelector = (state) => state.homeSlice.elasticSearchResults;
export const AllGroupSelector = (state) => state.homeSlice.allGroups;
export const AllUserGroupSelector = (state) => state.homeSlice.allUserGroups;
export const AnnotatedSearchResultSelector = (state) => state.homeSlice.annotatedSearchResults;






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


export function elasticSearch(searchValue){
    // 
    return async (dispatch) => {
        try{
            // dispatch(setAllUsers([]));
            Api.call("/elasticsearch/search",{method:'POST', body:{'keyword': searchValue} },(response)=> {
                //if success
                response = JSON.parse(response);
                dispatch(setElasticSearchResults(response.data))
            },(error,status,content)=>{
                //error send to snackbar
            dispatch(setAllUsers([]))


            });
        }catch(error){
            dispatch(setAllUsers([]))
        }
    }
}

export function getAnnotatedSearchResult(user){
    // 
    return async (dispatch) => {
        try{
            // dispatch(setAllUsers([]));
            Api.call("/elasticsearch/annotatedsearch?user_id="+user,{method:'GET' },(response)=> {
                //if success
                response = JSON.parse(response);
                dispatch(setAnnotatedSearchResults(response.data))
            },(error,status,content)=>{
                //error send to snackbar
            dispatch(setAnnotatedSearchResults([]))
            });
        }catch(error){
            dispatch(setAnnotatedSearchResults([]))
        }
    }
}



export function getAllGroups(){
    // 
    return async (dispatch) => {
        try{
            // dispatch(setAllUsers([]));
            Api.call("/userGroups/allGroups",{method:'GET'},(response)=> {
                //if success
                response = JSON.parse(response);
                dispatch(setAllGroups(response.data))
            },(error,status,content)=>{
                //error send to snackbar
            dispatch(setAllGroups([]))


            });
        }catch(error){
            dispatch(setAllGroups([]))
        }
    }
}

export function getAllUserGroups(){
    // 
    return async (dispatch) => {
        try{
            // dispatch(setAllUsers([]));
            Api.call("/userGroups/allAssignedUserGroups",{method:'GET'},(response)=> {
                //if success
                response = JSON.parse(response);
                dispatch(setAllUserGroups(response.data))
            },(error,status,content)=>{
                //error send to snackbar
            // dispatch(setAllGroups([]))


            });
        }catch(error){
            // dispatch(setAllGroups([]))
        }
    }
}

export function assignGroup(form){
    // 
    return async (dispatch) => {
        try{
            // dispatch(setAllUsers([]));
            Api.call("/userGroups/assignGroup",{method:'POST', body: form},(response)=> {
                //if success
                response = JSON.parse(response);
                Swal.fire('', response["message"], 'success').then((result) => {
                    dispatch(getAllUserGroups());
                    })
            },(error,status,content)=>{
                //error send to snackbar
            // dispatch(setAllGroups([]))


            });
        }catch(error){
            // dispatch(setAllGroups([]))
        }
    }
}



// to avoid class we write export default to make this useSlice.js available to weherever it is called.
export default homeSlice.reducer;