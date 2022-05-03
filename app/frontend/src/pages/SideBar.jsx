import { Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import ArticleIcon from '@mui/icons-material/Article';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { DataContext } from '../DataContext';
import { useContext } from 'react';

const SideBar = (props) => {
    return (
        <List>
            <SideBarListItem noticeBoard={{ name: "home", nbid: "home", uid: null }} userUid={props.userData.uid} key="home" />
            {
                props.userData.noticeBoards.map(
                    (noticeBoard) => {
                        // console.log(noticeBoard.uid);
                        return <SideBarListItem noticeBoard={noticeBoard} userUid={props.userData.uid} key={noticeBoard.nbid} />
                    }
                )
            }
        </List>)

}

const SideBarListItem = ({ noticeBoard, userUid }) => {
    const { currentlySelectedNoticeBoard, setCurrentlySelectedNoticeBoard } = useContext(DataContext)

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={() => { setCurrentlySelectedNoticeBoard(noticeBoard.nbid) }} selected={currentlySelectedNoticeBoard == noticeBoard.nbid}>
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