import axios from "axios";
import getUserData from "./getUserData";

function createNoticeBoard(uid, name) {
    axios.post(
        "http://localhost:5000/api/create-noticeboard",
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