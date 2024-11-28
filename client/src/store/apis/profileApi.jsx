import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const profileApi = createApi({
  reducerPath: "profile",
  tagTypes: ["profile"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
  }),
  endpoints(builder) {
    return {
      fetchProfileData: builder.query({
        providesTags: ["profile"],
        query: ({user}) => {
          return {
            url: `/contacted/${user?.id}`,
            method: "GET",
          };
        },
      }),
      updateProfileData: builder.mutation({
        invalidatesTags: ["profile"],
        query: ({user, data}) => {
          return {
            url: `/contact/${user?.user?.id}`,
            method: "POST",
            body: {
              Fname: data.Fname,
              Lname: data?.Lname,
              Phone: data.Phone,
              BirthDate: data.BirthDate,
              Country: data.Country,
              Address: data.Address,
              Email: data.Email,
              Gender: data.Gender,
              userId:user.user.id
            },
          };
        },
      }),
      AddProfilePicture: builder.mutation({
        invalidatesTags: ["profile"],
        query: ({user, data}) => {

          return {
            url: `/contact/picture/${user?.id}`,
            method: "PUT",
            body: {
              Photo:data
            },
          };
        },
      }),
    };
  },
});

export const { useFetchProfileDataQuery, useUpdateProfileDataMutation, useAddProfilePictureMutation } =
  profileApi;

export { profileApi };
