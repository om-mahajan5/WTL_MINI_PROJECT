import axios from "axios";
import hostUrl from './utils/hostUrl'

async function getUserData(uid) {

    axios.get(`${hostUrl}/api/user?uid=${uid}`)
        .then((response) => {
            console.log("Fetched UserData",response.data);
            return response.data;
        })
}

export default getUserData