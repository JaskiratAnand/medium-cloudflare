import Quote from "../components/Quote";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { useState } from "react";
import axios from "axios";
// @ts-ignore
import { UserSignUp } from "@jaskirat01/medium-project";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const quote: string = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi labore nihil eos quos atque impedit accusamus perspiciatis necessitatibus consequuntur";
const from: string = "John Doe";
const position: string = "CEO, Company Inc.";

const Signup = () => {
    const navigate = useNavigate();
    const [signUpInputs, setSignUpInputs] = useState<UserSignUp>({
        name: "",
        email: "",
        password: ""
    })

    const signUp = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, signUpInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            localStorage.setItem("email", signUpInputs.email);
            navigate("/blogs")
        } catch (err) {
            console.log(err);
        }
    } 

    return <div className="grid grid-cols-2 ">
        <div className="col-span-2 mt-24 md:mt-0 md:col-span-1 flex flex-col justify-center text-center">
            <Heading text={"Create Account"} />
            <Subheading text={"Already have an account?"} link={"/signin"} linkText={"Login"} />
            <div className="mt-10 text-xl px-10 xl:px-24 2xl:px-36 text-left justify-center">
                <InputBox type="text" placeholder="Name" onChange={(e) => {
                    setSignUpInputs({
                        ...signUpInputs,
                        name: e.target.value
                    })
                }} />
                <InputBox type="text" placeholder="Email" onChange={(e) => {
                    setSignUpInputs({
                        ...signUpInputs,
                        email: e.target.value
                    })
                }} />
                <InputBox type="password" placeholder="Password" onChange={(e) => {
                    setSignUpInputs({
                        ...signUpInputs,
                        password: e.target.value
                    })
                }} />
                <Button text="Sign Up" onClick={ signUp } />
            </div>
        </div>
        <div className="col-span-1 invisible md:visible">
            <Quote quote={quote} from={from} position={position} />

        </div>
    </div>
}

export default Signup;