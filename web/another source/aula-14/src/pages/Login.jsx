import { useUserContext } from '../hooks/useUserContext';

export function Login() {
    const { user, ola } = useUserContext();

    return (
        <>
            <h1>Login</h1>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <button onClick={ola}>Ola</button>
        </>
    );
}
