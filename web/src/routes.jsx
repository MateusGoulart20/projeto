import { BrowserRouter, Route, Routes } from "react-router-dom"; //Navigate,

import { UserContextProvider } from './contexts/UserContext';
import { isAuthenticated } from './utils/is-authenticated';

//import { LoginCadastro } from "./pages/LoginCadastro/LoginCadastro.jsx";
//import { Esttistica } from "./pages/Esttistica/Esttistica.jsx";
//import { EditProfile } from './pages/EditProfile';
//import { Profile } from './pages/Profile';

//import { Login } from './pages/Login';
import { Llogin } from "./pages/Llogin.jsx";
import { Registro } from "./pages/Registro.jsx";
import { Principal } from "./pages/Principal.jsx";
import { Sair } from "./pages/Sair.jsx";
import { Escolas } from "./pages/Escolas.jsx";
import { Departamentos } from "./pages/Departamentos";
import { Eventos } from "./pages/Eventos";
import { Funcionarios } from "./pages/Funcionarios";
import { Perfil } from "./pages/Perfil";

export function PrivateRoute({ children }) {
    if (!isAuthenticated()) {
        return <Sair />
    }
    return children;
}

export function Navigations() {
    return (
        <UserContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={(<Llogin />)} />
                    <Route path="/registro" element={(<Registro />)} />
                    <Route path="/sair" element={(<Sair />)} />
                    <Route path="/home" element={(<PrivateRoute><Principal /></PrivateRoute>)} />
                    <Route path="/escolas" element={(<PrivateRoute><Escolas /></PrivateRoute>)} />
                    <Route path="/departamento" element={(<PrivateRoute><Departamentos /></PrivateRoute>)} />
                    <Route path="/eventos" element={(<PrivateRoute><Eventos /></PrivateRoute>)} />
                    <Route path="/funcionarios" element={(<PrivateRoute><Funcionarios /></PrivateRoute>)} />
                    <Route path="/perfil" element={(<PrivateRoute><Perfil /></PrivateRoute>)} />
                    {/*}
                    <Route path="/a" element={(<Login />)} />
                    <Route path="/a" element={(<EditProfile />)} />
                    <Route path="/a" element={(<Profile />)} />
                    <Route path="/a" element={(<PrivateRoute><Profile /></PrivateRoute>)} />
                    */}
                </Routes>
            </BrowserRouter>
        </UserContextProvider>
    )
}
/*

*/