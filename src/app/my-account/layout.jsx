import Header from "@/Components/UserPanel/Header/Header"
import SideBar from "@/Components/UserPanel/SideBar/SideBar"

export default function RootLayout({ children }) {
  return (
    <>
      <div className='lg:px-10 py-5 sm:px-5 flex  '>
        <SideBar />
        <div className="w-full lg:mr-100">
          <Header />
          {children}
        </div>
      </div>
    </>
  )
}
