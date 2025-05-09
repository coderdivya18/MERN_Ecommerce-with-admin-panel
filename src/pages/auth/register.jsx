import React,{useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import CommonForm from "@/components/common/form.jsx";
import {registerFormControls} from "@/config/config.jsx";
import {registerUser} from "@/store/auth-slice/authSlice.js";
import {useDispatch} from "react-redux";
import {toast, useToast} from "@/hooks/use-toast.js";


//Initial state
const initialState = {
    username: '',
    email: '',
    password: '',
}

const AuthRegister = () => {
    const [formData, setFormData] = useState({initialState})
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {toast} = useToast();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData)).then((data) => {
            if(data?.payload?.success){
                toast({
                    title: data?.payload?.message,

                })
                navigate('/auth/login')
            }
        })

    }

    console.log(formData);

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Create new account
                </h1>
                <p className="mt-2">Already have an account
                <Link to="/auth/login" className="font-medium ml-2 text-primary hover:underline">Login</Link>
                </p>
            </div>
            <CommonForm formControls={registerFormControls} formData={formData} setFormData={setFormData} buttonText={"SignUp"} onSubmit={onSubmit}/>

        </div>
    );
};

export default AuthRegister;