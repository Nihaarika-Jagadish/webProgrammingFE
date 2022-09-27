import {combineReducers} from '@reduxjs/toolkit'
import userSlice from '../components/users/userSlice';
const appReducer = combineReducers({
    user:userSlice,
})

const rootReducer = (state,action) => {
    return appReducer(state,action)
}

export default rootReducer