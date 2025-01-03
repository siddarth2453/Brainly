import Button from './components/ui/Button';


const App = () => {

  return (
    <>
      <div className="w-screen h-screen bg-background text-white flex flex-col items-center justify-center gap-4">
       <Button text="click me" variant="primary" size='md' /> 
      </div>
    </>
  )
}

export default App