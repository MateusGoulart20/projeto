import { BrowserRouter, Route, Routes } from "react-router-dom";

import { LoginCadastro } from "./pages/LoginCadastro/LoginCadastro.jsx";
import { Esttistica } from "./pages/Esttistica/Esttistica.jsx";
import { Perfil } from "./pages/Perfil/Perfil.jsx";


export function Navigations() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={( <Perfil /> )} />
            </Routes>
        </BrowserRouter>
    )
}
