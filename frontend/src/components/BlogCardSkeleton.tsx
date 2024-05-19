

const BlogCardSkeleton = () => {
    return (
        <div className="m-2 py-4 px-5 border-b-2 border-gray-200 animate-pulse">
            <div className="relative flex flex-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <div className="flex flex-col justify-center space-y-2">
                    <div className="w-24 h-4 bg-gray-300 rounded"></div>
                </div>
                <div className="flex flex-col justify-center space-y-2">
                    <div className="w-16 h-4 bg-gray-300 rounded"></div>
                </div>
            </div>

            <div className="grid grid-cols-10 gap-2 mt-4">
                <div className="col-span-7 pr-2">
                    <div className="space-y-2">
                        <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
                        <div className="w-full h-4 bg-gray-300 rounded"></div>
                        <div className="w-full h-4 bg-gray-300 rounded"></div>
                    </div>
                </div>
                <div className="col-span-3 pl-2 flex justify-center">
                    <div className="w-full h-24 bg-gray-300 rounded-lg mt-2"></div>
                </div>
            </div>

            <div className="mt-2 w-20 h-4 bg-gray-300 rounded"></div>
        </div>
    );
}

export default BlogCardSkeleton;