"use client";
import React, { useEffect, useReducer } from "react";
import validator from "@/validators/validator";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: validator(action.value, action.validations, action.extraParams),
      };
    default:
      return state;
  }
};

export default function Input({
  id,
  type = "text",
  placeholder,
  element = "input",
  className = "",
  Icon,
  validations = [],
  onChange,
  onInputHandler, // 👈 اضافه شد
  extraParams = {},
}) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });

  const { value, isValid } = inputState;

  useEffect(() => {
    if (onInputHandler) {
      onInputHandler(id, value, isValid);
    }
  }, [value, id, isValid, onInputHandler]);

  const onChangeHandler = (event) => {
    const value = event.target.value;
    dispatch({ type: "CHANGE", value, validations, extraParams });
    if (onChange) onChange(event);
  };

  return (
    <div className="relative w-full flex items-center">
      {element === "input" ? (
        <>
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            dir="rtl"
            onChange={onChangeHandler}
            value={inputState.value}
            className={`peer bg-white/30 backdrop-blur-[4px] 
              ${
                inputState.isValid
                  ? "border-green-500 border-2"
                  : inputState.value.length > 0
                  ? "border-red-500 border-2"
                  : "border-[#9CA3AF]"
              } 
              focus:border-[#CB1B1B] outline-none pr-10 lg:pr-8 ${className}`}
          />
          {Icon && (
            <div
              className="absolute right-3 lg:right-1.5 top-1/2 -translate-y-1/2 
                         text-[#9CA3AF] peer-focus:text-[#CB1B1B] 
                         transition-colors duration-200 w-5 h-5 pointer-events-none"
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
          onChange={onChangeHandler}
          value={inputState.value}
          className={`peer bg-white/30 backdrop-blur-[4px] border border-[#9CA3AF] 
            focus:border-[#CB1B1B] outline-none ${className}`}
        />
      )}
    </div>
  );
}
