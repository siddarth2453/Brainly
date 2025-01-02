import Button from "./components/Button"
import StartIcon from "./assets/StartIcon"

const App = () => {
  return (
    <div className="bg-gradient-to-r from-zinc-900 to-indigo-600 w-screen min-h-screen gap-5 flex-wrap text-white flex justify-center items-center">
        <Button text={"Login"} variant="secondary" size="lg" startIcon={<StartIcon/>}/>
    </div>
  )
}

export default App