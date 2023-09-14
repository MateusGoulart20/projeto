import { useUserContext } from '../hooks/useUserContext';

export function EditProfile() {
    const { user } = useUserContext();

    return (
        <>
            <h1>Edit Profile</h1>
            <p>{user.name}</p>
            <p>{user.email}</p>
        </>
    );
}
