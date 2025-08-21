
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cartApi = createApi({
  reducerPath: "carts",
  tagTypes: ["carts"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
  }),

  endpoints(builder) {
    return {
      fetchCart: builder.query({
        providesTags: ["carts"],
        query: (user) => {
          return {
            url: `/carted/${user?.user?.id}`,
            method: "GET",
          };
        },
      }),
      fetchCartCount: builder.query({
        providesTags: ["carts"],

        query: (user) => {
          return {
            url: `/cart/count/${user?.user?.id}`,
            method: "GET",
            onSuccess: (data) => {
              return data;
            },
          };
        },
      }),
      addToCart: builder.mutation({
        invalidatesTags: ["carts"],
        query: ({ user, data }) => {
          return {
            url: `/cart/${user?.user?.id}`,
            method: "POST",
            body: {
              cart: [data?.id],
              userId: user?.id,
            },
          };
        },
      }),
      addQuantityToCart: builder.mutation({
        invalidatesTags: ["carts"],
        query: ({ user, data, quantity }) => {
          let cartArr = []
          for(let i = 0; i< quantity; i++){
          cartArr.push(Number(data?.id))
          }
          return {
            url: `/cart/${user?.user?.id}`,
            method: "POST",
            body: {
              cart: [...cartArr],
              userId: user?.user?.id,
            },
          };
        },
      }),
      removeFromCart: builder.mutation({
        invalidatesTags: ["carts"],
        query: ({ user, item }) => {
          return {
            url: `/cart/${user?.user?.id}/${item?.id}`,
            method: "DELETE",
          };
        },
      }),
      decreaseUserCart: builder.mutation({
        invalidatesTags: ["carts"],
        query: ({ user, item }) => {
          return {
            url: `/cart/item/${user?.user?.id}/${item?.id}`,
            method: "DELETE",
          };
        },
      }),
      increaseUserCart: builder.mutation({
        invalidatesTags: ["carts"],
        query: ({ user, item }) => {
          return {
            url: `/cart/item/${user?.user?.id}/${item?.id}`,
            method: "PUT",
          };
        },
      }),
    };
  },
});


export const {
  useFetchCartQuery,
  useFetchCartCountQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useDecreaseUserCartMutation,
  useIncreaseUserCartMutation,
  useAddQuantityToCartMutation
} = cartApi;

export { cartApi };
