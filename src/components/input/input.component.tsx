import { Order } from "@components/claim/order.schema";
import React, { HtmlHTMLAttributes } from "react";
import { UseFormRegisterReturn, UseFormRegister } from "react-hook-form";

interface InputProps {
    errors?: string;
    label: string;
    inputClassName?: string;
    containerClassName?: string;
    register?: UseFormRegisterReturn;
}

const Input: React.FC<InputProps & HtmlHTMLAttributes<HTMLInputElement>> = (
    props,
) => {
    const {
        errors,
        label,
        inputClassName,
        containerClassName,
        register,
        ...other
    } = props;
    return (
        <div className={containerClassName}>
            <label className="block mb-2 text-lg font-medium text-white">
                {label}
            </label>
            <input
                type="text"
                className={`bg-brand-black border-gray-500 text-base rounded-md focus:ring-brand-orange focus:border-brand-orange block w-full p-4  placeholder-gray-500 text-white ${inputClassName}}`}
                {...register}
                {...other}
            />
            {errors && <p className="text-red-500">{errors}</p>}
        </div>
    );
};

export default Input;
