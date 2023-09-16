import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { LoginCadastro } from "./pages/LoginCadastro/LoginCadastro.jsx";
import { Esttistica } from "./pages/Esttistica/Esttistica.jsx";
import { Llogin } from "./pages/Llogin.jsx";
import { Registro } from "./pages/Registro.jsx";
import { Principal } from "./pages/Principal.jsx";

import { UserContextProvider } from './contexts/UserContext';

import { EditProfile } from './pages/EditProfile';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';

import { isAuthenticated } from './utils/is-authenticated';

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