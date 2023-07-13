import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserInfo, logout } from "@/models/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebaseInit";

const Home: NextPage = () => {
  const router = useRouter();
  const initUser = {uname: "def", email: "", priv: "", uid: ""};
  const [userInfo, setInfUserInfo] = useState(initUser);
  const [user, loading] = useAuthState(auth);
  console.log("auth from idx:", auth);
  console.log("user from idx:", user);
  useEffect(() => {
    async function upd() {
      if(!loading && user) {
        setInfUserInfo(await getUserInfo(user.uid));
      }
      else {
        setInfUserInfo(initUser);
      }
    }
    upd();
  }, [user]);
  return (
    <div>
        <h1>hi</h1>
        {userInfo.uid != "" ? (
            <div>
            <form method="GET" action="/about">  
                <button type="submit">About</button>
            </form>
            <form method="GET" onSubmit={logout}>  
                <button type="submit">Logout</button>
            </form>
        </div>
        ) : (
            <div>
            <form method="GET" action="/login">  
                <button type="submit">Login</button>
            </form>
            <form method="GET" action="/register">  
                <button type="submit">Register</button>
            </form>
        </div>
        )}
    </div>
  );
};

export default Home;