"use client";
import React, { useEffect, useState } from "react";
import validator from "@/validators/validator";

export default function Input({
  id,
  type = "text",
  placeholder,
  element = "input",
  className = "",
  Icon,
  validations = [],
  value = "",
  onInputHandler,
  extraParams = {},
}) {
  const [isValid, setIsValid] = useState(false);

  // هر بار value تغییر کند → اعتبارسنجی کنیم
  useEffect(() => {
    const newIsValid = validator(value, validations, extraParams);
    setIsValid(newIsValid);

    if (onInputHandler) {
      onInputHandler(id, value, newIsValid);
    }
  }, [value]);

  const onChangeHandler = (e) => {
    const newValue = e.target.value;

    const newIsValid = validator(newValue, validations, extraParams);
    setIsValid(newIsValid);

    if (onInputHandler) {
      onInputHandler(id, newValue, newIsValid);
    }
  };

  const borderStyle =
    isValid
      ? "border-green-500 border-2"
      : value.length > 0
      ? "border-red-500 border-2"
      : "border-[#9CA3AF]";

  return (
    <div className="relative w-full flex items-center">
      {element === "input" ? (
        <>
          <input
            id={id}
            type={type}
            value={value}
            onChange={onChangeHandler}
            placeholder={placeholder}
            dir="rtl"
            className={`peer bg-white/30 backdrop-blur-[4px] 
              ${borderStyle}
              focus:border-[#CB1B1B] outline-none pr-10 lg:pr-8 ${className}`}
          />

          {Icon && (
            <div
              className="absolute right-3 lg:right-1.5 top-1/2 -translate-y-1/2 
                text-[#9CA3AF] peer-focus:text-[#CB1B1B] transition-colors duration-200
                w-5 h-5 pointer-events-none"
            >
              {Icon}
            </div>
          )}
        </>
      ) : (
        <textarea
          id={id}
          placeholder={placeholder}
          dir="rtl"
          value={value}
          onChange={onChangeHandler}
          className={`peer bg-white/30 backdrop-blur-[4px] 
            ${borderStyle}
            focus:border-[#CB1B1B] outline-none ${className}`}
        />
      )}
    </div>
  );
}
