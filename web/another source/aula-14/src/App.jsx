import { UserContextProvider } from './contexts/UserContext';

import { EditProfile } from './pages/EditProfile';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';

export function App() {
    return (
        <UserContextProvider>
            <Login />
            <EditProfile />
            <Profile />
        </UserContextProvider>
    );
}
