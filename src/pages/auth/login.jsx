import React,{useState} from 'react';
import CommonForm from "@/components/common/form.jsx";
import {loginFormControls} from "@/config/config.jsx";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginUser} from "@/store/auth-slice/authSlice.js";
import {toast, useToast} from "@/hooks/use-toast.js";

//Initial state
const initialState = {
    email: '',
    password: '',
}

const AuthLogin = () => {

    const [formData, setFormData] = useState({initialState});
    const dispatch = useDispatch();
    const {toast} = useToast();

    const onSubmit = async (event) => {
        event.preventDefault();
        dispatch(loginUser(formData)).then(data => {
          if(data?.payload?.success){
          toast({
              success:true,
              title: data?.payload?.message,
          })
          }else{
              toast({
                  title: data?.payload?.message,
                  variant: 'destructive',
              })
          }
        })

    }

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                   Login to your account
                </h1>
                <p className="mt-2">Dont have an account?
                    <Link to="/auth/register" className="font-medium ml-2 text-primary hover:underline">Register</Link>
                </p>
            </div>
            <CommonForm formControls={loginFormControls} formData={formData} setFormData={setFormData} buttonText={"Sign In"} onSubmit={onSubmit}/>

        </div>

    );
};

export default AuthLogin;