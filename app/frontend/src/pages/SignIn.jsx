import React, { useState } from 'react'
import { auth } from '../Firebase/firebase'

import DashBoard from './DashBoard';
import { UserContext } from '../DataContext';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { Button, Card, CardActions, CardContent, CardHeader, Container, Grid } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';


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
        <Grid container
            style={{ minHeight: "100vh" }}
            justifyContent="center"
            alignItems="center"
        >
            <Grid item>
                <Card>
                    <CardHeader title="Online Noticeboard" />
                    <CardContent>
                        <img src="https://st2.depositphotos.com/1001599/43046/v/380/depositphotos_430460192-stock-illustration-sign-page-abstract-concept-vector.jpg?forcejpeg=true" />
                    </CardContent>
                    <CardActions>
                        <Button fullWidth size='large' color='primary' variant='contained' onClick={signinWithFirebase} >
                            <GoogleIcon />
                            SIGN IN WITH GOOGLE
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    )
}

export default SignIn