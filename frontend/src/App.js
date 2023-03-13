import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import Registerpage from "./pages/Registerpage";
import WelcomePage from "./pages/WelcomePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/loginpage" element={<LoginPage />} />
            <Route path="/registerpage" element={<Registerpage />} />
            <Route path="/homepage" element={<HomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
