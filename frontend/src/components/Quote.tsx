interface quoteInput {
    quote: string;
    from: string;
    position: string;
}


const Quote = ({ quote, from, position }: quoteInput) => {

    return <div className="h-screen bg-gray-300 flex flex-col justify-center text-left text-2xl text-black font-semibold px-12 lg:px-24">
        "{quote}"
        <span className="mt-4 text-xl font-medium text-left">
            {from}
        </span>
        <span className="mt-1 text-lg text-gray-600 font-normal text-left">
            {position}
        </span>
    </div>
}

export default Quote;