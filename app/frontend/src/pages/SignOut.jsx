import { auth } from '../Firebase/firebase'
import { signOut } from 'firebase/auth'
import {Button} from '@mui/material'

const SignOutButton = ()=>{
    const signoutWithFirebase = () => {
        signOut(auth).then((re) => {
            console.log(re);
        }).catch((err) => {
            console.log(err);
        })

    }


    return(
        <Button variant="outlined" color="inherit" onClick={signoutWithFirebase} >SIGN OUT</Button>
    )

}
export default  SignOutButton