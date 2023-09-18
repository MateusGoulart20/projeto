import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export function useUserContext() {
    const { senha, cpf } = useContext(UserContext);
    return {
        cpf,
        senha,
    }
}
