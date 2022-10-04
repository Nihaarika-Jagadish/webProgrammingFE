import {combineReducers} from '@reduxjs/toolkit'
import homeSlice from '../components/homePage/homeSlice';
import userSlice from '../components/users/userSlice';
const appReducer = combineReducers({
    user:userSlice,
    homeSlice: homeSlice
})

const rootReducer = (state,action) => {
    return appReducer(state,action)
}

export default rootReducer