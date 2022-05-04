import { Button, Card, CardActions, CardContent, CardHeader, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useContext } from "react";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import axios from "axios";
import LinkIcon from '@mui/icons-material/Link';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { DataContext } from "../DataContext";
import hostUrl from './utils/hostUrl'

const Notice = (props) => {
    const { setSnackBar, currentlySelectedNoticeBoard, userData, notices, setNotices } = useContext(DataContext)
    const deleteNotice = (nid) => {
        axios.post(
            `${hostUrl}/api/delete-notice`,
            {
                nid: nid
            }
        ).then((response) => {
            if (response.status == '200') {
                setSnackBar({ message: "Deleted notice sucessfully!", severity: "success" })
                let newNotices = notices
                newNotices.filter(notice=>notice.nid!=nid)
                setNotices(newNotices)
            } else {
                setSnackBar({ message: "Left the NoticeBoard", severity: "error" })
            }
        }
        )
    }

    return (
        <Card id={props.notice.nid}>
            <CardHeader title={props.notice.title} />
            <CardContent>
                {props.notice.body}
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                {userData.uid == props.notice.uid ?
                    < Tooltip title="delete" sx={{ left: 'flex-start' }}>
                        <IconButton color="error" onClick={() => deleteNotice(props.notice.nid)}>
                            <DeleteOutlineOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    : null}
                <Tooltip title="share link">
                    <IconButton color="primary" aria-label="add" onClick={() => navigator.clipboard.writeText(`${window.location.origin}?nbid=${currentlySelectedNoticeBoard}#${props.notice.nid}`)}>
                        <LinkIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="share on whatsapp">
                    <IconButton color="success" href={`whatsapp://send?text=Checkout this Notice! ${window.location.origin}?nbid=${currentlySelectedNoticeBoard}#${props.notice.nid}`}>
                        <WhatsAppIcon />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card >
    )
}

export default Notice