import { Button, Card, CardActions, CardContent, CardHeader, Stack, TextField } from "@mui/material"
import axios from "axios";
import { useContext } from "react";
import { DataContext, UserContext } from "../DataContext";
import hostUrl from './utils/hostUrl'

const CreateNoticeCard = ({ nbid, uid, getNotices }) => {

    const { setSnackBar, notices, setNotices } = useContext(DataContext)
    const newNotice = {
        title: null,
        body: null
    }


    function createNotice(nbid, uid) {
        axios.post(`${hostUrl}/api/create-notice`, {
            nbid: nbid,
            uid: uid,
            title: newNotice.title,
            body: newNotice.body
        }).then((res) => {
            console.log("CREATED NEW NOTICE : ", res.data);
            let newNotices = notices
            newNotices.push(res.data)
            setNotices(newNotices)
            setSnackBar({ message: "Created new Notice", severity: "success" })
            getNotices()
        })
    }
    return (
        <Card >
            <CardHeader title="Create Notice" />
            <CardContent>
                <Stack spacing={1}>
                    <TextField fullWidth required label="Title" onChange={(e) => { newNotice.title = e.target.value }} />
                    <TextField fullWidth multiline label="Body" required rows={4} onChange={(e) => { newNotice.body = e.target.value }} />
                </Stack>
            </CardContent>
            <CardActions>
                <Button>CLEAR</Button>
                <Button onClick={() => { createNotice(nbid, uid) }}>CREATE</Button>
            </CardActions>
        </Card>

    )
}

export default CreateNoticeCard