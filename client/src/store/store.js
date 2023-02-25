import {configureStore} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { itemsApi } from './apis/itemApi'
import authSlice from './slices/authSlice'
import cartSlice from './slices/cartSlice'

const store = configureStore({
    reducer:{
      auth:authSlice.reducer,
      cart:cartSlice.reducer,
[itemsApi.reducerPath]:itemsApi.reducer   ,
    },
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware()
        .concat(itemsApi.middleware)
    },

})

setupListeners(store.dispatch)

// export * from './apis/itemApi'
export default store