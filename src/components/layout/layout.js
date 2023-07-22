import { useEffect, useState } from "react";
import { getUserInfo, logout } from "@/models/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebaseInit";

import { Navbar } from '../../common/Navbar/Navbar'
import { Footer } from '../../common/Footer/Footer'


export default function Layout({ children }) {
    const initUser = { uname: "def", email: "", priv: "", uid: "" };
    const [userInfo, setInfUserInfo] = useState(initUser);
    const [user, loading] = useAuthState(auth);
    const [loading2, setLoading] = useState(false);

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
    return (
        <>
            <Navbar userData={userInfo} />
            <main>{children}</main>
            <Footer />
        </>
    )
}