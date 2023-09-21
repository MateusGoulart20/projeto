import { createContext, useState } from 'react';

export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
    const [user, setUser] = useState({
        name: 'Username Teste',
        email: 'username@mail.com',
    });

    function ola() {
        //console.log('ola')
    }

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                ola
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
