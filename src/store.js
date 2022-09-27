import {configureStore} from '@reduxjs/toolkit'
import rootReducer from './reducers'

const store = configureStore({
    reducer : rootReducer
})

//Hot reloading
if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      store.replaceReducer(rootReducer());
    });
  }

export default store