"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import { FaKey, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa'
import { requiredValidator, minValidator, maxValidator, emailValidator } from '@/validators/rules'
import Link from 'next/link'
import { useForm } from '@/Components/hooks/useForm'
import { saveAuthData } from '@/utils/auth'
import toast from 'react-hot-toast';
import Input from '../auth/singup/input';


export default function Login() {
    const [isPasswordShow, setIsPasswordShow] = useState(false)
    const [formState, onInputHandler] = useForm({
        email: { value: '', isValid: false },
        password: { value: '', isValid: false }
    }, false);

    const loginSubmitHandler = async (e) => {
        e.preventDefault();

        const loginData = {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
        };

        try {
            const res = await fetch("https://backend.sajlab.ir/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData)
            });

            const data = await res.json();
            console.log("پاسخ API لاگین:", data);

            if (res.ok && data.success && data.sajy) {
                saveAuthData(data.sajy, data.user);
                document.cookie = `sajy=${data.sajy}; path=/;sameSite=lax`;
                toast.success('ورود با موفقیت انجام شد 🎉');
                setTimeout(() => {
                    window.location.href = "/";
                }, 1500);
            } else {
                toast.error("ایمیل یا رمز عبور اشتباه است.");
            }
        } catch (err) {
            console.error("❌ خطا در ارتباط با سرور:", err);
            toast.error("مشکل در اتصال به سرور!");
        }

    };

    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-x-20 lg:mt-15 sm:mt-5
                        bg-no-repeat bg-center lg:bg-cover sm:bg-bottom
                        bg-[url('/farsh.png')] md:bg-none">
            <div className='lg:w-[30%] flex flex-col gap-10 justify-center items-center lg:mt-[0px] sm:w-[100%] sm:gap-2 sm:mt-[200px] sm:bg-white sm:rounded-t-[20px] sm:pt-[20px]'>
                <h1 className='lg:text-4xl text-primary mb-3 lg:inline sm:hidden'>ایرانی فرش</h1>
                <h4 className='lg:text-2xl text-primary sm:text-2xl'>ورود</h4>

                <form onSubmit={loginSubmitHandler} className="lg:w-[100%] flex flex-col gap-10 items-center justify-center sm:w-[90%] mt-6">
                    <Input
                        className="loginInput"
                        id="email"
                        value={formState.inputs.email.value}
                        type="email"
                        placeholder="ایمیل"
                        element="input"
                        validations={[requiredValidator(), minValidator(10), maxValidator(100), emailValidator()]}
                        onInputHandler={onInputHandler}
                        Icon={<FaEnvelope />}
                    />
                    <div className='relative w-full flex items-center'>
                        <Input
                            className="loginInput"
                            id="password"
                            value={formState.inputs.password.value}
                            type={isPasswordShow ? "text" : "password"}
                            placeholder="رمز عبور"
                            element="input"
                            validations={[requiredValidator(), minValidator(8), maxValidator(20)]}
                            onInputHandler={onInputHandler}
                            Icon={<FaKey />}
                        />
                        <div onClick={() => {setIsPasswordShow (!isPasswordShow)}} className="absolute left-3 cursor-pointer transition-all duration-150 active:scale-95 text-xl text-neutral-600"> 
                            {isPasswordShow ? <FaEye/> : <FaEyeSlash />}
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={!formState.isFormValid}
                        className={`lg:w-[100%] h-[56px] rounded-[12px] text-amber-50 sm:w-[100%] font-[Rokh-light] font-bold transition-colors ${formState.isFormValid ? "bg-primary hover:bg-red-700 cursor-pointer" : "bg-gray-400 cursor-not-allowed"
                            }`}
                    >
                        ورود
                    </button>

                    <p className='text-xl font-[Rokh-light] font-bold'>
                        ثبت نام نکرده اید؟{" "}
                        <Link href="/auth/singup" className='text-primary hover:text-red-700'>همین حالا عضو شوید</Link>
                    </p>
                </form>
            </div>

            <div className="lg:inline sm:hidden">
                <Image src="/farsh.png" width={500} height={902} alt='irani farsh' />
            </div>
        </div>
    )
}
