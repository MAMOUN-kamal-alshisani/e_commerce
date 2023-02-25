import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const itemsApi = createApi({
  reducerPath: "items",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
  }),

  endpoints(builder) {
    return {
      fetchItems: builder.query({
        query: (item) => {
          return {
            url: "/item",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchItemsQuery } = itemsApi;

export { itemsApi };
