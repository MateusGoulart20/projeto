import { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "./Input";

export default function Merendeira(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);

    async function editMerendeira(data) {
        await props.editMerendeira({ ...data, id: props.merendeira.id });
        setIsUpdated(false);
    }

    return (
        <>
            <Card className="mb-3 p-3 bg-light glow">
                <Card.Title><b>Nome: </b>{props.merendeira.nome}</Card.Title>
                <Row xs="auto" className="d-flex justify-content-end">
                    <Button variant="secondary ef-glow" onClick={() => setIsUpdated(true)}>Editar</Button>
                    <Button 
                        variant="outline-danger"
                        className="ms-3 ef-glow"
                        onClick={props.removeMerendeira}
                    >
                        Apagar
                    </Button>
                </Row>
            </Card>
            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Editar merendeira: {props.merendeira.nome}</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(editMerendeira)} validated={!!errors}>
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            type='text'
                            defaultValue={props.merendeira.nome}
                            label='Nome da Merendeira'
                            placeholder='Insira o nome da Merendeira'
                            required={true}
                            name='nome'
                            error={errors.nome}
                            validations={register('nome', {
                                required: {
                                    value: true,
                                    message: 'Nome da Merendeira é obrigatório.'
                                }
                            })}
                        />
                    </Modal.Body>
                    <Modal.Footer >
                        <Button variant="primary" type="submit" className="ef-glow">
                            Salvar
                        </Button>
                        <Button variant="secondary" onClick={() => setIsUpdated(false)} className="ef-glow">
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}
