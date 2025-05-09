import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'  ;
import axios from 'axios';

//User Registration
export const registerUser=createAsyncThunk("/auth/register",
    async(formData)=>{
    const response=await axios.post('http://localhost:5000/api/auth/register',
        formData,{
        withCredentials: true
        });
    return response.data;
})

//Login User
export const loginUser=createAsyncThunk("/auth/login",
    async(formData)=>{
    const response=await axios.post('http://localhost:5000/api/auth/login',formData,{
        withCredentials: true
    });
    return response.data;
    })

//Check-auth (auth middleware)
export const checkAuth=createAsyncThunk("/auth/checkAuth",
    async(formData)=>{
    const response=await axios.get('http://localhost:5000/api/auth/check-auth',
        {
             withCredentials: true,
            headers:{
                 'Cache-Control': 'no-cache, no-store must-revalidate proxy-revalidate',

            }
        })
        return response.data;

    })


 //Creating auth slice with all the reducers
const authSlice = createSlice(  {
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        isLoading:true,
        user: null,
    },
    reducers: {
        setUser: (state, action) => {}
    },
    extraReducers:(builder) => {
        builder
            //register user reducers
            .addCase(registerUser.pending, (state) => {
            state.isLoading = true;

        }).addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;

        }).addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;

        }) .addCase(loginUser.pending, (state) => {
                state.isLoading = true;

            }).addCase(loginUser.fulfilled, (state, action) => {
            console.log(action);
            state.isLoading = false;
            state.user = action.payload?.success ? action.payload?.user :null;
            state.isAuthenticated = action.payload?.success ;

        }).addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;

        }).addCase(checkAuth.pending, (state, action) => {
            state.isLoading = true;


        }).addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload?.success ? action.payload?.user :null;
            state.isAuthenticated = action.payload?.success ;

        }).addCase(checkAuth.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;

        })


    }
    }
)

export const {setUser} = authSlice.actions;
export default authSlice.reducer;