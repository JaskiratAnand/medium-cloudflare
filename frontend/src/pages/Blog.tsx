import { useParams } from "react-router-dom";
import AppBar from "../components/AppBar";
import Heading from "../components/Heading";
import { useBlog } from "../hooks";
import Avatar from "../components/Avatar";
import getImg from "../utils/getImg";
import BlogSkeleton from "../components/BlogSkeleton";

const dateToLocaleString = (date: string) => {
    const localeDate = new Date(date);
    return localeDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

const Blog = () => {
    const { id } = useParams();
    if( !id ) return null;

    const { loading, blog }: {
        loading: boolean, 
        blog: any
    } = useBlog({id});


    if (loading) {
        return <>
            <AppBar />
            <BlogSkeleton />
        </>
    }

    return <>
        <AppBar />
        <div className="grid px-10 lg:px-20 xl:px-48 grid-cols-12 gap-5 pt-8 pb-5 mb-16">

            <div className="col-span-12 lg:col-span-8 px-2">
                <Heading text={blog.title} align={"left"} />

                <div className="visible lg:hidden">
                    <div className="pt-1 flex flex-row gap-2">
                        <Avatar name={blog.author.name} />
                        <div className="flex flex-col text-black justify-center text-lg font-medium ">
                            {blog.author.name}
                        </div>
                    </div>
                    <img src={ getImg() } alt="blogImg" className="w-full  object-cover rounded-lg mt-4 mb-2" />
                </div>

                <div className="pt-1 text-gray-500">
                    Posted on {dateToLocaleString(blog.createdAt)} &#9679; {Math.floor(blog.content.length/800) + " min read"}
                </div>
                <pre className="pt-8 text-justify text-lg leading-8 font-serif text-pretty">
                    {blog.content}
                </pre>

            </div> 
            <div className="hidden lg:visible lg:flex font-medium text-lg text-gray-700 flex-col col-span-12 lg:col-span-4 px-2">
                <img src={ getImg() } alt="blogImg" className="w-full  object-cover rounded-lg mt-2" />
                <div className="pt-4">
                    Author
                </div>
                <div className="pt-3 flex flex-row gap-2">
                    <Avatar name={blog.author.name} />
                    <div className="flex flex-col text-black justify-center text-lg font-medium ">
                        {blog.author.name}
                    </div>
                </div>
            </div>
        </div>
    </>
}


export default Blog;