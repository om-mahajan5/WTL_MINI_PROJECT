import SignIn from "./pages/SignIn";
import { auth } from "./Firebase/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { useState } from "react";
import { UserContext } from "./DataContext";
import DashBoard from "./pages/DashBoard";



function App() {
  const [userLoggedin, setUserLoggedin] = useState(false);
  const [userDetails, setUserDetails] = useState();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserDetails(user)
      return setUserLoggedin(true);
    }
    setUserLoggedin(false)
  })

  return (
    <div>
      {
        true ?
        // userLoggedin ?
          <UserContext.Provider value={{ userDetails, setUserDetails }} >
            <DashBoard />
          </UserContext.Provider>
          : <SignIn />
      }
    </div>
  );
}

export default App;
