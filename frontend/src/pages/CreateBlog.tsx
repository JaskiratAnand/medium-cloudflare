import { useRef, useState } from "react";
import AppBar from "../components/AppBar";
import useAutosizeTextArea from "../hooks/useAutosizeTextarea";
import Button from "../components/Button";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title: "",
        content: "",
    })
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    useAutosizeTextArea(textAreaRef.current, inputs.content);

    const publishBlog = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, inputs, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const blogId = response.data.id;
            await navigate(`/blog/${blogId}`)
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <>
            <AppBar />

            <div className="flex justify-center flex-col pt-5 mb-16 px-10 lg:px-24 xl:px-60 2xl:px-90">
                <div>
                    <input 
                        className="w-full mt-2 pt-4 pb-2 px-4 font-medium text-5xl font-serif border-gray-300 focus:outline-none focus:border-l-2"
                        type="text" placeholder="Title" 
                        id="title"
                        onChange={(e) => {
                            setInputs({
                                ...inputs,
                                title: e.target.value
                            })
                        }}
                    />
                </div>
                <div className="mt-2">
                    <textarea
                        className="w-full mt-2 pt-4 pb-2 px-4 font-medium text-2xl font-serif focus:outline-none leading-relaxed"
                        placeholder="Tell your story..." 
                        id="content"
                        ref={textAreaRef}
                        rows={1}
                        value={inputs.content}
                        onChange={(e) => {
                            setInputs({
                                ...inputs,
                                content: e.target.value
                            })
                        }}
                    />
                </div>
                <div className="mt-2 mb-5 py-2 max-w-56">
                    <Button text="Publish Blog" onClick={ publishBlog } />
                </div>

            </div>
        </>
    );
}

export default CreateBlog;