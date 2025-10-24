import NavBar from "@/Components/NavBar/NavBar";
import Footer from "@/Components/Footer/Footer";
import { Toaster } from 'react-hot-toast';


export default function RootLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <Toaster  position="top-left" reverseOrder={false} />
      <Footer />
    </>
  );
}
