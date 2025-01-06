import InputBox from '../components/ui/InputBox'
import Button from '../components/ui/Button'

const SignUp = () => {
  return (
    <div className="bg-background flex justify-center items-center min-w-screen min-h-screen p-4">  
      <div className="w-[36rem] h-[36rem] flex flex-col gap-4 items-center justify-center rounded-lg bg-secondary ">
        <InputBox placeholder="username"/>
        <InputBox placeholder="password"/>
        <Button text="Sign Up" size="md" variant="primary" />
      </div>
    </div>
  )
}

export default SignUp