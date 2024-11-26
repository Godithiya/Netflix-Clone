import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword,
    getAuth, 
    signInWithEmailAndPassword, 
    signOut
  } from 'firebase/auth';
import { 
    addDoc,
    collection, 
    getFirestore 
  } from 'firebase/firestore';
import { toast } from "react-toastify";




const firebaseConfig = {
  apiKey: "AIzaSyCcOO_RFC1_4yPI-Sj7VyeY0FdeEqg_YMY",
  authDomain: "netflix-clone-46391.firebaseapp.com",
  projectId: "netflix-clone-46391",
  storageBucket: "netflix-clone-46391.firebasestorage.app",
  messagingSenderId: "843360862316",
  appId: "1:843360862316:web:1fe483a1c528e8124a5849"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    await addDoc(collection(db, 'user'), {
      uid : user.uid,
      name,
      authProvider : 'local',
      email
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
}

const login = async (email, password)=>{
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
}

const logout = () => {
  signOut(auth);
}

export {
  auth,
  db,
  signup,
  login,
  logout
}