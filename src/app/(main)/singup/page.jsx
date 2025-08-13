import React from 'react'
import Image from 'next/image'
import Input from './input'
import { FaUser, FaEnvelope, FaKey, FaPhone, } from 'react-icons/fa'
import { requiredValidator, minValidator, maxValidator, emailValidator} from '@/validators/rules'
import Link from 'next/link'

export default function Login() {
    return (
        <>
            <div className="flex flex-col md:flex-row justify-center items-center gap-x-20 lg:mt-15 sm:mt-5
                bg-no-repeat bg-center lg:bg-cover sm:bg-bottom
                bg-[url('/farsh.png')] md:bg-none
                ">
                <div className='lg:w-[30%] flex flex-col gap-10 justify-center items-center lg:mt-[0px] sm:w-[100%] sm:gap-2 sm:mt-[200px] sm:bg-white sm:rounded-t-[20px] sm:pt-[20px]'>
                    <h1 className='lg:text-4xl text-primary sm:text-4xl mb-3 lg:inline sm:hidden'>ایرانی فرش</h1>
                    <h4 className='lg:text-2xl text-primary sm:text-2xl'>ثبت نام</h4>
                    <form action="" className='lg:w-[100%] flex flex-col gap-10 items-center justify-center sm:w-[90%] mt-6'>
                        <Input
                            className="loginInput"
                            type="text"
                            placeholder="نام"
                            element="input"
                            validations={[
                                requiredValidator(),
                                minValidator(2),
                                maxValidator(10),
                            ]}
                            Icon={<FaUser />}
                        />
                        <Input
                            className="loginInput"
                            type="text"
                            placeholder="نام خانوادگی"
                            element="input"
                            validations={[
                                requiredValidator(),
                                minValidator(2),
                                maxValidator(20),
                            ]}
                            Icon={<FaUser />}
                        />
                        <Input
                            className="loginInput"
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
                            className="loginInput"
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
                        <button className='lg:w-[100%] h-[56px] rounded-[12px] bg-primary hover:bg-red-700 text-amber-50 cursor-pointer sm:w-[100%] font-[Rokh-light] font-bold'>
                            ثبت نام
                        </button>
                        <p className='text-xl font-[Rokh-light] font-bold '>
                            حساب کاربری دارید؟ <Link href="/login" className='text-primary hover:text-red-700'>ورود کنید</Link>
                        </p>
                    </form>
                </div>
                <div className=" lg:inline sm:hidden">
                    <Image src="/farsh.png" width={500} height={902} alt='irani farsh' />
                </div>
            </div>
        </>
    )
}
