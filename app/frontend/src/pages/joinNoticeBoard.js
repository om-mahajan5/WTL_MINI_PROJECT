import axios from "axios"
import hostUrl from './utils/hostUrl'

const joinNoticeBoard = (uid, nbid) => {
    axios.post(
        `${hostUrl}/api/join-noticeboard`,
        {
            uid: uid,
            nbid: nbid
        }
    )
}

export default joinNoticeBoard