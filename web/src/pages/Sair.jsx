import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function Sair() {
	const navigate = useNavigate();
    useEffect (() => {
        sessionStorage.removeItem('token');
        navigate('/');
    }, []);
        
	return (
		<Container>
		</Container>
	);
}
