import { Container, Col, Modal, Form, Button, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

import Merendeira from "../components/Merendeira";
import { Header } from "../components/Header";
import { Input } from '../components/Input';

import { createMerendeira, deleteMerendeira, getMerendeiras, updateMerendeira } from "../services/merendeira-service";

export function Merendeiras() {
    const [merendeiras, setMerendeiras] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        findMerendeiras();
        // eslint-disable-next-line

        //// Redimensionar
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 600);
        };

        // Verifica o tamanho da tela quando o componente é montado
        handleResize();

        // Adiciona um listener para verificar o tamanho da tela quando a janela é redimensionada
        window.addEventListener('resize', handleResize);

        // Remove o listener quando o componente é desmontado
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    async function findMerendeiras() {
        try {
            const result = await getMerendeiras();
            setMerendeiras(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function removeMerendeira(id) {
        try {
            await deleteMerendeira(id);
            await findMerendeiras();
        } catch (error) {
            console.error(error);
        }
    }

    async function addMerendeira(data) {
        try {
            await createMerendeira(data);
            setIsCreated(false);
            await findMerendeiras();
        } catch (error) {
            console.error(error);
        }
    }

    async function editMerendeira(data) {
        try {
            await updateMerendeira({
                id: data.id,
                nome: data.nome,
            });
            await findMerendeiras();
        } catch (error) {
            console.error(error);
        }
    }


    
    return (
        <Container fluid>
            <Header title="Merendeiras" color="#ff0" className="glow"/>
            <Row className={`${isSmallScreen ? 'w-75' : 'w-50'} m-auto mb-5 mt-5`}>
                <Col>
                    <Button className="ef-glow" onClick={() => setIsCreated(true)}>Cadastrar Merendeira</Button>
                </Col>
            </Row>
            <Col className={`${isSmallScreen ? 'w-75' : 'w-50'} m-auto`}>
                {merendeiras && merendeiras.length > 0
                    ? merendeiras.map((merendeira, index) => (
                        < Merendeira
                            key={index}
                            merendeira={merendeira}
                            removeMerendeira={async () => await removeMerendeira(merendeira.id)}
                            editMerendeira={editMerendeira}
                        />
                    ))
                    : <p className="text-center" styles="{color: #fff}">Não existe nenhuma Merendeira cadastrada!</p>}
            </Col>
            <Modal show={isCreated} onHide={() => setIsCreated(false)}>
                <Modal.Header>
                    <Modal.Title>Cadastrar nova Merendeira</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(addMerendeira)} validated={!!errors}>
                    <Modal.Body>
                        <Input
                            className="mb-3 ef-glow"
                            type='text'
                            label='Nome da Merendeira'
                            placeholder='Insira o nome da Merendeira'
                            required={true}
                            name='nome'
                            error={errors.nameMerendeira}
                            validations={register('nome', {
                                required: {
                                    value: true,
                                    message: 'Nome da Merendeira é obrigatório.'
                                }
                            })}
                        />
                    </Modal.Body>
                    <Modal.Footer className={`d-flex ${isSmallScreen ? 'flex-column' : 'flex-row'}`}>
                        <Button variant="primary" type="submit" className="ef-glow">
                            Criar
                        </Button>
                        <Button variant="secondary" onClick={() => setIsCreated(false)} className="ef-glow">
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
}
