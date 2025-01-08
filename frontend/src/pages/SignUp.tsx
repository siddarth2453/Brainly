import InputBox from "../components/ui/InputBox";
import Button from "../components/ui/Button";
import Navbar from "../components/ui/Navbar";
import { useRef } from "react";
import axios from "axios";

const SignUp = () => {
  const usernameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

const OnButtonClick = () => {

  const username = usernameRef.current?.value;
  const email = emailRef.current?.value;
  const password = passwordRef.current?.value;

  // Backend not yet deployed so localhost xD (suggest some website for free deployment of node backend)
  const response = axios.post(`http://localhost:3000/api/v1/signup`, {
    username,
    email,
    password,
  });

  console.log(response);
};
  
  return (
    <div className="pt-5 bg-secondary">
      <Navbar />
      <div className=" flex justify-center items-center min-w-screen min-h-screen p-4">
        <div className="w-[36rem] h-[36rem] flex flex-col gap-4 items-center justify-center rounded-lg bg-slate-300 bg-opacity-50 shadow ">
          <InputBox
            reference={usernameRef}
            placeholder="username"
            type="text"
            required={true}
          />
          <InputBox
            reference={ emailRef }
            placeholder="email"
            type="email"
            required={true}
          />
          <InputBox
            reference={passwordRef}
            placeholder="password"
            type="password"
            required={true}
          />
          <Button
            text="Sign Up"
            size="md"
            variant="primary"
            OnClickFn={OnButtonClick}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
