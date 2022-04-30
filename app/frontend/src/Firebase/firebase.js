import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyAQvlQoM0mG34sb2O7AxCCU6nnA9Odgjzk",
    authDomain: "authtest-42bfe.firebaseapp.com",
    projectId: "authtest-42bfe",
    storageBucket: "authtest-42bfe.appspot.com",
    messagingSenderId: "581230428666",
    appId: "1:581230428666:web:36b5b7e8432631302b2443",
    measurementId: "G-L55Z9WPN3E"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


