import { auth, fs } from "../config/firebaseInit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const getUserInfo = (uid) => {
  return new Promise(async (resolve) => {
    if (uid != "") {
      let lmao = (await getDoc(doc(fs, "user_data", uid))).data();
      console.log("got it", lmao);
      resolve(lmao);
    } else {
      resolve({ uname: "def", email: "", priv: "", uid: "" });
    }
  });
};

export const setUserInfo = (userInfo) => {
  return new Promise(async (resolve) => {
    if (userInfo.uid) {
      await setDoc(doc(fs, "user_data", userInfo.uid), userInfo);
      resolve(true);
    } else {
      resolve(false);
    }
  });
};

export async function register(email, password, userInfo) {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCred) => {
      // Signed in
      const user = userCred.user;
      console.log("Reg: User created, logged in: ", user.uid);
      await setUserInfo({
        uname: userInfo.uname,
        email: email,
        priv: "0",
        uid: user.uid,
      });
    })
    .catch((error) => {
      console.log("Reg: Something went wrong.");
      console.log(error.message);
      alert("Reg: Error occured!" + error.message);
    });
}

export async function login(email, password) {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCred) => {
      console.log("Login: User logged in: ", userCred.user.uid);
      localStorage.setItem("uid", userCred.user.uid);
    })
    .catch((error) => {
      console.log("Login: Something went wrong.");
      console.log(error.message);
      alert("Login: Error occured!" + error.message);
    });
}

export async function logout() {
  return signOut(auth)
    .then(() => {
      // Signed out
      console.log("Logout: Signout successful.");
      localStorage.removeItem("uid");
    })
    .catch((error) => {
      console.log("Logout: Something went wrong.");
      console.log(error.message);
    });
}
