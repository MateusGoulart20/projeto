import { useState } from "react";
import { Button, Card, Form, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "./Input";

export function Relacao(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);

    async function editFood(data) {
        await props.editFood({ ...data, id: props.food.id });
        setIsUpdated(false);
    }

    return (
        <>
            <Row>
                <Col>
                    <Card className="mb-3 p-3 bg-light w-75 mx-auto">
                        <Card.Title className="mx-auto"><strong>Totais</strong></Card.Title>
                        <Card.Text>
                            <strong>Professores: </strong>{props.professores}<br />
                            <strong>Administrativos: </strong>{props.administrativos}<br />
                            <strong>Tercerizados: </strong>{props.tercerizados}<br />
                            <strong>Estudantes: </strong>{props.estudantes}<br/>
                            <strong>Orcamento: </strong>{props.orcamento}
                        </Card.Text>
                        {/*<Row xs="auto" className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={() => setIsUpdated(true)}>Editar</Button>
                    <Button
                    variant="outline-danger"
                    className="ms-3"
                    onClick={props.removeFood}
                    >
                    Apagar
                    </Button>
                </Row>*/}
                    </Card>
                </Col>
                <Col>
                    <Card className="mb-3 p-3 bg-light w-75 mx-auto">
                        <Card.Title className="mx-auto"><strong>Média: </strong>{props.quantidade}</Card.Title>
                        <Card.Text>
                            <strong>Professores: </strong>{props.professores / props.quantidade}<br />
                            <strong>Administrativos: </strong>{props.administrativos / props.quantidade}<br />
                            <strong>Tercerizados: </strong>{props.tercerizados / props.quantidade}<br />
                            <strong>Estudantes: </strong>{props.estudantes / props.quantidade}<br/>
                            <strong>Orcamento: </strong>{props.orcamento / props.quantidade}
                        </Card.Text>
                    </Card>
                </Col>
            </Row>
            {/*
            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Editar alimento: {props.food.nome}</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(editFood)} validated={!!errors}>
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            type='text'
                            defaultValue={props.food.nome}
                            label='Nome do alimento'
                            placeholder='Insira o nome do alimento'
                            required={true}
                            name='nameFood'
                            error={errors.nameFood}
                            validations={register('nameFood', {
                                required: {
                                    value: true,
                                    message: 'Nome do alimento é obrigatório.'
                                }
                            })}
                        />
                        <Form.Group>
                            <Form.Label>Seleciona a unidade de medida</Form.Label>
                            <Form.Select {...register('unity')} defaultValue={props.food.unidadeMedida}>
                                <option disabled>Clique para selecionar</option>
                                <option value={'Kilograma'}>Kilograma</option>
                                <option value={'Grama'}>Grama</option>
                                <option value={'Mililitro'}>Mililitro</option>
                                <option value={'Litro'}>Litro</option>
                            </Form.Select>
                        </Form.Group>
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
                        </Modal>*/}
        </>
    );
}
