import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Merendeiras } from "./pages/Merendeiras";


export function Navigations() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={( <Merendeiras /> )} />
            </Routes>
        </BrowserRouter>
    )
}
