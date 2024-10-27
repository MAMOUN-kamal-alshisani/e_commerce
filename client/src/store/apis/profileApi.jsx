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
          // console.log(user.id);
          return {
            url: `/contacted/${user?.id}`,
            method: "GET",
          };
          
        },
        
      }),
      updateProfileData: builder.mutation({
        invalidatesTags: ["profile"],
        query: ({user, data}) => {
          // console.log(data);
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
      // updateProfilePic: builder.mutation({
      //   invalidatesTags: ["profile"],
      //   query: async({user, imgUrl}) => {
      //     // console.log(data);
      //     // const imgUrl = await fileUploadHandler()
      //     // console.log(user);
          
      //     return {
      //       url: `/contact/${user.user.id}`,
      //       method: "PUT",
      //       body: {
      //         Photo:imgUrl.downloadURL
      //       },
      //     };
      //   },
      // }),
    };
  },
});

export const { useFetchProfileDataQuery, useUpdateProfileDataMutation, useUpdateProfilePicMutation } =
  profileApi;

export { profileApi };
