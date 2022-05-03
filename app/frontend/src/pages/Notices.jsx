import { useContext, useEffect, useState } from "react"
import { DataContext } from "../DataContext"
import Notice from "./Notice"
import axios from 'axios';
import { Button, Card, CardActions, CardContent, CardHeader, Fab, Grid, IconButton, List, Menu, MenuItem, Stack, TextField, Tooltip, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import LinkIcon from '@mui/icons-material/Link';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CreateNoticeCard from "./CreateNoticeCard";
import hostUrl from './utils/hostUrl'

const Notices = ({ notice }) => {
    const { setSnackBar,currentlySelectedNoticeBoard, userData } = useContext(DataContext)
    const [notices, setNotices] = useState([])
    const [shareMenuState, setShareMenuState] = useState(false)


    const leaveNoticeBoard = (uid, nbid) => {
        axios.post(
            `${hostUrl}/api/leave-noticeboard`,
            {
                uid: uid,
                nbid: nbid
            }
        ).then((response)=>{
            setSnackBar({message:"Left the NoticeBoard",severity:"success"})
        })
    }

    function getNotices(nbid) {
        axios.get(`${hostUrl}/api/get-notices?nbid=${nbid}`).then((res) => {
            console.log(res.data);
            setNotices(res.data)
        })
    }


    useEffect(
        () => {
            console.log(`Selected NoticeBoard: ${currentlySelectedNoticeBoard}`)
            getNotices(currentlySelectedNoticeBoard)
        }, [currentlySelectedNoticeBoard]
    )

    return (
                <List sx={{ flexGrow: 1 }}>
                    <Stack spacing={2}>
                        <Card>
                            <CardHeader title={notice.name} />
                            <CardContent>
                                <Typography color="text.secondary" >
                                    NoticeBoard ID is {notice.nbid}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Tooltip title="Leave NoticeBoard">
                                    <IconButton color="error" onClick={() => { leaveNoticeBoard(userData.uid, currentlySelectedNoticeBoard) }}>
                                        <LogoutIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="share link">
                                    <IconButton color="primary" aria-label="add" onClick={() => navigator.clipboard.writeText(`${window.location.origin}?nbid=${currentlySelectedNoticeBoard}`)}>
                                        <LinkIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="share on whatsapp">
                                    <IconButton color="success" href={`whatsapp://send?text=Join my NoticeBoard! ${window.location.origin}?nbid=${currentlySelectedNoticeBoard}`}>
                                        <WhatsAppIcon />
                                    </IconButton>
                                </Tooltip>
                            </CardActions>
                        </Card>
                        {
                            userData.uid == notice.uid ? <CreateNoticeCard nbid={currentlySelectedNoticeBoard} uid={userData.uid} getNotices={getNotices} /> : null

                        }
                        {
                            notices.map(
                                (notice) => {
                                    return <Notice notice={notice} key={notice}/>
                                }
                            )
                        }
                    </Stack>
                </List>
    )
}

export default Notices