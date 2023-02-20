import {configureStore} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { itemsApi } from './apis/itemApi'
import authSlice from './slices/authSlice'
import cartSlice from './slices/cartSlice'
// import {CartApi} from './apis/cartApi'
const store = configureStore({
    reducer:{
      auth:authSlice.reducer,
      cart:cartSlice.reducer,
[itemsApi.reducerPath]:itemsApi.reducer   ,
// [CartApi.reducerPath]:CartApi.reducer
    },
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware()
        .concat(itemsApi.middleware)
        // .concat(CartApi.middleware)
    },
    // middleware:(getDefaultMiddleware)=>{
    //     return getDefaultMiddleware()
    //     .concat(CartApi.middleware)
    //     // .concat(CartApi.middleware)
    // }
})

setupListeners(store.dispatch)

// export * from './apis/itemApi'
export default store