import React from "react";
import InputComponent from "../../common/Input";
import FileInput from "../../common/Input/FileInput";
import Button from "../../common/Button";
import { useState } from'react';
// Firebase Auth API imports
import {auth,db, storage} from "../../../firebase";
import {
    createUserWithEmailAndPassword,
}from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {setUser} from '../../../slices/userSlice'
import { toast } from "react-toastify";
function SignupForm(){
    const [fullName,setFullName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const[loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleSignup=async ()=>{
        setLoading(true);
      console.log("handling signup");
      if(password==confirmPassword && password.length>=6 && fullName && email){
        try{
            //Creating user's account.
            const userCredential=await createUserWithEmailAndPassword(
                auth,email,password
            );
            const user=userCredential.user;
            // console.log(user);
            //Saving user's details
            await setDoc(doc(db,"users",user.uid),{ //dont want the doc id to be random,,so giving the uid
               name :fullName,
               email:email,
               uid:user.uid,
              
            });
            dispatch(setUser({
                name :fullName,
                email:email,
                uid:user.uid,
              
             }));

             toast.success("User has been successfully created");
             setLoading(false);
             navigate("/profile");
          }catch(e){
            console.log(e);
            toast.error("You already have an Account");
            setLoading(false);
          }
      }else{
        if(password!=confirmPassword){
            toast.error(
                "Please Make Sure your password and confirm Password are same!"
            )
        }else if(password.length<6){
            toast.error(
                "Please Make Sure your password is more than 6 digits long!"
            )
        }
        setLoading(false);
        //throw an error
      }
     
    };

    return(
        <>
            <InputComponent
            state={fullName}
            setState={setFullName}
            placeholder="Full Name"
            type="text"
            required={true}/>
            <InputComponent
            state={email}
            setState={setEmail}
            placeholder="Email"
            type="text"
            required={true}/>
            <InputComponent
            state={password}
            setState={setPassword}
            placeholder="Password"
            type="password"
            required={true}/>
            <InputComponent
            state={confirmPassword}
            setState={setConfirmPassword}
            placeholder="Confirm Password"
            type="password"
            required={true}/>
            <Button text={loading?"Loading...":"Signup"} disabled={loading} onClick={handleSignup} />
        </>
    )
}
export default SignupForm;