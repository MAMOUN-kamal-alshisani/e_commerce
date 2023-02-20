
// import {createSlice} from '@reduxjs/toolkit'
// import {useFetchItemsQuery} from '../apis/itemApi'

// const itemSlice = createSlice({

//     name:'items',
//     initialState:{

//         data:[],
//         isLoading:false,
//         error:null
//     },
//     reducers:{

//     },
//     extraReducers(builder){
//         builder.addCase(useFetchItemsQuery.pending,(state,action)=>{

//             state.isLoading = true
//         });
//         builder.addCase(useFetchItemsQuery.fulfilled,(state,action)=>{

//             state.isLoading = false,
//             state.data.push(action.payload)
//         });
//         builder.addCase(useFetchItemsQuery.pending,(state,action)=>{
//             state.isLoading = false,
//             state.error = action.error
            
//         });
//     }
    
// })

// export {itemSlice}