"use client";
import React, { useState } from "react";
import Input from "./Input";

export default function PasswordForm() {
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");


    const repeatPasswordValidations = [
        (value) =>
            value === password || "رمز عبور و تکرار رمز عبور باید یکی باشند"
    ];

    return (
        <>
            <Input
                type="password"
                placeholder="رمز عبور"
                element="input"
                validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(20)
                ]}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Input
                type="password"
                placeholder="تکرار رمز عبور"
                element="input"
                validations={[
                    (value, { password }) =>
                        value === password || "رمز عبور و تکرار آن مطابقت ندارند",
                ]}
                onChange={(e) => setRepeatPassword(e.target.value)}
                extraParams={{ password }} 
            />


        </>
    );
}
