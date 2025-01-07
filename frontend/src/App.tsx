import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Dashborard from "./pages/Dashborard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const App = () => {
 
  return (
    <>
      <BrowserRouter>
  <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashborard />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
</BrowserRouter>
    </>
  );
};

export default App;
