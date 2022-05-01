import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../Firebase/firebase';

import { DataContext, UserContext } from '../DataContext';
import axios from 'axios';
import SignOutButton from './SignOut';
import { signOut } from 'firebase/auth';
import { AppBar, Box, IconButton, Toolbar, Typography, SwipeableDrawer, List, ListItemText, Grid, Container, ListItem, ListItemButton, ListItemIcon, Paper, Avatar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from './SideBar';
import Notice from './Notice';
import Notices from './Notices';
import LandingPage from './LandingPage';
import getUserData from './getUserData';
function DashBoard() {

    // const { userDetails, setUserDetails } = useContext(UserContext);
    const userDetails = {
        "user": { "uid": "YfatNdX8qOh6fZHZqATwAVtOJgR2" }
    }
    const [noticeBoardOpen, setNoticeBoardOpen] = useState(false);
    const [notices, setNotices] = useState([]);
    const [userData, setUserData] = useState({
        "name": "Om Mahajan",
        "timecreated": "2022-04-29T20:36:16.004598",
        "uid": "1234",
        "noticeBoards": [
            {
                "name": "First NoticeBoard",
                "nbid": "BEECCA",
                "timecreated": "2022-04-29T20:36:34.071452"
            }
        ]
    });
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
                console.log("clear");
            }
            console.log("hi");
            axios.get(`http://localhost:5000/api/user?uid=${userDetails.user.uid}`)
                .then((response) => {
                    console.log("Fetched UserData", userDetails.user.uid, response.data);
                    setUserData(response.data);
                })
        }, []
    )


    return (
        <DataContext.Provider value={{ noticeBoardOpen, setNoticeBoardOpen, notices, setNotices, userData, setUserData, currentlySelectedNoticeBoard, setCurrentlySelectedNoticeBoard, urlParams }}>
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
                        <Typography variant='h5' >{userData.name}</Typography>
                        <SignOutButton />
                    </Toolbar>
                </AppBar>
                <Container>
                    <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={3}>
                            {userData ? <SideBar userData={userData} /> : null}
                        </Grid>
                        <Grid item sx={{ flexGrow: 1 }}>
                            {currentlySelectedNoticeBoard == 'home' ? <LandingPage /> : <Notices notice={userData.noticeBoards.filter(noticeBoard => noticeBoard.nbid == currentlySelectedNoticeBoard)[0]} />}
                        </Grid>
                    </Grid>
                </Container>
            </Box >
        </DataContext.Provider>
    )



}



// function GroupContainer(props) {
//     const { groups, setGroups } = useContext(DataContext)
//     return (
//         <div className={styles.groupContainer}>

//             {groups.map((item) => {
//                 return (<GroupComponent id={item['id']} name={item['title']} />)
//             })}

//         </div>
//     )
// }
// function GroupComponent(props) {
//     const { noticeBoardOpen, setNoticeBoardOpen, notices, setNotices } = useContext(DataContext);
//     const { id, name } = props;
//     return (
//         <div onClick={() => {
//             axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
//                 console.log(res.data);
//                 setNotices(res.data);
//                 setNoticeBoardOpen(true)
//             })
//         }} className={styles.groupComponent} >
//             <h3>{name}</h3>

//         </div>
//     )
// }

// function NoticeContainer(props) {

//     const { noticeBoardOpen, setNoticeBoardOpen, notices, setNotices } = useContext(DataContext);
//     return (
//         <div>
//             <button onClick={() => { setNoticeBoardOpen(false) }} >x</button>
//             {notices.map((item) => {
//                 return (<NoticeComponent id={item['id']} title={item['title']} content={item['body']} timestamp={item['timestamp']} />)
//             })}
//         </div>
//     )
// }

// function NoticeComponent(props) {

//     const { id, content, title, timestamp } = props;
//     return (
//         <div className={styles.noticeComponent}>
//             <h3>{title}</h3>
//             <p> {content} </p>
//         </div>
//     )
// }



export default DashBoard