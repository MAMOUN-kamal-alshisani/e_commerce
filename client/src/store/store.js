import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { itemsApi } from "./apis/itemApi";
import { cartApi } from "./apis/cartApi";
import { favApi } from "./apis/favApi";
import { newsApi } from "./apis/newsApi";
import { profileApi } from "./apis/profileApi";
import authSlice from "./slices/authSlice";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [itemsApi.reducerPath]: itemsApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [favApi.reducerPath]: favApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer
    
    
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(itemsApi.middleware)
      .concat(cartApi.middleware)
      .concat(favApi.middleware)
      .concat(newsApi.middleware)
      .concat(profileApi.middleware)
  },
});
setupListeners(store.dispatch);

export default store;
