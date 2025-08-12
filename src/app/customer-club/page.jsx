import React from 'react'
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb'
import Input from '../singup/input'
import {FaEnvelope } from 'react-icons/fa'
import { requiredValidator, minValidator, maxValidator  , emailValidator} from '@/validators/rules'

export default function Customer() {
    return (
        <>
            <Breadcrumb links={[
                { id: 1, title: "باشگاه مشتریان", href: "customer-club" }
            ]} />
            <div className='lg:px-[108px] sm:px-3 flex flex-col justify-center items-center lg:mt-15 sm:mt-25 gap-y-10'>
                <h1 className='text-primary text-3xl border-b border-neutral-500 p-2.5'>باشگاه مشتریان</h1>
                <div className='lg:w-[450px] h-[250px] sm:w-full border border-primary rounded-[8px] flex flex-col items-center justify-between p-7'>
                    <p className='font-[Rokh-light] font-bold text-[17px] leading-8 text-center '>جهت عضویت و اطلاع از اخبار و تخفیفات ایمیل خود را وارد نمایید</p>
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
                    <button className='w-full h-[40px] text-white bg-primary rounded-[8px] font-[Rokh-light] font-bold hover:bg-red-700 hover:cursor-pointer'>ثبت</button>
                </div>
            </div>
        </>
    )
}
