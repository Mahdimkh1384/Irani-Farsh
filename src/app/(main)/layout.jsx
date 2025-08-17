import NavBar from "@/Components/NavBar/NavBar";
import Footer from "@/Components/Footer/Footer";


export default function RootLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
