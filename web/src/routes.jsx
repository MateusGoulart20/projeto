import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { UserContextProvider } from './contexts/UserContext';
import { isAuthenticated } from './utils/is-authenticated';

import { LoginCadastro } from "./pages/LoginCadastro/LoginCadastro.jsx";
import { Esttistica } from "./pages/Esttistica/Esttistica.jsx";
import { EditProfile } from './pages/EditProfile';
import { Profile } from './pages/Profile';

import { Login } from './pages/Login';
import { Llogin } from "./pages/Llogin.jsx";
import { Registro } from "./pages/Registro.jsx";
import { Principal } from "./pages/Principal.jsx";
import { Sair } from "./pages/Sair.jsx";
import { Escolas } from "./pages/Escolas.jsx";
import { Departamentos } from "./pages/Departamentos";
import { Eventos } from "./pages/Eventos";
import { Funcionarios } from "./pages/Funcionarios";

export function PrivateRoute({ children }) {
    if (!isAuthenticated()) {
        return <Navigate to="/" replace />
    }
    return children;
}

export function Navigations() {
    return (
        <UserContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/a" element={(<Login />)} />
                    <Route path="/" element={(<Llogin />)} />
                    <Route path="/registro" element={(<Registro />)} />
                    <Route path="/home" element={(<Principal />)} />
                    <Route path="/sair" element={(<Sair />)} />
                    <Route path="/escolas" element={(<Escolas />)} />
                    <Route path="/departamento" element={(<Departamentos />)} />
                    <Route path="/eventos" element={(<Eventos />)} />
                    <Route path="/funcionarios" element={(<Funcionarios />)} />
                    <Route path="/a" element={(<EditProfile />)} />
                    <Route path="/a" element={(<Profile />)} />
                    <Route path="/a" element={(<PrivateRoute><Profile /></PrivateRoute>)} />
                </Routes>
            </BrowserRouter>
        </UserContextProvider>
    )
}
/*

*/