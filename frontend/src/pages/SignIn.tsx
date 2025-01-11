import { useRef, useState } from "react";
import Button from "../components/ui/Button";
import InputBox from "../components/ui/InputBox";
import Navbar from "../components/ui/Navbar";
import axios from "axios";
import { useNavigate } from "react-router";

const SignIn = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null); // State to store error message
  const navigate = useNavigate();

  const OnButtonClick = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const response: any = await axios.post(
        "http://localhost:3000/api/v1/signin",
        {
          email,
          password,
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      }
    } catch (error: any) {
      if (error.response) {
        // Backend responded with an error
        setError(error.response.data.message); // Display the error message from the backend
      } else {
        // General error (e.g., network error)
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="pt-5 bg-secondary">
        <Navbar />
        <div className="flex justify-center items-center min-w-screen min-h-screen p-4">
          <div className="w-[36rem] h-[36rem] flex flex-col gap-4 items-center justify-center rounded-lg bg-slate-300 bg-opacity-50 shadow">
            {error && (
              <div className="text-red-500 mt-2 text-sm">{error}</div> // Display error message
            )}
            <InputBox
              placeholder="email"
              reference={emailRef}
              type="text"
              required={true}
            />
            <InputBox
              placeholder="password"
              reference={passwordRef}
              type="password"
              required={true}
            />

            <Button
              text="Sign In"
              size="md"
              variant="primary"
              OnClickFn={OnButtonClick}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
