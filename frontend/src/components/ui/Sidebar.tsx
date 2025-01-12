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
      className={`transition-all duration-500 ease-in-out ${
        props.menuOpen
          ? "transform translate-x-0 opacity-100"
          : "transform -translate-x-full opacity-0"
      } w-80 h-screen bg-white px-6 py-4 fixed top-0 left-0 border-3 border-r rounded-lg`}>
      <div className="flex justify-between">
        <div className="flex gap-2 justify-start items-center mb-6">
          <img className="w-[2rem]" src="/images/logo.png" alt="logo" />
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

      <div className="py-2 flex gap-9 justify-center">
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
