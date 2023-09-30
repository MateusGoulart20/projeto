import { useUserContext } from '../hooks/useUserContext';

export function Profile() {
    const { user } = useUserContext();

    return (
        <>
            <h1>Profile</h1>
            <p>{user.cpf}</p>
            <p>{user.senha}</p>
        </>
    );
}
