import React from 'react'
import Input from '../(main)/singup/input'
import { FaUser, FaEnvelope, FaKey, FaPhone, } from 'react-icons/fa'
import { requiredValidator, minValidator, maxValidator, emailValidator} from '@/validators/rules'

export default function UserPanel() {
    return (
        <>
            <div className='lg:mt-14 sm:mt-10'>
                <h2 className='text-2xl'>حساب کاربری</h2>
                <div className='flex flex-col lg:gap-y-5 sm:gap-y-2.5 *: mt-10'>
                    <div className='flex lg:flex-row sm:flex-col gap-2.5'>
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
                    </div>
                    <div className='flex lg:flex-row sm:flex-col gap-2.5'>
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
                            placeholder="رمز عبور"
                            element="input"
                            validations={[
                                requiredValidator(),
                                minValidator(8),
                                maxValidator(20)
                            ]}
                            Icon={<FaKey />}
                        />
                    </div>
                    <div className='flex justify-end'>
                        <button className='w-[150px] h-[40px] text-white bg-primary rounded-[10px] font-[Rokh-light] font-bold hover:cursor-pointer hover:bg-red-700 transition-colors' >تغییر اطلاعات</button>
                    </div>
                </div>
            </div>
        </>
    )
}
