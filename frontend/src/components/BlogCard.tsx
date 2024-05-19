import { Link } from "react-router-dom";
import Avatar from "./Avatar";

interface BlogCardProps {
    id: string;
    authorName: string;
    date: string;
    title: string;
    content: string;
    img: string;
}

const dateToLocaleString = (date: string) => {
    const localeDate = new Date(date);
    return localeDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

const BlogCard = ({
    id,
    authorName,
    date,
    title,
    content,
    img
}: BlogCardProps) => {

    return <div className="m-2 py-4 px-5 border-b-2 border-gray-200">
        <div className="relative flex flex-start gap-3">
            <Avatar name={authorName} />
            <div className="font-medium flex justify-center flex-col">{authorName}</div> 
            <div className="text-gray-500 flex justify-center flex-col"> &#9679; {dateToLocaleString(date)}</div>
        </div>

        
        <div className="grid grid-cols-10 gap-2">
            <div className="col-span-7 pr-2">
                <Link to={`/blog/${id}`}>
                    <div className="text-xl text-justify font-bold pt-2 line-clamp-2"> {title} </div>
                    <div className="font-serif pt-2 text-justify text-lg line-clamp-2 foont-serif">{content}</div>
                </Link>
            </div>
            <div className="col-span-3 pl-2 flex justify-center">
                <img src={img} alt="blogImg" className="w-full  object-cover rounded-lg mt-2" />
            </div>
        </div>
     
        <div className="text-gray-500">{Math.floor(content.length/210) + " min read"}</div>
    </div>
}

export default BlogCard;