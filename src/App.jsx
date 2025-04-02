import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeaturedCars from "./components/FeaturedCars";
import AdminFeaturedCars from "./pages/AdminFeaturedCars";
import EditarCarro from "./pages/EditarCarro";
import CarDetails from "./pages/CarDetails";
import Login from "./pages/Login";
import Registro from "./pages/registro";
import Layout from "./components/Layout";

function App() {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<Layout />} />
                <Route
                    path="/"
                    element={
                        <>
                            <Header />
                            <HeroSection />
                            <FeaturedCars />
                        </>
                    }
                />
                <Route path="/carros/:id" element={<CarDetails />} />
                <Route
                    path="/admin/featured-cars"
                    element={<AdminFeaturedCars />}
                />
                <Route path="/" element={<Layout />}>
                    <Route index element={<HeroSection />} />
                    <Route path="login" element={<Login />} />
                    <Route path="registro" element={<Registro />} />
                </Route>
                <Route
                    path="/admin/editar-carro/:id"
                    element={<EditarCarro />}
                />
                <Route path="/Login" element={<Login />} />
                <Route path="/Registro" element={<Registro />} />
            </Routes>
        </Router>
    );
}

export default App;
