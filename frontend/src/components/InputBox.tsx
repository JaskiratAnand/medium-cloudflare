import { ChangeEvent } from "react";

interface InputBoxProps {
    type: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = ({type, placeholder, onChange}: InputBoxProps) => {
    return <div className="m-4">
        <label className="text-left p-1 font-medium">
            {placeholder}
        </label> <br />
        <input 
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg font-medium"
            type={type} placeholder={placeholder} 
            onChange={onChange} 
        />
    </div>
}

export default InputBox;