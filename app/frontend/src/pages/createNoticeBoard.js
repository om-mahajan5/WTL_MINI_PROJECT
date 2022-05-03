import axios from "axios";
import getUserData from "./getUserData";
import hostUrl from './utils/hostUrl'
function createNoticeBoard(uid, name) {
    axios.post(
        `${hostUrl}/api/create-noticeboard`,
        {
            uid: uid,
            name: name
        }
    ).then((response) => {
        console.log(response.data);
        getUserData(uid)
        return response.data
    }
    )
}

export default createNoticeBoard