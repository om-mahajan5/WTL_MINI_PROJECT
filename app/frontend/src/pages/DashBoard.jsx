import React, { useContext, useEffect, useState } from 'react'

import { DataContext, UserContext } from '../DataContext';
import axios from 'axios';
import SignOutButton from './SignOut';
import { AppBar, Box, Toolbar, Typography, Grid, Container, Avatar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Snackbar, Alert, MenuItem, Modal, CardHeader, CardContent, Card, Divider, Menu, ListItemIcon, Popover } from '@mui/material';
import SideBar from './SideBar';
import Notices from './Notices';
import LandingPage from './LandingPage';
import hostUrl from './utils/hostUrl'

function DashBoard() {

    const { userDetails, setUserDetails } = useContext(UserContext);
    const [userData, setUserData] = useState(undefined)
    const [userModal, setUserModal] = useState(false)
    // const userDetails = {
    //     "uid": "YfatNdX8qOh6fZHZqATwAVtOJgR2"
    // }
    const [snackBar, setSnackBar] = useState(false)
    const [notices, setNotices] = useState([]);

    // const [userData, setUserData] = useState(
    //     {
    //         "name": "Om Mahajan",
    //         "uid": "YfatNdX8qOh6fZHZqATwAVtOJgR2",
    //         "timecreated": "2022-04-30T07:22:58.030823",
    //         "noticeBoards": [
    //             {
    //                 "name": "not my nb",
    //                 "timecreated": "2022-04-30T08:21:18.371402",
    //                 "uid": "YfatNdX8qOh6fZHZqATwAVtOJgR2",
    //                 "nbid": "BEAEFF"
    //             },
    //             {
    //                 "name": "First NoticeBoard",
    //                 "timecreated": "2022-04-29T20:36:34.071452",
    //                 "uid": "1234",
    //                 "nbid": "BEECCA"
    //             },
    //             {
    //                 "name": "my boaring notice board",
    //                 "timecreated": "2022-04-30T18:16:49.552640",
    //                 "uid": "YfatNdX8qOh6fZHZqATwAVtOJgR2",
    //                 "nbid": "BFDFBC"
    //             },
    //             {
    //                 "name": "My Notice Board",
    //                 "timecreated": "2022-04-30T08:20:42.041903",
    //                 "uid": "YfatNdX8qOh6fZHZqATwAVtOJgR2",
    //                 "nbid": "CADBCC"
    //             }
    //         ]
    //     }
    // );
    const [currentlySelectedNoticeBoard, setCurrentlySelectedNoticeBoard] = useState("home")
    const [joinNoticeBoardState, setJoinNoticeBoardState] = useState(false)
    let urlParams = new URLSearchParams(window.location.search);
    let urlParamNbid = urlParams.get("nbid")
    useEffect(
        () => {
            if (urlParamNbid) {
                if (userData.noticeBoards.filter(noticeBoard => noticeBoard.nbid == urlParamNbid).length) {
                    setCurrentlySelectedNoticeBoard(urlParamNbid)
                }
                else {
                    setJoinNoticeBoardState(true)
                }
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
        <DataContext.Provider value={{ setSnackBar, notices, setNotices, userData, setUserData, currentlySelectedNoticeBoard, setCurrentlySelectedNoticeBoard, urlParams }}>
            <Popover
                id="account-Popover"
                open={userModal}
                onClose={() => setUserModal(false)}
                onClick={() => setUserModal(false)}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                <Box>
                    <Avatar />
                </Box>
            </Popover>

            <Dialog open={joinNoticeBoardState}>
                <DialogTitle>
                    Do you want to join this noticeBoard?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You are about to join a NoticeBoad with ID: {urlParamNbid}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setJoinNoticeBoardState(false)}>Join</Button>
                    <Button onClick={() => setJoinNoticeBoardState(false)}> Cancel</Button>
                </DialogActions>
            </Dialog>
            <AppBar position='sticky'>
                <Toolbar >
                    <Typography color='inhert' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Online Dashboard
                    </Typography>
                    <MenuItem onClick={() => setUserModal(true)}>
                        <Avatar src={userDetails.photoURL} />
                    </MenuItem>
                    {/* {userData ? <Typography variant='h5' >{userData.name}</Typography> : "LOGIN ERROR"} */}
                    <SignOutButton />
                </Toolbar>
            </AppBar>
            <Box sx={{ flexGrow: 1 }}  >
                <Container maxWidth="xl">
                    <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={4} md={3}>
                            {userData ? <SideBar userData={userData} /> : "LOGIN ERROR"}
                        </Grid>
                        <Grid item xs={4} md={9} sx={{ flexGrow: 1 }}>
                            {currentlySelectedNoticeBoard == 'home' ?
                                <LandingPage /> :
                                userData ?
                                    <Notices notice={userData.noticeBoards.filter(noticeBoard => noticeBoard.nbid == currentlySelectedNoticeBoard)[0]} /> :
                                    "LOGIN ERROR"}
                        </Grid>
                    </Grid>
                </Container>
                <Snackbar open={!!snackBar} autoHideDuration={6000} onClose={() => setSnackBar(false)}>
                    <Alert onClose={() => setSnackBar(false)} severity={snackBar.severity} sx={{ width: '100%' }}>
                        {snackBar.message}
                    </Alert>
                </Snackbar>
            </Box >
        </DataContext.Provider>
    )
}

export default DashBoard