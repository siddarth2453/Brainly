import Card from "../components/ui/Card";
import Modal from "../components/ui/Modal";
import { useState } from "react";
import Sidebar from "../components/ui/Sidebar";
import DashNav from "../components/ui/DashNav";

const Dashborard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen ,setMenuOpen] = useState(false)
  return (
    <>
      <div>
        <Modal
          value={isOpen}
          onClickFn={() => {
            setIsOpen(false);
          }}
        />
        <Sidebar setModal={() => {setIsOpen(true)}} menuOpen={menuOpen} setMenuOpen={() =>{setMenuOpen(false)}}/>
        <div className={`bg-background min-w-screen min-h-screen ${menuOpen ? 'lg:ml-72' : ""}`}>

          <div className="py-5">
          <DashNav menuOpen={menuOpen} setMenuOpen={() =>{setMenuOpen(true)}} />
          </div>

          
          <div className="w-full h-full  text-primary flex flex-wrap items-start justify-center p-3 gap-4">
            <Card
              title="This is my first video"
              link="https://youtu.be/VUYwFMgtwoM"
              type="youtube"
            />

            <Card
              title="This is my first tweet"
              link="https://x.com/shashankx02/status/1852335728757244215"
              type="tweet"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashborard;
