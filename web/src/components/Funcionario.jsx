import { useState } from "react";
import { Button, Card, Form, Modal, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "./Input";

export function Funcionario(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);


    async function editFuncionario(data) {
        await props.editFuncionario({ ...data, id: props.info.id });
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
                                <Col><strong>CPF: </strong>{props.info.CPF}</Col>
                                <Col><strong>Cargo: </strong>{props.info.cargo}</Col>
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
                            onClick={props.removeFuncionario}
                        >
                            Apagar
                        </Button>
                    </Col>
                </Row>
            </Card>
            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Editar funcionario: {props.info.nome}</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(editFuncionario)} validated={!!errors}>
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            type='text'
                            label='Nome do funcionario'
                            placeholder='Insira o nome do funcionario'
                            required={true}
                            name='nome'
                            error={errors.nome}
                            validations={register('nome', {
                                required: {
                                    value: true,
                                    message: 'Nome da funcionario obrigatório.'
                                }
                            })}
                            valueDefault={props.info.nome}
                        />
                        <Input
                            className="mb-3"
                            type='text'
                            label='CPF do funcionario'
                            placeholder=''
                            required={true}
                            name='CPF'
                            error={errors.CPF}
                            validations={register('CPF', {
                                required: {
                                    value: true,
                                    message: 'CPF do funcionario obrigatório.'
                                }
                            })}
                            valueDefault={props.info.CPF}
                        />
                        <Input
                            className="mb-3"
                            type='text'
                            label='Cargo do funcionario'
                            placeholder=''
                            required={true}
                            name='cargo'
                            error={errors.cargo}
                            validations={register('cargo', {
                                required: {
                                    value: true,
                                    message: 'Cargo do funcionario obrigatório.'
                                }
                            })}
                            valueDefault={props.info.cargo}
                        />
                        <Input
                            className="mb-3"
                            type='text'
                            label='Grau acadêmico do funcionario'
                            placeholder=''
                            required={true}
                            name='grau_academico'
                            error={errors.cargo}
                            validations={register('grau_academico', {
                                required: {
                                    value: true,
                                    message: 'Grau acadêmico do funcionario obrigatório.'
                                }
                            })}
                            valueDefault={props.info.cargo}
                        />
                        <Input
                            className="mb-3"
                            type='number'
                            label='Carga horária do funcionario'
                            placeholder=''
                            required={true}
                            name='carga_horaria'
                            error={errors.carga_horaria}
                            validations={register('carga_horaria', {
                                required: {
                                    value: true,
                                    message: 'Carga horária do funcionario obrigatório.'
                                }
                            })}
                            valueDefault={props.info.carga_horaria}
                        />
                        <Input
                            className="mb-3"
                            type='datetime'
                            label='Ingresso'
                            placeholder=''
                            required={true}
                            name='data_ingresso'
                            error={errors.data_ingresso}
                            validations={register('data_ingresso', {
                                required: {
                                    value: true,
                                    message: 'Ingresso do funcionario obrigatório.'
                                }
                            })}
                            valueDefault={props.info.data_ingresso}
                        /><Input
                            className="mb-3"
                            type='datetime'
                            label='Egresso'
                            placeholder=''
                            required={true}
                            name='data_egresso'
                            error={errors.data_egresso}
                            validations={register('data_egresso', {
                                required: {
                                    value: true,
                                    message: 'Egresso do funcionario obrigatório.'
                                }
                            })}
                            valueDefault={props.info.data_egresso}
                        />
                        <Input
                            className="mb-3"
                            type='number'
                            label='Numero do departamento do funcionario'
                            placeholder='Insira número do departamento do funcionario'
                            required={true}
                            name='departamento'
                            error={errors.departamento}
                            validations={register('departamento', {
                                required: {
                                    value: true,
                                    message: 'Número do departamento do funcionario obrigatório.'
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
