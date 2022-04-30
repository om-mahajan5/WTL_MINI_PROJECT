import React, { useState } from 'react'
import {auth} from '../Firebase/firebase'
import { signInWithPopup, GoogleAuthProvider, signOut,onAuthStateChanged} from 'firebase/auth';

import DashBoard from './DashBoard';
import { UserContext } from '../DataContext';



function SignIn() {
    const [userLoggedin, setUserLoggedin] = useState(false);
    const [userDetails, setUserDetails] = useState();
    
    onAuthStateChanged(auth,(user)=>{
        if(user){
            setUserDetails(user)
            return setUserLoggedin(true);
        }
        setUserLoggedin(false)
    })
    const signinWithFirebase = ()=>{
        var provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider)
        .then((re)=>{
            console.log(re);
        }).catch((err)=>{
            console.log(err);
        })
        
    }
    const signoutWithFirebase = ()=>{
        signOut(auth).then((re)=>{
            console.log(re);
        }).catch((err)=>{
            console.log(err);
        })
        
    }



  return (
    <div>
        
        
        {
            userLoggedin ? 
            <UserContext.Provider value={{userDetails,setUserDetails}} >
                <DashBoard/>
            </UserContext.Provider>
            
            :<button onClick={signinWithFirebase} >  sign in</button>
        }
        
        
        
        
    </div>
  )
}

export default SignIn