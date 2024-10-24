import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const newsApi = createApi({
  reducerPath: "news",
  tagTypes: ["news"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
  }),
  endpoints(builder) {
    return {
      fetchNews: builder.query({
        providesTags: ["news"],
        query: (user) => {
          return {
            url: `/news`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchNewsQuery } = newsApi;

export { newsApi };
