import React from 'react'
import Image from 'next/image'
import Input from '../singup/input'
import { FaUser, FaEnvelope, FaKey, FaPhone, } from 'react-icons/fa'
import { requiredValidator, minValidator, maxValidator, emailValidator, alphaBeticValidator, alphabeticPatternValidator } from '@/validators/rules'
import Link from 'next/link'

export default function Login() {
    return (
        <>
            <div className="flex flex-col md:flex-row justify-center items-center gap-10 pt-20
                bg-no-repeat bg-center bg-cover
                bg-[url('/farsh.png')] md:bg-none
                ">
                <div className=" lg:inline sm:hidden">
                    <Image src="/farsh.png" width={500} height={902} alt='irani farsh' />
                </div>
                <div className='lg:w-[30%] flex flex-col gap-10 justify-center items-center lg:mt-[0px] sm:w-[100%] sm:gap-2 sm:mt-[200px] sm:bg-white sm:rounded-t-[20px] sm:pt-[20px]'>
                    <h1 className='lg:text-6xl text-primary sm:text-4xl'>ایرانی فرش</h1>
                    <h4 className='lg:text-2xl text-primary sm:text-2xl'>ثبت نام</h4>
                    <form action="" className='lg:w-[100%] flex flex-col gap-10 items-center justify-center sm:w-[90%]'>
                        <Input
                            className="lg:w-[100%] h-[56px] rounded-[12px] opacity-100 rotate-0 backdrop-blur-[4px] 
                            bg-white/30 border border-[#9CA3AF] placeholder-[#9CA3AF] text-right 
                            focus:border-[#CB1B1B] focus:placeholder-[#CB1B1B] outline-none sm:w-[100%]"
                            type="email"
                            placeholder="ایمیل"
                            element="input"
                            validations={[
                                requiredValidator(),
                                minValidator(10),
                                maxValidator(100),
                                emailValidator()
                            ]}
                            Icon={<FaEnvelope />}
                        />
                        <Input
                            className="lg:w-[100%] h-[56px] rounded-[12px] opacity-100 rotate-0 backdrop-blur-[4px] 
                            bg-white/30 border border-[#9CA3AF] placeholder-[#9CA3AF] text-right pr-10 
                            focus:border-[#CB1B1B] focus:placeholder-[#CB1B1B] outline-none sm:w-[100%]"
                            type="password"
                            placeholder="ایجاد رمز عبور"
                            element="input"
                            validations={[
                                requiredValidator(),
                                minValidator(8),
                                maxValidator(20)
                            ]}
                            Icon={<FaKey />}
                        />
                        <button className='lg:w-[100%] h-[56px] rounded-[12px] bg-primary text-amber-50 cursor-pointer sm:w-[100%]'>
                            ثبت نام
                        </button>
                        <p className='text-xl'>
                            ثبت نام نکرده اید ؟همین حالا<Link href="/singup" className='text-primary'>عضو شوید </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}
