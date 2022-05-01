import { Button, Card, CardContent, CardHeader, List, Stack, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { useContext, useState } from "react"
import { DataContext } from "../DataContext"
import createNoticeBoard from "./createNoticeBoard"
import joinNoticeBoard from "./joinNoticeBoard"
const LandingPage = () => {
    const [noticeBoardName, setNoticeBoardName] = useState(null)
    const [noticeBoardCode, setNoticeBoardCode] = useState(null)
    const { userData, urlParams } = useContext(DataContext)
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