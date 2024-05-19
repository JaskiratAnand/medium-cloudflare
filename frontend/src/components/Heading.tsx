
type HeadingProps = {
    text: string;
    align?: "left" | "center" | "right" | "justify";
}

const Heading = ({text, align}: HeadingProps) => {
    return <div className={`my-2 text-${align} text-3xl leading-relaxed font-bold`}>
        {text}
    </div>
}

export default Heading;