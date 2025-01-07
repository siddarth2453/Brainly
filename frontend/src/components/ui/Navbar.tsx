import { NavLink } from "react-router"
import Button from "./Button"


const Navbar = () => {
  return (
    <nav className="md:h-16 h-16 bg-opacity-60 rounded-3xl w-[90%] m-auto bg-primary flex justify-between items-center">
    <div className="px-8">
    <NavLink  to="/" end>
      <h1 className="text-xl md:text-2xl font-bold text-white">Brainly</h1>
    </NavLink>
    </div>
    <div className="px-8 flex gap-2 md:gap-4">
      
    <NavLink  to="/signup" end>
      <Button variant="primary" size="sm" text="Sign Up"/>  
    </NavLink>

    <NavLink  to="/signin" end>
      <Button variant="secondary" size="sm" text="Sign In"/>  
    </NavLink>
    </div>
   </nav>
  )
}

export default Navbar