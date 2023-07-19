// import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserInfo, logout } from "@/models/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebaseInit";

// Components
import {HeroSection} from "../common/HeroSection/HeroSection"

const Index = () => {
  const router = useRouter();
  const initUser = { uname: "def", email: "", priv: "", uid: "" };
  const [userInfo, setInfUserInfo] = useState(initUser);
  const [user, loading] = useAuthState(auth);
  const [loading2, setLoading] = useState(false);
  console.log("auth from idx:", auth);
  console.log("user from idx:", user);
  useEffect(() => {
    async function upd() {
      setLoading(true);
      if (!loading && user) {
        setInfUserInfo(await getUserInfo(user.uid));
      }
      else {
        setInfUserInfo(initUser);
      }
      setLoading(false);
    }
    upd();
  }, [user]);
  if (loading || loading2) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
  // if(userInfo.uid != "") {
  //   return (
  //     <div>
  //       {/* <h1>hi</h1>
  //       <form method="GET" action="/about">  
  //           <button type="submit">About</button>
  //       </form>
  //       <form method="GET" onSubmit={logout}>  
  //           <button type="submit">Logout</button>
  //       </form> */}
  //     </div>
  //   )
  // }
  // return (
  //   <div>
  //       {/* <h1>hi</h1>
  //       <div>
  //           <form method="GET" action="/login">  
  //               <button type="submit">Login</button>
  //           </form>
  //           <form method="GET" action="/register">  
  //               <button type="submit">Register</button>
  //           </form>
  //       </div> */}
  //   </div>
  // );
  return (
    <>
      <HeroSection 
        isButton={true} 
        title={"Play, learn, and get reward.."} 
        description={"Enhance your learning experience with teacher by gamify your test into RPG game to fight boss and compete to get the MYSTERIOUS reward."} 
        />
    </>
  )
};

export default Index;