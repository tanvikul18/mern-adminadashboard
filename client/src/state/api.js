import {createApi ,fetchBaseQuery } from "@reduxjs/toolkit/query/react"



export const api = createApi({
    baseQuery : fetchBaseQuery({baseUrl : import.meta.env.VITE_REACT_BASE_URL}),
    reducerPath : "adminApi",
    tagTypes : ['LoggedUser','User','Products','Customers','Transactions','Geography','Sales','Admins','Performance','Dashboard'],
    endpoints : (builder)=>({
         getLoggedInUser: builder.mutation({
        query: ({ name, password }) => ({
            url: 'auth/signin',
            method: 'POST',
            body: { name, password },
        }),
        providesTags: ['LoggedUser'],
        }),
        getUser: builder.query({
           
            query : (id) =>`general/user/${id}`,
            
            providesTags : ['User']
        }),
        getProducts: builder.query({
            query : () =>"client/products",
            providesTags : ['Products']
        }),
        getCustomers: builder.query({
        query : () =>"client/customers",
        providesTags : ['Customers']
    }),
        getTransactions: builder.query({
            query : ({page,pageSize,sort,search}) => ({
                url:"client/transactions",
                method : "GET",
                params:{page,pageSize,sort,search}
            }),
            providesTags : ['Transactions']
        }),
         getGeography: builder.query({
            query : () =>"client/geography",
            providesTags : ['Geography']
        }),
         getSales: builder.query({
            query : () =>"sales/sales",
            providesTags : ['Sales']
        }),
          getAdmin: builder.query({
            query : () =>"management/admins",
            providesTags : ['Admins']
        }),
         getPerformance: builder.query({
            query : (id) =>`management/performance/${id}`,
            providesTags : ['Performance']
        }),
         getDashboardStats: builder.query({
            query : () =>`general/dashboard`,
            providesTags : ['Dashboard']
        }),
    })
})  

export const {
    useGetUserQuery,useGetProductsQuery,useGetCustomersQuery,useGetTransactionsQuery,useGetGeographyQuery,useGetSalesQuery,useGetAdminQuery,
    useGetPerformanceQuery,useGetDashboardStatsQuery,useGetLoggedInUserMutation
} = api;