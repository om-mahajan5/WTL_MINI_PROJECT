import React, { useContext, useEffect, useState } from 'react'

import { DataContext, UserContext } from '../DataContext';
import axios from 'axios';
import SignOutButton from './SignOut';
import { AppBar, Box, Toolbar, Typography, Grid, Container, Avatar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Snackbar, Alert } from '@mui/material';
import SideBar from './SideBar';
import Notices from './Notices';
import LandingPage from './LandingPage';
import hostUrl from './utils/hostUrl'

function DashBoard() {

    const { userDetails, setUserDetails } = useContext(UserContext);
    const [userData, setUserData] = useState(undefined)

    // const userDetails = {
    //     "user": { "uid": "YfatNdX8qOh6fZHZqATwAVtOJgR2" }
    // }
    const [snackBar, setSnackBar] = useState(false)
    const [notices, setNotices] = useState([]);
    // const [userData, setUserData] = useState({
    //     "name": "",
    //     "timecreated": "",
    //     "uid": "",
    //     "noticeBoards": [
    //         {
    //             "name": "",
    //             "nbid": "",
    //             "timecreated": ""
    //         }
    //     ]
    // });
    const [currentlySelectedNoticeBoard, setCurrentlySelectedNoticeBoard] = useState("home")
    const [joinNoticeBoardState, setJoinNoticeBoardState] = useState(false)
    let urlParams = new URLSearchParams(window.location.search);
    useEffect(
        () => {
            if (
                urlParams.get("nbid") &&
                userData.noticeBoards.filter(
                    noticeBoard => noticeBoard.nbid == urlParams.get("nbid")).length) {
                setCurrentlySelectedNoticeBoard(urlParams.get("nbid"))
            }
            else if (urlParams.get("nbid") && userData.noticeBoards.filter(
                noticeBoard => noticeBoard.nbid == urlParams.get("nbid")).length == 0) {
                setJoinNoticeBoardState(true)
            }
            else {
                console.log("No URL Params");
            }

        }, [userData]
    )
    useEffect(
        () => {

            console.log(hostUrl);
            axios.get(`${hostUrl}/api/user?uid=${userDetails.uid}`)
                .then((response) => {
                    console.log("Fetched UserData", userDetails.uid, response.data);
                    setUserData(response.data);
                })
        }, []
    )


    return (
        <DataContext.Provider value={{  setSnackBar, notices, setNotices, userData, setUserData, currentlySelectedNoticeBoard, setCurrentlySelectedNoticeBoard, urlParams }}>
            <Dialog open={joinNoticeBoardState}>
                <DialogTitle>
                    Do you want to join this noticeBoard?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You are about to join a NoticeBoad with ID: {urlParams.get("nbid")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setJoinNoticeBoardState(false)}>Join</Button>
                    <Button onClick={() => setJoinNoticeBoardState(false)}> Cancel</Button>
                </DialogActions>
            </Dialog>
            <Box sx={{ flexGrow: 1 }}  >
                <AppBar position='static'>
                    <Toolbar >
                        <Typography color='inhert' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Online Dashboard
                        </Typography>
                        <Avatar src={userDetails.PhotoUrl} />
                        {userData ? <Typography variant='h5' >{userData.name}</Typography> : "LOGIN ERROR"}
                        <SignOutButton />
                    </Toolbar>
                </AppBar>
                <Container>
                    <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={3}>
                            {userData ? <SideBar userData={userData} /> : "LOGIN ERROR"}
                        </Grid>
                        <Grid item sx={{ flexGrow: 1 }}>
                            {currentlySelectedNoticeBoard == 'home' ? <LandingPage /> : userData ? <Notices notice={userData.noticeBoards.filter(noticeBoard => noticeBoard.nbid == currentlySelectedNoticeBoard)[0]} /> : "LOGIN ERROR"}
                        </Grid>
                    </Grid>
                </Container>
                <Snackbar open={snackBar} autoHideDuration={6000} onClose={() => setSnackBar(false)}>
                    <Alert onClose={() => setSnackBar(false)} severity={snackBar.severity} sx={{ width: '100%' }}>
                        {snackBar.message}
                    </Alert>
                </Snackbar>
            </Box >
        </DataContext.Provider>
    )



}

export default DashBoard