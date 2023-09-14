import { BrowserRouter, Route, Routes } from "react-router-dom";

import { LoginCadastro } from "./pages/LoginCadastro";


export function Navigations() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={( <LoginCadastro /> )} />
            </Routes>
        </BrowserRouter>
    )
}
