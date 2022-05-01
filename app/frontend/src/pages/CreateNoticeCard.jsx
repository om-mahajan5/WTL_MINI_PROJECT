import { Button, Card, CardActions, CardContent, CardHeader, Stack, TextField } from "@mui/material"
import axios from "axios";

const CreateNoticeCard = ({ nbid, uid, getNotices }) => {
    const newNotice = {
        title: null,
        body: null
    }


    function createNotice(nbid, uid) {
        axios.post(`http://localhost:5000/api/create-notice`, {
            nbid: nbid,
            uid: uid,
            title: newNotice.title,
            body: newNotice.body
        }).then((res) => {
            console.log(res.data);
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