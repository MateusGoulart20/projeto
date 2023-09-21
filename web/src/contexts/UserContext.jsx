import { createContext, useState } from 'react';

export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
    const [user, setUser] = useState({
        cpf: 'Username Teste',
        senha: 'username@mail.com',
    });

    //function ola() {//console.log('ola')}

    return (
        <UserContext.Provider
            value={{
                user,
                setUser
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
