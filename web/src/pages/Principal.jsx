import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

//import { Input } from "../components/Input";
import { Header } from '../components/Header';
import { Modal } from '../components/Modal';

// import { loginUser } from '../services/user-services';
import { lgn } from '../services/usuario';

export function Principal() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const user = await lgn(data);
            setResult(data);
            navigate('/home');
        } catch (error) {
            setResult({
                title: 'Houve um erro no login!',
                message: error.response.data.error,
            });
        }
    }

    return (
        <div>
            <header> 
                <div>
                <script title="oNlineWebFonts" src="https://db.onlinewebfonts.com/animations/icons/406982.js" type="text/javascript"></script> 
                    <bold>Visão</bold>
                </div>
            </header>

        </div>
    );
}
/*
<Container

        >
            <Modal
                show={result}
                title={result?.title}
                message={result?.message}
                handleClose={() => setResult(null)}
            />
            <Header title="Visão Geral" />
            <Row className="d-flex">
                <Container
                    className="bg-light rounded p-5 shadow  m-auto"
                    
                >
                    <br />
                    <br />
                    <div className="d-flex justify-content-between">
                        <Button type="submit">Criar</Button>
                        <Link to="/registro">Criar conta</Link>
                    </div>
                </Container>
                
                <Container
                    className="bg-light rounded p-5 shadow w-40 m-auto"
                >
                    <br />
                    <br />
                    <div className="d-flex justify-content-between">
                        <Button type="submit">Criar</Button>
                        <Link to="/registro">Criar conta</Link>
                    </div>
                </Container>
            </Row>

        </Container>
*/