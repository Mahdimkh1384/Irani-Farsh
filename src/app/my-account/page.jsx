"use client"
import React, { useEffect, useState } from 'react'
import { FaUser, FaEnvelope, FaKey, FaPhone, } from 'react-icons/fa'
import { requiredValidator, minValidator, maxValidator, emailValidator } from '@/validators/rules'
import { useContext } from 'react';
import { UserContext } from '../../../Contexts/UserContext';
import { useForm } from "@/Components/hooks/useForm";
import toast from 'react-hot-toast';
import Input from '../(main)/auth/singup/input';
import { Try } from '@mui/icons-material';


export default function UserPanel() {

    const { userInfo, getUserInfo, token } = useContext(UserContext);

    const [formState, onInputHandler, resetForm] = useForm(
        {
            name: { value: "", isValid: false },
            family: { value: "", isValid: false },
            email: { value: "", isValid: false },
            password: { value: "", isValid: false },
            phone: { value: "", isValid: false },
        },
        false
    );
    const [loading, setLoading] = useState(false)
    const updateUserInfo = async () => {
        const inputs = formState.inputs;

        // فقط فیلدهایی که مقدار دارن و معتبر هستند
        const validData = Object.keys(inputs).reduce((acc, key) => {
            if (inputs[key].value && inputs[key].isValid) {
                if (key === "name") acc.firstName = inputs[key].value;
                if (key === "family") acc.lastName = inputs[key].value;
                if (key === "email") acc.email = inputs[key].value;
                if (key === "phone") acc.phone = inputs[key].value;
                if (key === "password") acc.password = inputs[key].value;
            }
            return acc;
        }, {});

        // بررسی اگر همه فیلدها خالی بودند
        const allEmpty = Object.keys(inputs).every(key => !inputs[key].value);

        if (Object.keys(validData).length > 0) {
            setLoading(true)

            const res = await fetch("https://api.iranifarsh.neofy.ir/users", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(validData)
            })

            const data = await res.json()

            if (data.success) {
                getUserInfo()

                // reset form
                resetForm({
                    name: { value: "", isValid: false },
                    family: { value: "", isValid: false },
                    email: { value: "", isValid: false },
                    phone: { value: "", isValid: false },
                    password: { value: "", isValid: false },
                });

                setLoading(false)
                toast.success("تغییرات با موفقیت ذخیره شد")
            }
        } else if (allEmpty) {
            toast.error("هیچ فیلدی پر نشده است.");
        } else {
            toast.error("لطفا فیلدهای پر شده را به درستی وارد کنید.");
        }
    };

    return (
        <>
            <div className='lg:mt-14 sm:mt-10'>
                <h2 className='text-2xl'>حساب کاربری</h2>
                <div className='flex flex-col lg:gap-y-5 sm:gap-y-2.5 lg:mt-10 sm:mt-7'>
                    <div className='flex lg:flex-row sm:flex-col sm:gap-2.5 lg:gap-5'>
                        <Input
                            id="name"
                            value={formState.inputs.name.value}
                            className="loginInput"
                            type="text"
                            placeholder="نام جدید"
                            element="input"
                            onInputHandler={onInputHandler}
                            validations={[
                                requiredValidator(),
                                minValidator(2),
                                maxValidator(10),
                            ]}
                            Icon={<FaUser />}
                        />
                        <Input
                            id="family"
                            value={formState.inputs.family.value}
                            className="loginInput"
                            type="text"
                            placeholder="نام خانوادگی جدید"
                            element="input"
                            onInputHandler={onInputHandler}
                            validations={[
                                requiredValidator(),
                                minValidator(2),
                                maxValidator(20),
                            ]}
                            Icon={<FaUser />}
                        />
                    </div>
                    <div className='flex lg:flex-row sm:flex-col sm:gap-2.5 lg:gap-5'>
                        <Input
                            id="email"
                            value={formState.inputs.email.value}
                            className="loginInput"
                            type="email"
                            placeholder="ایمیل جدید"
                            element="input"
                            onInputHandler={onInputHandler}
                            validations={[
                                requiredValidator(),
                                minValidator(10),
                                maxValidator(100),
                                emailValidator()
                            ]}
                            Icon={<FaEnvelope />}
                        />
                        <Input
                            id="phone"
                            value={formState.inputs.phone.value}
                            className="loginInput"
                            type="text"
                            placeholder="شماره تلفن جدید"
                            element="input"
                            validations={[requiredValidator(), minValidator(10), maxValidator(11)]}
                            onInputHandler={onInputHandler}
                            Icon={<FaPhone />}
                        />
                        <Input
                            id="password"
                            value={formState.inputs.password.value}
                            className="loginInput"
                            type="password"
                            placeholder="رمز عبور جدید"
                            element="input"
                            onInputHandler={onInputHandler}
                            validations={[
                                requiredValidator(),
                                minValidator(8),
                                maxValidator(20)
                            ]}
                            Icon={<FaKey />}
                        />
                    </div>
                    <div className='flex justify-end'>
                        <button
                            onClick={updateUserInfo}
                            className={"lg:w-[13%] sm:w-[100%] h-[40px] rounded-[12px] text-amber-50 font-[Rokh-light] font-bold transition-colors cursor-pointer bg-primary hover:bg-red-700"}
                        >
                            {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}


