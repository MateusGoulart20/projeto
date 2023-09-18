import { Button, Row, Col, Container, } from "react-bootstrap";// Form,
import { useNavigate } from "react-router-dom";// Link, 
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Card from 'react-bootstrap/Card';

//import { Input } from "../components/Input";
import { Escola } from "../components/Escola";
import { Header } from '../components/Header';
import { Navexample } from '../components/Navexample';
//import { Modal } from '../components/Modal';

// import { loginUser } from '../services/user-services';
import { viewEscola } from '../services/escola';
import { viewDepartamento } from '../services/departamento';
import { viewFuncionario } from '../services/funcionario';
import { viewEvento } from '../services/evento';
import { Relacao } from "../components/Relacao";

export function Principal() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    // Zona para tentar pegar a lista de escolas
    const [escolas, setEscolas] = useState([]);
    const [mediaEscola, setMediaEscola] = useState([]);
    const [mediaDepartamento, setMediaDepartamento] = useState([]);
    const [mediaFuncionario, setFuncionario] = useState([]);
    const [mediaEvento, setEvento] = useState([]);

    async function findMediaEscola() {
        try {
            const result = await viewEscola();
            console.log(result)
            console.log(result.data)
            setMediaEscola(result.data);
        } catch (error) {
            console.error(error);
        }
    }
    async function findMediaDepartamento() {
        try {
            const result = await viewDepartamento();
            console.log(result)
            console.log(result.data)
            setMediaDepartamento(result.data);
        } catch (error) {
            console.error(error);
        }
    }
    async function findMediaFuncionario() {
        try {
            const result = await viewFuncionario();
            console.log(result)
            console.log(result.data)
            setFuncionario(result.data);
        } catch (error) {
            console.error(error);
        }
    }
    async function findMediaEvento() {
        try {
            const result = await viewEvento();
            console.log(result)
            console.log(result.data)
            setEvento(result.data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        findMediaEscola();
        findMediaDepartamento();
        findMediaFuncionario();
        findMediaEvento();
    }, []);
    return (
        <Container fluid>
            <Navexample
            />
            <Header title="Visão Estatística" color="#FFFFFF" bcolor="#1F69D7" />
            {mediaEscola && mediaEscola.quantidade > 0
                ?
                <Relacao
                    quantidade={mediaEscola.quantidade}
                    administrativos={mediaEscola.quantidade_administrativos}
                    estudantes={mediaEscola.quantidade_estudantes}
                    professores={mediaEscola.quantidade_professores}
                    salas={mediaEscola.quantidade_salas}
                    tercerizados={mediaEscola.quantidade_tercerizados}
                    orcamento={mediaEscola.orcamento}
                />

                : <p className="text-center">Não existe escola cadastrada!</p>}
            <Row>
                <Col>
                    <Card> {/*style={{ width: '18rem' }}*/}
                        <Card.Body>
                            <Card.Title><strong>Escolas cadastrados</strong></Card.Title>
                            <Card.Text>
                                {mediaEscola.quantidade}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card> {/*style={{ width: '18rem' }}*/}
                        <Card.Body>
                            <Card.Title><strong>Departamentos cadastrados</strong></Card.Title>
                            <Card.Text>
                                {mediaDepartamento.quantidade}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                <Card> {/*style={{ width: '18rem' }}*/}
                        <Card.Body>
                            <Card.Title><strong>Funcionarios cadastrados</strong></Card.Title>
                            <Card.Text>
                                {mediaFuncionario.quantidade}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                <Card> {/*style={{ width: '18rem' }}*/}
                        <Card.Body>
                            <Card.Title><strong>Eventos cadastrados</strong></Card.Title>
                            <Card.Text>
                                {mediaEvento.quantidade}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

    );
}