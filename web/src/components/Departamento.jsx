import { useState } from "react";
import { Button, Card, Form, Modal, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "./Input";

export function Departamento(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);

    async function editEscola(data) {
        await props.editEscola({ ...data, id: props.info.id });
        setIsUpdated(false);
    }

    return (
        <>
            <Card className="mb-3 p-3 bg-light">
                <Row>
                    <Col md='9' className="d-flex justify-content-start">
                        <Card.Title>
                            <Col><strong>Nome: </strong>{props.info.nome}</Col>
                            <Col><strong>Sala: </strong>{props.info.sala}</Col>
                            <Col><strong>Escola: </strong>{props.info.escola}</Col>
                            
                            
                            
                            {/*<strong>E-mail: </strong>{props.info.email_contato}*/}
                        </Card.Title>
                        <Card.Text> </Card.Text>
                    </Col>
                    <Col md='3' className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={() => setIsUpdated(true)}>Editar</Button>
                        <Button
                            variant="outline-danger"
                            className="ms-3"
                            onClick={props.removeEscola}
                        >
                            Apagar
                        </Button>
                    </Col>
                </Row>
            </Card>
            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Editar departamento: {props.info.nome}</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(editEscola)} validated={!!errors}>
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            type='text'
                            label='Nome do departamento'
                            placeholder='Insira o nome do departamento'
                            required={true}
                            name='nome'
                            error={errors.nome}
                            validations={register('nome', {
                                required: {
                                    value: true,
                                    message: 'Nome da departamento obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='text'
                            label='Sala do departamento'
                            placeholder='Insira o nome da departamento'
                            required={true}
                            name='sala'
                            error={errors.nome}
                            validations={register('sala', {
                                required: {
                                    value: true,
                                    message: 'Nome da departamento obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='number'
                            label='Numero da escola do departamento'
                            placeholder='Insira número da escola do departamento'
                            required={true}
                            name='escola'
                            error={errors.orcamento}
                            validations={register('escola', {
                                required: {
                                    value: true,
                                    message: 'Número da escola do departamento obrigatório.'
                                }
                            })}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Editar
                        </Button>
                        <Button variant="secondary" onClick={() => setIsUpdated(false)}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}
