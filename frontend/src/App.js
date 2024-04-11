import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./pages/Auth/Components/LoginForm";
import SignupForm from "./pages/Auth/Components/SignupForm";
import Home from "./pages/Home/index";
import Main from "./pages/Profile";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
