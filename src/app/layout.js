import "./globals.css"
import NavBar from "@/Components/NavBar/NavBar";
import Footer from "@/Components/Footer/Footer";


export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <body>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
