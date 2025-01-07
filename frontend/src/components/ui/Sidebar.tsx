import CloseIcon from "../icons/CloseIcon";
import PlusIcon from "../icons/PlusIcon";
import ShareIcon from "../icons/ShareIcon";
import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import Button from "./Button";
import SidebarItems from "./SidebarItems";

interface SidebarType {
  setMenuOpen: () => void;
  setModal?: () => void;
  menuOpen: boolean;
}

const Sidebar = (props: SidebarType) => {
  return (
    <div
      className={` transition-all duration-700 ease-in-out ${
        props.menuOpen ? "block" : "hidden"
      }  w-80 h-screen bg-white px-6 py-4 fixed top-0 left-0 border-3 border-r  `}>


        
      <div className="flex justify-between">
        <div className="flex gap-2 justify-start items-center mb-6">
          <img
            className="w-[2rem]"
            src="https://cdn.discordapp.com/attachments/1225854231169466539/1326215759369736243/logo.png?ex=677e9e2c&is=677d4cac&hm=a8c5e5bcea7e25dd57b7ff3e5643f00f1f6274899f49d0dd94698a9501340d93&"
            alt="logo"
          />
          <h1 className="text-2xl font-bold text-primary">Brainly</h1>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            props.setMenuOpen();
          }}>
          <CloseIcon />
        </div>
      </div>

      

      <SidebarItems startIcon={<TwitterIcon />} text="Tweets" />
      <SidebarItems startIcon={<YoutubeIcon />} text="Youtube" />

      <div className="py-2 flex gap-9 justify-center ">
        <Button
          variant="primary"
          size="sm"
          text="Add New"
          startIcon={<PlusIcon />}
          OnClickFn={props.setModal}
        />
        <Button
          variant="secondary"
          size="sm"
          text="Share Brain"
          startIcon={<ShareIcon />}
        />
      </div>

    </div>
    
  );
};

export default Sidebar;
