import React from 'react'
import "./globals.css"
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }) {
    return (
        <html lang="en" dir="rtl">
            <body>
                {children}
                <Toaster position="top-left" reverseOrder={false} />
            </body>
        </html>
    )
}
