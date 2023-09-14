import { UserContextProvider } from './contexts/UserContext';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { Foods } from "./pages/Foods";
import { FoodsRead } from "./pages/FoodsRead";

import { isAuthenticated } from './utils/is-authenticated';

export function PrivateRoute({ children }) {
    if (!isAuthenticated()) {
        return <Navigate to="/" replace />
    }
    return children;
}

export function Navigations() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/update"
                    element={(
                        <PrivateRoute>
                            <Foods />
                        </PrivateRoute>
                    )}
                />
                <Route
                    path="/read"
                    element={(
                        <PrivateRoute>
                            <FoodsRead />
                        </PrivateRoute>
                    )}
                />
            </Routes>
            <UserContextProvider>
                <Routes>
                    <Route index path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </UserContextProvider>
        </BrowserRouter>
    )
}
