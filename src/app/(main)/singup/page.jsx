"use client";
import React from "react";
import Image from "next/image";
import Input from "./input";
import { FaUser, FaEnvelope, FaKey, FaPhone } from "react-icons/fa";
import Link from "next/link";
import {
    requiredValidator,
    minValidator,
    maxValidator,
    emailValidator,
} from "@/validators/rules";
import { useForm } from "@/Components/hooks/useForm";
import { saveAuthData } from "@/utils/auth";
import toast from 'react-hot-toast';

export default function Register() {
    const [formState, onInputHandler] = useForm(
        {
            name: { value: "", isValid: false },
            family: { value: "", isValid: false },
            email: { value: "", isValid: false },
            password: { value: "", isValid: false },
            phone: { value: "", isValid: false },
        },
        false
    );

    const registerSubmitHandler = async (e) => {
        e.preventDefault();

        const userData = {
            firstName: formState.inputs.name.value,
            lastName: formState.inputs.family.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            phone: formState.inputs.phone.value,
        };

        try {
            const res = await fetch("https://backend.sajlab.ir/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const data = await res.json();
            console.log("📦 پاسخ سرور:", data);

            if (res.ok && data.status === "success" && data.sajy) {
                saveAuthData(data.sajy, data.user);
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
        <>
            <div className="flex flex-col md:flex-row justify-center items-center gap-x-20 bg-no-repeat bg-center lg:bg-cover sm:bg-bottom bg-[url('/farsh.png')] md:bg-none lg:mt-15 sm:mt-5">
                <div className="lg:w-[30%] flex flex-col gap-10 justify-center items-center sm:w-[100%] sm:gap-2 sm:bg-white sm:rounded-t-[20px] sm:pt-[20px]">
                    <h1 className="lg:text-4xl text-primary sm:text-4xl mb-3">ایرانی فرش</h1>
                    <h4 className="lg:text-2xl text-primary sm:text-2xl">ثبت نام</h4>

                    <form
                        onSubmit={registerSubmitHandler}
                        className="lg:w-[100%] flex flex-col gap-10 items-center justify-center sm:w-[90%] mt-6"
                    >
                        <Input
                            id="name"
                            className="loginInput"
                            type="text"
                            placeholder="نام"
                            element="input"
                            validations={[requiredValidator(), minValidator(2), maxValidator(20)]}
                            onInputHandler={onInputHandler}
                            Icon={<FaUser />}
                        />
                        <Input
                            id="family"
                            className="loginInput"
                            type="text"
                            placeholder="نام خانوادگی"
                            element="input"
                            validations={[requiredValidator(), minValidator(2), maxValidator(20)]}
                            onInputHandler={onInputHandler}
                            Icon={<FaUser />}
                        />
                        <Input
                            id="email"
                            className="loginInput"
                            type="email"
                            placeholder="ایمیل"
                            element="input"
                            validations={[requiredValidator(), emailValidator()]}
                            onInputHandler={onInputHandler}
                            Icon={<FaEnvelope />}
                        />
                        <Input
                            id="phone"
                            className="loginInput"
                            type="text"
                            placeholder="شماره تلفن"
                            element="input"
                            validations={[requiredValidator(), minValidator(10), maxValidator(11)]}
                            onInputHandler={onInputHandler}
                            Icon={<FaPhone />}
                        />
                        <Input
                            id="password"
                            className="loginInput"
                            type="password"
                            placeholder="رمز عبور"
                            element="input"
                            validations={[requiredValidator(), minValidator(8), maxValidator(20)]}
                            onInputHandler={onInputHandler}
                            Icon={<FaKey />}
                        />

                        <button
                            type="submit"
                            disabled={!formState.isFormValid}
                            className={`lg:w-[100%] h-[56px] rounded-[12px] text-amber-50 font-[Rokh-light] font-bold transition-colors cursor-pointer ${formState.isFormValid
                                ? "bg-primary hover:bg-red-700"
                                : "bg-gray-400 cursor-not-allowed"
                                }`}
                        >
                            ثبت نام
                        </button>

                        <p className="text-xl font-[Rokh-light] font-bold">
                            حساب کاربری دارید؟{" "}
                            <Link href="/login" className="text-primary hover:text-red-700">
                                ورود کنید
                            </Link>
                        </p>
                    </form>
                </div>

                <div className="lg:inline sm:hidden">
                    <Image src="/farsh.png" width={500} height={902} alt="irani farsh" />
                </div>
            </div>
        </>
    );
}
