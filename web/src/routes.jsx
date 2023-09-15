import { BrowserRouter, Route, Routes } from "react-router-dom";

import { LoginCadastro } from "./pages/LoginCadastro/LoginCadastro.jsx";
import { Esttistica } from "./pages/Esttistica/Esttistica.jsx";
import { Login } from "./pages/Login.jsx";
import { Registro } from "./pages/Registro.jsx";
import { Principal } from "./pages/Principal.jsx";


export function Navigations() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"
                    element={( <Login/> )}
                />
                <Route path="/registro"
                    element={( <Registro/> )}
                />
                <Route path="/home"
                    element={( <Principal/>)}
                />
            </Routes>
        </BrowserRouter>
    )
}
