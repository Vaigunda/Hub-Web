import "./App.css";
import Drive from "./components/Drive";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CoursePage from "./components/CoursePage";
import ProductDetailPage from "./components/ProductDetailPage";
import HubSpot from "./components/Hub";
import Home from "./components/Home";
import Cart from "./components/Cart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Drive />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/course" element={<CoursePage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
