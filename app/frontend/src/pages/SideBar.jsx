import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import ArticleIcon from '@mui/icons-material/Article';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { DataContext } from '../DataContext';
import React, { useContext, useEffect } from 'react';

const SideBar = () => {

    const { userData } = useContext(DataContext)

    useEffect(
        ()=>{
            console.log("Under useEffect");
        },[userData]
    )

    return (
        <List>
            <SideBarListItem noticeBoard={{ name: "home", nbid: "home", uid: null }} userUid={userData.uid} key="home" />
            {userData ?
                userData.noticeBoards.map(
                    (noticeBoard) => {
                        // console.log(noticeBoard.uid);
                        return <SideBarListItem noticeBoard={noticeBoard} userUid={userData.uid} key={noticeBoard.nbid} />
                    }
                ) :
                "ERROR"
            }
        </List>)

}

const SideBarListItem = ({ noticeBoard, userUid }) => {
    const { currentlySelectedNoticeBoard, setCurrentlySelectedNoticeBoard } = useContext(DataContext)

    return (
        <ListItem >
            <ListItemButton sx={{ borderRadius: '20px' }} onClick={() => { setCurrentlySelectedNoticeBoard(noticeBoard.nbid) }} selected={currentlySelectedNoticeBoard == noticeBoard.nbid}>
                <ListItemIcon>
                    {noticeBoard.name == 'home' ? <HomeIcon /> : <ArticleIcon />}
                </ListItemIcon>
                <ListItemText primary={noticeBoard.name} />
                {userUid == noticeBoard.uid ? <AccountBoxIcon /> : null}
            </ListItemButton>
        </ListItem>

    )
}

export default SideBar