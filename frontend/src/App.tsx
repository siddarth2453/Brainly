
import PlusIcon from "./components/icons/PlusIcon"
import Button from "./components/ui/Button"
import Card from "./components/ui/Card"


const App = () => {

  return (
    <>
      <div className="w-screen h-screen bg-background  text-primary flex flex-col items-center justify-center gap-4">
      <Button  variant="primary" size="md" text="Add New" startIcon={<PlusIcon/>}/>

      <Card title="Hellow fraands" link="https://youtu.be/pQLFUUYIC0k?si=jpPMkE_gqJ__j7Cm"/>
      </div>
    </>
  )
}

export default App