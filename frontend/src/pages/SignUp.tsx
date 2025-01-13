import InputBox from "../components/ui/InputBox";
import Button from "../components/ui/Button";
import Navbar from "../components/ui/Navbar";
import { useRef, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/config";

const SignUp = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const OnButtonClick = async () => {
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    setMessage(null);
    setErrors([]);
    setLoading(true);

    try {
      const response = await axios.post<{ message: string }>(
        `${API_URL}/signup`,
        {
          username,
          email,
          password,
        }
      );

      setMessage(response.data.message); // Success message
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        // Validation errors
        const validationErrors = error.response.data.errors.map(
          (err: any) => err.message
        );
        setErrors(validationErrors);
      } else if (error.response && error.response.status === 403) {
        // Account already exists
        setMessage(error.response.data.message);
      } else {
        // General error
        setMessage("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-5 bg-secondary">
      <Navbar />
      <div className="flex justify-center items-center min-w-screen min-h-screen p-4">
        <div className="w-[36rem] h-[36rem] flex flex-col gap-4 items-center justify-center rounded-lg bg-slate-300 bg-opacity-50 shadow">
          {/* Show Loading Spinner */}
          {loading && <p className="text-blue-500">Loading...</p>}

          {/* Show Success or Error Message */}
          {message && <p className="text-center text-green-500">{message}</p>}

          {/* Show Validation Errors */}
          {errors.length > 0 && (
            <div className="text-red-500 text-center">
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <InputBox
            reference={usernameRef}
            placeholder="username"
            type="text"
            required={true}
          />
          <InputBox
            reference={emailRef}
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
