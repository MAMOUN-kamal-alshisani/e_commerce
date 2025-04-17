import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const itemsApi = createApi({
  reducerPath: "items",
  tagTypes: ["products"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
  }),

  endpoints(builder) {
    return {
      fetchItems: builder.query({
        providesTags: ["products"],
        query: (item) => {
          return {
            url: "/item",
            method: "GET",
          };
        },
      }),
      fetchItemById: builder.query({
        providesTags: ["products"],
        query: (ProductId) => {
          return {
            url: `/item/${ProductId}`,
            method: "GET",
          };
        },
      }),
      fetchFeaturedItems: builder.query({
        providesTags: ["products"],
        query: (item) => {
          return {
            url: "/item/group/featured",
            method: "GET",
          };
        },
      }),
      fetchLatestItems: builder.query({
        providesTags: ["products"],
        query: (item) => {
          return {
            url: "/item/by/latest",
            method: "GET",
          };
        },
      }),
      fetchAllLatestItems: builder.query({
        providesTags: ["products"],
        query: (item) => {
          return {
            url: "/item/all/latest",
            method: "GET",
          };
        },
      }),
      fetchElectronicItems: builder.query({
        providesTags: ["products"],
        query: (item) => {
          return {
            url: "/item/category/electronics",
            method: "GET",
          };
        },
      }),

      fetchAccessorieItems: builder.query({
        providesTags: ["products"],
        query: (item) => {
          return {
            url: "/item/category/accessories",
            method: "GET",
          };
        },
      }),
      fetchExclusiveItem: builder.query({
        providesTags: ["products"],
        query: (item) => {
          return {
            url: "/item/by/exclusive",
            method: "GET",
          };
        },
      }),
      fetchItemsByPrice: builder.query({
        providesTags: ["products"],
        query: (item) => {
          return {
            url: "/item/group/price",
            method: "GET",
          };
        },
      }),
      fetchSearchedItems: builder.query({
        providesTags: ["products"],
        query: (searchInput) => {
          return {
            url: `/item/search/key?name=${searchInput}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useFetchItemsQuery,
  useFetchItemByIdQuery,
  useFetchFeaturedItemsQuery,
  useFetchElectronicItemsQuery,
  useFetchAccessorieItemsQuery,
  useFetchLatestItemsQuery,
  useFetchAllLatestItemsQuery,
  useFetchExclusiveItemQuery,
  useFetchItemsByPriceQuery,
  useFetchSearchedItemsQuery,
} = itemsApi;

export { itemsApi };
