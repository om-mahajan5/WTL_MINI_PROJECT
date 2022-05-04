import { Button, Card, CardContent, CardHeader, List, Stack, TextField } from "@mui/material"
import { Box } from "@mui/system"
import axios from "axios"
import { useContext, useState } from "react"
import { DataContext } from "../DataContext"
import hostUrl from "./utils/hostUrl"

const LandingPage = () => {
    const [noticeBoardName, setNoticeBoardName] = useState(null)
    const [noticeBoardCode, setNoticeBoardCode] = useState(null)
    const { userData, urlParams, setSnackBar, setUserData } = useContext(DataContext)

    const joinNoticeBoard = (uid, nbid) => {
        axios.post(
            `${hostUrl}/api/join-noticeboard`,
            {
                uid: uid,
                nbid: nbid
            }
        ).then(
            (response) => {
                setSnackBar({ message: `Joined NoticeBoard : ${nbid}`, severity: "success" })
                console.log("JOINED NOTICE BOARD",response.data)
                let newUserData = userData
                newUserData.noticeBoards.push(response.data)
                setUserData(newUserData)
                return response.data
            }
        )
    }

    function createNoticeBoard(uid, name) {
        axios.post(
            `${hostUrl}/api/create-noticeboard`,
            {
                uid: uid,
                name: name
            }
        ).then((response) => {
            console.log("CREATED NOTICEBOARD",response.data);
            setSnackBar({ message: `Created NoticeBoard : ${name}`, severity: "success" })
            let newUserData = userData
            newUserData.noticeBoards.push(response.data)
            setUserData(newUserData)
            return response.data
        }
        )
    }
    return (
        <Box>
            <List>

                <Stack spacing={2}>
                    <Card>
                        <CardHeader title="Home" />
                    </Card>
                    <Card>
                        <CardHeader title="Create new NoticeBoard" />
                        <CardContent>
                            <Stack direction="row" spacing={2}>
                                <TextField label="Name" onChange={(event) => { setNoticeBoardName(event.target.value) }}></TextField>
                                <Button onClick={() => { createNoticeBoard(userData.uid, noticeBoardName) }}>CREATE</Button>
                            </Stack>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader title="Join a NoticeBoard" />
                        <CardContent>
                            <Stack direction="row" spacing={2}>
                                <TextField label="Code" defaultValue={urlParams.get("nbid")} onChange={(event) => { setNoticeBoardCode(event.target.value) }}></TextField>
                                <Button onClick={() => { joinNoticeBoard(userData.uid, noticeBoardCode) }}>JOIN</Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Stack>
            </List>
        </Box>
    )
}

export default LandingPage