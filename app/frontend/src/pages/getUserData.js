import axios from "axios";

async function getUserData(uid) {

    axios.get(`http://localhost:5000/api/user?uid=${uid}`)
        .then((response) => {
            console.log("Fetched UserData",response.data);
            return response.data;
        })
}

export default getUserData