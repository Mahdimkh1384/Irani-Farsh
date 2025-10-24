"use client"
import React , {useState} from 'react'
import { FaEnvelope } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import regex from "./../../validators/regex";

export default function CustomerClubInput() {

    const [input, setInput] = useState('')
    const [isInputValid, setIsInputValid] = useState(false)

    const changeInputHandler = (value) => {
        setInput(value)

        const isEmailValid = regex.testEmail(value)
        if (isEmailValid) {
            setIsInputValid(true)
        } else {
            setIsInputValid(false)
        }
    }

    const registrationEmail = () => {

        if (!input) {
            toast.error("لطفا ایمیل را وارد کنید", {
                style: {
                    fontFamily: "Rokh-light",
                    justifyContent: "center",
                    position: "top-right"
                },
                className: "toast"
            })
        } else {
            if (isInputValid) {
                setInput('')
                setIsInputValid(false)
                toast.success("ایمیل شما با موفقیت ثبت شد", {
                    style: {
                        fontFamily: "Rokh-light",
                        justifyContent: "center"
                    },
                    className: "toast"
                })
            } else {
                toast.error("ایمیل معتبر نمی باشد", {
                    style: {
                        fontFamily: "Rokh-light",
                        justifyContent: "center"
                    },
                    className: "toast"
                })
            }
        }
    }

    return (
        <>
            <div className='lg:w-[450px] h-[250px] sm:w-full border border-primary rounded-[8px] flex flex-col items-center justify-between p-7'>
                <p className='font-[Rokh-light] font-bold text-[17px] leading-8 text-center '>جهت عضویت و اطلاع از اخبار و تخفیفات ایمیل خود را وارد نمایید</p>
                <div className=' relative w-full group'>
                    <FaEnvelope className={`absolute top-[20px] right-1.5 text-neutral-500 ${isInputValid ? " group-focus-within:text-green-500" : " group-focus-within:text-primary"}`} />
                    <input type="text" value={input} className={`w-full h-10 rounded-[8px] border font-[Rokh-light] border-neutral-400 p-7 outline-0 ${isInputValid ? " focus:border-green-500 focus:placeholder:text-green-500" : " focus:border-primary focus:placeholder:text-primary"}`} placeholder='ایمیل' onChange={e => changeInputHandler(e.target.value)} />
                </div>
                <button onClick={registrationEmail} className='w-full h-[40px] text-white bg-primary rounded-[8px] font-[Rokh-light] font-bold hover:bg-red-700 hover:cursor-pointer'>ثبت</button>
            </div>
            <ToastContainer position="top-right" />
        </>
    )
}
