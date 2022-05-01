import axios from "axios"

const joinNoticeBoard = (uid, nbid) => {
    axios.post(
        "http://localhost:5000/api/join-noticeboard",
        {
            uid: uid,
            nbid: nbid
        }
    )
}

export default joinNoticeBoard