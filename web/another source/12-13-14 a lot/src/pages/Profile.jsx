import { useUserContext } from '../hooks/useUserContext';
import { Link } from "react-router-dom";

import { Card } from "react-bootstrap";
//import { Card, Col, Modal, Form, Button, Row } from "react-bootstrap";

export function Profile() {
    const { userCT } = useUserContext();

    return (
        <Card fluid className='bg-white mb-3 p-3 w-50 m-auto'>
            <h1>Perfil</h1>
            <p>Nome: {userCT.name}</p>
            <p>Email: {userCT.email}</p>
            <Link to="/">Login</Link>
            <Link to="/update">Update</Link>
        </Card>
    );
}
