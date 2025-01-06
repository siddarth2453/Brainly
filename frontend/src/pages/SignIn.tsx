import Button from "../components/ui/Button";
import InputBox from "../components/ui/InputBox";
import Navbar from "../components/ui/Navbar";

const SignIn = () => {
  return (
    <>
      <div className="pt-5">
        <Navbar />
        <div className="bg-background flex justify-center items-center min-w-screen min-h-screen p-4">
          <div className="w-[36rem] h-[36rem] flex flex-col gap-4 items-center justify-center rounded-lg bg-secondary ">
            <InputBox placeholder="username" />
            <InputBox placeholder="password" />
            <Button text="Sign In" size="md" variant="primary" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
