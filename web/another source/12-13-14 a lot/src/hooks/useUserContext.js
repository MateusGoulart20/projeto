import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export function useUserContext() {
    const { userCT, ola, setUser } = useContext(UserContext);
    return {
        userCT,
        ola
    }
}
