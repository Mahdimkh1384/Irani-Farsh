import React from 'react'

export default function loading() {
    return (
        <div className="flex w-full h-[100vh] flex-col items-center justify-center">
            <span className="inline-block w-10 h-10 border-4 border-solid rounded-full border-primary border-t-transparent animate-spin"></span>
        </div>
    )
}
