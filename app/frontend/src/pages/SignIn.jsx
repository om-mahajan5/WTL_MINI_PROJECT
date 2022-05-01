import React, { useState } from 'react'
import { auth } from '../Firebase/firebase'

import DashBoard from './DashBoard';
import { UserContext } from '../DataContext';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { Button } from '@mui/material'



const SignIn = () => {

    const signinWithFirebase = () => {
        var provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((re) => {
                console.log(re);
            }).catch((err) => {
                console.log(err);
            })

    }

    return (
        <Button onClick={signinWithFirebase} >SIGN IN</Button>
    )
}

export default SignIn