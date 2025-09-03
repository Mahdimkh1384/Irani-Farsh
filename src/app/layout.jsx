import React from 'react'
import "./globals.css"

export default function RootLayout({ children }) {
    return (
        <html lang="en" dir="rtl">
            <body>
                {children}
            </body>
        </html>
    )
}
