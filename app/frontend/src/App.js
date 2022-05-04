import SignIn from "./pages/SignIn";
import { auth } from "./Firebase/firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from "react";
import { UserContext } from "./DataContext";
import DashBoard from "./pages/DashBoard";



function App() {
  const [userDetails, setUserDetails] = useState();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserDetails(user)
    }else{
      setUserDetails(null)
    }
  })

  return (
    <div style={{ margin: "0" }}>
      {
        // false ?
        // true ?
        userDetails ?
          <UserContext.Provider value={{ userDetails, setUserDetails }} >
            <DashBoard />
          </UserContext.Provider>
          : <SignIn />
      }
    </div>
  );
}

export default App;
