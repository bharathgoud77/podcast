import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import InputComponent from "../common/Input";
import Button from "../common/Button";
import FileInput from "../common/Input/FileInput";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
function CreatePodcastForm(){
    const[title,setTitle]=useState("");
    const[desc,setDesc]=useState("");
    const[displayImage,setDisplayImage]=useState();
    const[bannerImage,setBannerImage]=useState();
    const[loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleSubmit=async()=>{
        toast.success("Handling Form")
        if(title && desc && displayImage && bannerImage){
          setLoading(true);
            //1. Upload files ->get downloadable links
         try{
            const bannerImageRef=ref(
                storage,
                `podcasts/${auth.currentUser.uid}/${Date.now()}`
             );
             const uploaded= await uploadBytes(bannerImageRef,bannerImage);
             toast.success("File Uploaded");
             const bannerImageUrl=await getDownloadURL(bannerImageRef);
            console.log(bannerImageUrl);

            const displayImageRef=ref(
                storage,
                `podcasts/${auth.currentUser.uid}/${Date.now()}`
             );
              await uploadBytes(displayImageRef,displayImage);
             toast.success("File Uploaded");
             const displayImageUrl=await getDownloadURL(displayImageRef);
            console.log(displayImageUrl);
            
            const podcastData={
                title :title,
                description:desc,
                bannerImage:bannerImageUrl,
                displayImage:displayImageUrl,
                createdBy:auth.currentUser.uid,
             };

             const docRef=await addDoc(collection(db,"podcasts"),podcastData);
             setTitle("");
             setDesc("");
             setBannerImage(null);
             setDisplayImage(null);

             toast.success("Podcast Created!");
             setLoading(false);
         }catch(e){
            toast.error(e.message);
            setLoading(false);
         }
         
        }else{
            toast.error("All fields are mandatory");
            setLoading(false);
        }
    }
    const displayImageHandle=(file)=>{
        setDisplayImage(file)
    }
    const bannerImageHandle=(file)=>{
        setBannerImage(file)
    }
    return(
        <>
         <InputComponent
            state={title}
            setState={setTitle}
            placeholder="Title"
            type="text"
            required={true}/>
             <InputComponent
            state={desc}
            setState={setDesc}
            placeholder="Description"
            type="text"
            required={true}/>
            <FileInput accept={"image/*"} id={"display-image-input"} fileHandleFnc={displayImageHandle} text={"Upload Display Image"}/>
            <FileInput accept={"image/*"} id={"banner-image-input"} fileHandleFnc={bannerImageHandle} text={"Upload Banner Image"}/>
            <Button text={loading?"Loading...":"Create Podcast"} disabled={loading} onClick={handleSubmit} />
       
        </>
    )
}
export default CreatePodcastForm;