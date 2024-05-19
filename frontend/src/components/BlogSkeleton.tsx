const BlogSkeleton = () => {
    return (
        <>
            <div className="grid px-10 lg:px-20 xl:px-48 grid-cols-12 gap-5 pt-8 pb-5 mb-16 animate-pulse">

                <div className="col-span-12 lg:col-span-8 px-2">
                    <div className="h-10 bg-gray-300 rounded w-3/4 mb-4"></div>

                    <div className="visible lg:hidden">
                        <div className="pt-1 flex flex-row gap-2">
                            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                            <div className="flex flex-col justify-center w-24 h-4 bg-gray-300 rounded"></div>
                        </div>
                        <div className="w-full h-48 bg-gray-300 rounded-lg mt-4 mb-2"></div>
                    </div>

                    <div className="pt-1 text-gray-500">
                        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    </div>
                    <div className="pt-8 space-y-4">
                        <div className="h-6 bg-gray-300 rounded w-full"></div>
                        <div className="h-6 bg-gray-300 rounded w-full"></div>
                        <div className="h-6 bg-gray-300 rounded w-full"></div>
                        <div className="h-6 bg-gray-300 rounded w-full"></div>
                    </div>
                </div> 
                
                <div className="hidden lg:flex font-medium text-lg text-gray-700 flex-col col-span-12 lg:col-span-4 px-2">
                    <div className="w-full h-48 bg-gray-300 rounded-lg mt-2"></div>
                    <div className="pt-4">
                        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                    </div>
                    <div className="pt-3 flex flex-row gap-2">
                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                        <div className="flex flex-col justify-center w-24 h-4 bg-gray-300 rounded"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BlogSkeleton;
