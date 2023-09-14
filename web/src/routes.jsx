import { BrowserRouter, Route, Routes } from "react-router-dom";

import { LoginCadastro } from "./pages/LoginCadastro/LoginCadastro.jsx";
import { Esttistica } from "./pages/Esttistica/Esttistica.jsx";
import { Login } from "./pages/Login.jsx";


export function Navigations() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={( <Login /> )} />
            </Routes>
        </BrowserRouter>
    )
}
