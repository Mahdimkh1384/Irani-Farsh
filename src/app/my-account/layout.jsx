"use client"
import { UserContext } from "../../../Contexts/UserContext";
import Header from "@/Components/UserPanel/Header/Header"
import SideBar from "@/Components/UserPanel/SideBar/SideBar"
import { getToken } from "@/utils/auth";
import { useEffect, useState } from "react";


export default function RootLayout({ children }) {

  const [userInfo, setUserInfo] = useState([])

  const token = getToken()

  const getUserInfo = async () => {
    const res = await fetch("https://backend.sajlab.ir/api/users/info", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })

    const data = await res.json()
    

    setUserInfo(data.result)
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <UserContext.Provider value={{ userInfo, getUserInfo, token }}>
      <div className='lg:px-10 py-5 sm:px-5 flex'>
        <SideBar />
        <div className="w-full lg:mr-100">
          <Header />
          {children}
        </div>
      </div>
    </UserContext.Provider>
  )
}
