import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { useNavigate, useLocation } from "react-router-dom";
// @ts-ignore
import { CreateBlog } from "@jaskirat01/medium-project";



const AppBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const showButton = location.pathname !== "/create";

    return (
        <div className="w-full flex flex-row justify-between px-10 pt-3 pb-5 border-b-2 border-gray-100">
            <Link to="/blogs">
                <div className="flex flex-row gap-2 text-2xl font-semibold cursor-pointer">
                    <div className="font-serif">Medium</div>
                </div>
            </Link>
            <div className="flex flex-row gap-5">
                {showButton && (
                    <button 
                        onClick={() => { navigate('/create') }}
                        className="w-full bg-green-700 hover:bg-gray-900 text-white px-3 py-1.5 rounded-full focus:ring-2 focus:ring-gray-300">
                        Create new Blog
                    </button>
                )}
                <div>
                    <Avatar name={localStorage.getItem('email') || "user"} />
                </div>
            </div>
        </div>
    );
}

export default AppBar;