
import { useState } from "react"
import PlusIcon from "./components/icons/PlusIcon"
import ShareIcon from "./components/icons/ShareIcon"
import Button from "./components/ui/Button"
import Card from "./components/ui/Card"
import Modal from "./components/ui/Modal"


const App = () => {

  const [isOpen, setIsOpen] = useState(false); 

  return (
    <>
    <Modal value={isOpen} changeIsOpen={()=> { setIsOpen(false)}} />
    <div className="bg-background min-w-screen min-h-screen">
    <div className="p-2 flex gap-3 justify-end">
    <Button  variant="primary" size="sm" text="Add New" startIcon={<PlusIcon/>} changeIsOpen= {() => { setIsOpen (true)}}/>
    <Button  variant="secondary" size="sm" text="Share Brain" startIcon={<ShareIcon/>}/>

    </div>
      <div className="w-full h-full  text-primary flex flex-wrap items-start justify-center p-3 gap-4">
      

      <Card title="This is my first video" link="https://youtu.be/VUYwFMgtwoM" type="youtube"/>

      <Card title="This is my first tweet" link="https://x.com/shashankx02/status/1852335728757244215" type="tweet"/>
     
      </div>
    </div>
    </>
  )
}

export default App