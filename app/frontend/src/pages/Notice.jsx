import { Button, Card, CardActions, CardContent, CardHeader, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useContext } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import LinkIcon from '@mui/icons-material/Link';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { DataContext } from "../DataContext";

const Notice = (props) => {
    const {currentlySelectedNoticeBoard} = useContext(DataContext)
    const deleteNotice = (nid) => {
        axios.post(
            "http://localhost:5000/api/delete-notice",
            {
                nid: nid
            }
        )
    }

    return (
        <Card id={props.notice.nid}>
            <CardHeader title={props.notice.title} />
            <CardContent>
                {props.notice.body}
            </CardContent>
            <CardActions>
                <Tooltip title="delete">
                    <IconButton color="error" onClick={() => deleteNotice(props.notice.nid)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
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
        </Card>
    )
}

export default Notice