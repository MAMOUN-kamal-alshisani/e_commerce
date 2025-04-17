import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

 const favApi = createApi({
  reducerPath: "favs",
  tagTypes: ["favs"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
  }),
  endpoints(builder) {
    return {
      fetchFavCount: builder.query({
        providesTags: ["favs"],
        query: (user) => {
          return {
            url: `/fav/count/${user?.user?.id}`,
            method: "GET",
          };
        },
      }),
      fetchUserFavItem: builder.query({
        providesTags: ["favs"],
        query: (user) => {
          return {
            url: `/fav/user/${user?.user?.id}`,
            method: "GET",
          };
        },
      }),
      fetchUserFavProductIds: builder.query({
        providesTags: ["favs"],
        query: (user) => {
          return {
            url: `/fav/productsId/${user?.user?.id}`,
            method: "GET",
          };
        },
      }),
      
      addToFav: builder.mutation({
        invalidatesTags: ["favs"],
        query: ({ user, data }) => {
          return {

            url: `/fav/${user?.user?.id}`,
            method: "POST",
            body: {
              favorite: [data?.id],
              userId: user?.user?.id,
            },
          };
        },
      }),

      deleteFavoriteProducts: builder.mutation({
        invalidatesTags: ["favs"],
        query: ({ user, item }) => {
          return {

            url: `/fav/${user?.user?.id}/${item?.item?.id}`,
            method: "DELETE",

          };
        },
      }),
    };
  },
});
export const {
  useFetchFavCountQuery,
  useFetchUserFavItemQuery,
  useAddToFavMutation,
  useDeleteFavoriteProductsMutation,
  useFetchUserFavProductIdsQuery
} = favApi;
export { favApi };