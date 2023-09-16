import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export function useUserContext() {
    const { user, ola } = useContext(UserContext);
    return {
        user,
        ola
    }
}
