
interface ButtonProps {
    text: string;
    onClick: () => void;
}

const Button = ({text, onClick}: ButtonProps) => {
    return <div className="m-4">
        <button 
            onClick={onClick}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white mt-2 p-2 rounded-lg focus:ring-4 focus:ring-gray-300">

            {text}
        </button>
    </div>
}

export default Button;