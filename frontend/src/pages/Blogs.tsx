import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";
import BlogCardSkeleton from "../components/BlogCardSkeleton";
import { useBlogs } from "../hooks";
import getImg from "../utils/getImg";

const BlogsSkeleton = () => {
    return <>
        <AppBar />
        <div className="flex justify-center">
            <div className="flex flex-col w-[800px]">
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
            </div>
        </div>
    </>
}


const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <>
            <BlogsSkeleton />
        </>
    }

    return <>
        <AppBar />
        <div className="flex justify-center">
        <div className="flex flex-col-reverse max-w-[800px]">
            { blogs.map((blog: any) => (
                <div key={blog.id}>
                    <BlogCard 
                        id={ blog.id }
                        authorName={ blog.author.name }
                        date={ blog.createdAt }
                        title={ blog.title }
                        content={ blog.content }
                        img={ getImg() }
                    />
                </div>
            ))}
            
        </div>
        </div>
    </>
}

export default Blogs;