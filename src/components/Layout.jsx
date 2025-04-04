import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
    const location = useLocation();

    useEffect(() => {
        const pageTitles = {
            "/": "Página Inicial | Locadora",
            "/login": "Login | Locadora",
            "/registro": "Registro | Locadora"
        };
        document.title = pageTitles[location.pathname] || "Meu Site";
    }, [location]);

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
