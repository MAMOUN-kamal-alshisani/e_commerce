/// for future dev

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";


// const profileApi = createApi({
//   reducerPath: "profile",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:4000",
//   }),
//   endpoints(builder) {
//     return {
    
//       updateProfile: builder.mutation({
//         invalidatesTags: ["profile"],
//         query: (profile) => {
//           return {
//             url: `/contact/${profile.id}`,
//             method: "PUT",

      
//           };
//         },
//       }),

//     //   addAlbum: builder.mutation({
//     //     invalidatesTags: ["profile"],
//     //     query: (user) => {
//     //       return {
//     //         url: `/contact/${user.id}`,
//     //         method: "POST",
//     //         // body: {
//     //         //   userId: user.id,
//     //         //   title: faker.commerce.productName(),
//     //         // },
//     //       };
//     //     },
//     //   }),
//       fetchContact: builder.query({
//         providesTags: (result, error, user) => {
//           return [{ type: "profile", UserId: user.id }];
//         },
//         query: (user) => {
//           return {
//             url: "/contacted",
//             params: {
//               UserId: user.id,
//             },
//             method: "GET",
//           };
//         },
//       }),
//     };
//   },
// });

// export const { use} = profileApi;
// export { profileApi };



// const itemsApi = createApi({


//   reducerPath:'items',
//   baseQuery:fetchBaseQuery({
//       baseUrl:"http://localhost:4000"
//   }),

//   endpoints(builder){
// return {

//   fetchItems:builder.query({
//       query:(query)=>{
//           return{
//         url:'/item',
//         method:'GET'
//           }
//       }
//   })
// }

//   }
// })





// .useFetchItemsQuery()
