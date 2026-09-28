import { Routes, Route } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Home from "./pages/Home";
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Home/>
          </>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
    </Routes>
  );
}

export default App;