import { createContext, useState } from 'react';

export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
    const [userCT, setUser] = useState({
        name: 'Username Teste',
        email: 'username@mail.com',
    });

    function ola() {
        console.log('ola')
    }

    return (
        <UserContext.Provider
            value={{
                userCT,
                setUser,
                ola
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
