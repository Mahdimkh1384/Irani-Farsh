"use client"
import { UserContext } from "../../../Contexts/UserContext";
import Header from "@/Components/UserPanel/Header/Header"
import SideBar from "@/Components/UserPanel/SideBar/SideBar"
import { getToken, logout } from "@/utils/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {

  const router = useRouter();
  const [userInfo, setUserInfo] = useState([])
  const [authChecked, setAuthChecked] = useState(false)
  const token = getToken()

  const getUserInfo = async () => {
    const currentToken = getToken();
    if (!currentToken) {
      router.replace('/login')
      return;
    }

    const res = await fetch("https://api.iranifarsh.neofy.ir/users/info", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${currentToken}`,
      }
    })

    if (res.status === 401 || res.status === 403) {
      logout();
      document.cookie = "sajy=; path=/; max-age=0";
      router.replace('/login')
      return;
    }

    const data = await res.json()
    setUserInfo(data.result)
  }

  useEffect(() => {
    const currentToken = getToken();
    if (!currentToken) {
      router.replace('/login')
      return;
    }
    getUserInfo().finally(() => setAuthChecked(true));
  }, [])

  if (!authChecked) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ userInfo, getUserInfo, token }}>
      <div className='lg:px-10 py-5 sm:px-5 flex'>
        <SideBar />
        <div className="w-full lg:mr-[28%]">
          <Header />
          {children}
        </div>
      </div>
    </UserContext.Provider>
  )
}
