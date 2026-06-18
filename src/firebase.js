
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";



const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);



const signup = async (name,email,password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid : user.uid,
            name,
            authProvider:"local",
            email,
        })
    }
    // } catch (error) {
    //   console.log(error); 
    //   toast.error(error.code);
    // alert(error)
    // }
    catch (error) {
        // Log the complete error for developer debugging
        console.error(error); 

        // Map abstract technical codes into crisp UI feedback strings
        let friendlyMessage = "An unexpected registration error occurred.";

        switch (error.code) {
            case "auth/email-already-in-use":
                friendlyMessage = "This email address is already registered.";
                break;
            case "auth/invalid-email":
                friendlyMessage = "Please enter a valid email address.";
                break;
            case "auth/weak-password":
                friendlyMessage = "Your password must be at least 6 characters long.";
                break;
            case "auth/operation-not-allowed":
                friendlyMessage = "Email and Password authentication is disabled in settings.";
                break;
        }

        // Single elegant UI response (Removed the annoying browser alert)
        toast.error(friendlyMessage);
    }
    
}


const login = async (email, password) => {
    try {
        // FIXED: Added await so the catch block actually intercepts failures
        await signInWithEmailAndPassword(auth, email, password); 
    } catch (error) {
        console.error(error); 

        // Map Firebase login-specific error codes into UI feedback
        let friendlyMessage = "Failed to sign in. Please try again.";

        switch (error.code) {
            case "auth/invalid-credential":
            case "auth/user-not-found":
            case "auth/wrong-password":
                // Firebase modern SDK combines these into one code for security
                friendlyMessage = "Incorrect email or password.";
                break;
            case "auth/invalid-email":
                friendlyMessage = "Please enter a valid email address.";
                break;
            case "auth/user-disabled":
                friendlyMessage = "This user account has been disabled.";
                break;
            case "auth/too-many-requests":
                friendlyMessage = "Too many failed attempts. Account temporarily locked.";
                break;
        }

        // Trigger the elegant UI alert notification
        toast.error(friendlyMessage);
    }
}


const logout = ()=>{
    signOut(auth)
}

export {auth,db,login,signup,logout};