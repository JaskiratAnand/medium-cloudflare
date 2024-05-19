import Quote from "../components/Quote";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
// @ts-ignore
import { UserSignIn } from "@jaskirat01/medium-project";

const quote: string = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi labore nihil eos quos atque impedit accusamus perspiciatis necessitatibus consequuntur";
const from: string = "John Doe";
const position: string = "CEO, Company Inc.";

const Signin = () => {
    const navigate = useNavigate();
    const [signInInputs, setSignInInputs] = useState<UserSignIn>({
        email: "",
        password: ""
    })

    const signIn = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, signInInputs);
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            localStorage.setItem("email", signInInputs.email);
            navigate("/blogs")
        } catch (err) {
            console.log(err);
        }
    } 

    return <div className="grid grid-cols-2 ">
        <div className="col-span-2 mt-24 md:mt-0 md:col-span-1 flex flex-col justify-center text-center">
            <Heading text={"Account SignIn"} />
            <Subheading text={"Create a new account"} link={"/signup"} linkText={"Signup."} />
            <div className="mt-10 text-xl px-10 xl:px-24 2xl:px-36 text-left justify-center">
                <InputBox type="text" placeholder="Email" 
                    onChange={(e) => {
                        setSignInInputs({
                            ...signInInputs,
                            email: e.target.value
                        })
                    }
                } />
                <InputBox type="password" placeholder="Password" 
                    onChange={(e) => {
                        setSignInInputs({
                            ...signInInputs,
                            password: e.target.value
                        })
                    }
                } />
                <Button text="Sign In" onClick={ signIn } />
            </div>
        </div>
        <div className="col-span-1 invisible md:visible">
            <Quote quote={quote} from={from} position={position} />

        </div>
    </div>
}

export default Signin;