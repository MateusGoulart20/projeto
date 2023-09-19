import { useState } from "react";
import { Button, Card, Form, Modal, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "./Input";

export function Evento(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);


    async function editEvento(data) {
        await props.editEvento({ ...data, id: props.info.id });
        setIsUpdated(false);
    }

    return (
        <>
            <Card className="mb-3 p-3 bg-light">
                <Row>
                    <Col md='10' className="d-flex justify-content-start">
                        <Card.Title>
                            <Row>
                                <Col><strong>Código: </strong>{props.info.id}</Col>
                                <Col><strong>Nome: </strong>{props.info.nome}</Col>
                                <Col><strong>Local: </strong>{props.info.local}</Col>
                                <Col><strong>Departamento: </strong>{props.info.departamento}</Col>
                            </Row>



                            {/*<strong>E-mail: </strong>{props.info.email_contato}*/}
                        </Card.Title>
                        <Card.Text> </Card.Text>
                    </Col>
                    <Col md='2' className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={() => setIsUpdated(true)}>Editar</Button>
                        <Button
                            variant="outline-danger"
                            className="ms-3"
                            onClick={props.removeEvento}
                        >
                            Apagar
                        </Button>
                    </Col>
                </Row>
            </Card>
            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Editar evento: {props.info.nome}</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(editEvento)} validated={!!errors}>
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            type='text'
                            label='Nome do evento'
                            placeholder='Insira o nome do evento'
                            required={true}
                            name='nome'
                            error={errors.nome}
                            validations={register('nome', {
                                required: {
                                    value: true,
                                    message: 'Nome da evento obrigatório.'
                                }
                            })}
                            valueDefault={props.info.nome}
                        />
                        <Input
                            className="mb-3"
                            type='text'
                            label='Local do evento'
                            placeholder='Insira o nome da evento'
                            required={true}
                            name='local'
                            error={errors.local}
                            validations={register('local', {
                                required: {
                                    value: true,
                                    message: 'Nome da evento obrigatório.'
                                }
                            })}
                            valueDefault={props.info.local}
                        />
                        <Input
                            className="mb-3"
                            type='datetime'
                            label='Inicio'
                            placeholder=''
                            required={true}
                            name='comeco_evento'
                            error={errors.comeco_evento}
                            validations={register('comeco_evento', {
                                required: {
                                    value: true,
                                    message: 'Nome da evento obrigatório.'
                                }
                            })}
                            valueDefault={props.info.comeco_evento}
                        /><Input
                            className="mb-3"
                            type='datetime'
                            label='Término'
                            placeholder=''
                            required={true}
                            name='fim_evento'
                            error={errors.fim_evento}
                            validations={register('fim_evento', {
                                required: {
                                    value: true,
                                    message: 'Nome da evento obrigatório.'
                                }
                            })}
                            valueDefault={props.info.fim_evento}
                        />
                        <Input
                            className="mb-3"
                            type='number'
                            label='Numero do departamento do evento'
                            placeholder='Insira número do departamento do evento'
                            required={true}
                            name='departamento'
                            error={errors.departamento}
                            validations={register('departamento', {
                                required: {
                                    value: true,
                                    message: 'Número do departamento do evento obrigatório.'
                                }
                            })}
                            valueDefault={props.info.departamento}
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