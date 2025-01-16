import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Share from "./pages/Share";
import { FilterProvider } from "./contexts/FilterContext";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<FilterProvider><Dashboard /></FilterProvider>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/brain/:username" element={<Share />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
