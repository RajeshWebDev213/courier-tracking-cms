import { Routes, Route } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Hero from "./components/common/Hero";
import Login from "./components/auth/login";
import Register from "./components/auth/register";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Hero />
          </>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
    </Routes>
  );
}

export default App;