import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux'
import Header from "../components/common/Header";
import Button from "../components/common/Button";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import Loader from "../components/common/Loader";
import { collection, getDocs, query, where } from "firebase/firestore";
import PodcastCard from "../components/common/Podcasts/PodcastCard";
function Profile(){
    const user=useSelector(state=>state.user.user);
    const [podcasts, setPodcasts] = useState([]);
   
    console.log("my user",user);

    useEffect(() => {
       
        const fetchDocs = async () => {
          const q = query(
            collection(db, "podcasts"),
            where("createdBy", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);
          const docsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPodcasts(docsData);
        };
        if (user) {
            fetchDocs();
          }
      }, [user]);

     

      if (!user) {
        return <Loader/>;
      }

    const handleLogout=()=>{
        signOut(auth).then(()=>{
           toast.success("User Logged out Successfully")
        }).catch((error)=>{
           toast.error(error.message)
        })
    }

    return<div className="profile">
       <Header/>
       <div className="profile-info">
       <p style={{textAlign:"center"}}>Profile</p>
       <p>Name: {user.name}</p>
       <p>Email: {user.email}</p>
       <p>user-id: {user.uid}</p>
       </div>
       
       
        
       <h1 className="profile-text">My Podcasts</h1>
       <>
       {
        podcasts?.length==0?(
            <p className="profile-text">You have Zero Podcasts</p>
        ):(
            <div className="profile-pods">
            {
                podcasts?.map((podcast)=>(
                    <PodcastCard
                      id={podcast.id}
                      title={podcast.title}
                      displayImage={podcast.displayImage}
                    />
                ))
            }
            </div>
        )
       }
       </>
       <Button text={"Logout"} onClick={handleLogout} style={{width:"50%",margin:"auto",marginBottom:"3rem"}}/>
    </div>
}
export default Profile;