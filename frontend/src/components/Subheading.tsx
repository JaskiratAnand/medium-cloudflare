import { Link } from "react-router-dom";

interface SubheadingProps {
    text: string;
    link: string;
    linkText: string;
}

const Subheading = ({text, link, linkText}: SubheadingProps) => {
    return <div className="my-2 text-center text-xl font-medium text-gray-600">
        {text} <Link to={link} className="underline hover:text-blue-500">{linkText}</Link>
    </div>
}

export default Subheading;