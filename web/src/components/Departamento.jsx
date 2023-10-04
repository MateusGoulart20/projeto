import { useEffect, useState } from "react";
import { Button, Card, Form, Modal, Row, Col } from "react-bootstrap";//
import { useForm } from "react-hook-form";

import { Input } from "./Input";
import { Option } from "./Option";

import { getEscola } from '../services/escola'

export function Departamento(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();

    //Zona useSate
    const [isUpdated, setIsUpdated] = useState(false);
    const [result, setResult] = useState(null);

    const [escolas, setEscolas] = useState([]);
    const [escola, setEscola] = useState([]);

    useEffect(() => {
        findEscolas();
    }, []);

    async function findEscolas() {
        try {
            const result = await getEscola();
            setEscolas(result.data);
            setEscola(result.data.filter((school) => school.id == props.info.escola)[0])
        } catch (error) {
            console.log(error)
            setResult({
				title: 'Houve um erro em buscar escolas!',
				message: error,
			});
            setIsUpdated(false)
        }
    }

    async function editDepartamento(data) {
        await props.editDepartamento({ ...data, id: props.info.id });
        setIsUpdated(false);
    }

    return (
        <>  
            <Modal
				show={result}
				title={result?.title}
				message={result?.message}
				handleClose={() => setResult(null)}
			/>
            <Card className="mb-3 p-3 bg-light">
                <Row>
                    <Col md='10' className="d-flex justify-content-start">
                        <Card.Title>
                            <Row>
                                <Col><strong>Código: </strong>{props.info.id}</Col>
                                <Col><strong>Nome: </strong>{props.info.nome}</Col>
                                <Col><strong>Sala: </strong>{props.info.sala}</Col>
                                <Col><strong>Escola: </strong>{escola.nome}</Col>
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
                            onClick={props.removeDepartamento}
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
                <Form noValidate onSubmit={handleSubmit(editDepartamento)} validated={!!errors}>
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            type='text'
                            label='Nome do departamento'
                            placeholder='Insira o nome do departamento'
                            required={true}
                            name='nomeD'
                            error={errors.nome}
                            validations={register('nome', {
                                required: {
                                    value: true,
                                    message: 'Nome da departamento obrigatório.'
                                }
                            })}
                            valueDefault={props.info.nome}
                        />
                        <Input
                            className="mb-3"
                            type='text'
                            label='Sala do departamento'
                            placeholder='Insira o nome da departamento'
                            required={true}
                            name='salaD'
                            error={errors.nome}
                            validations={register('sala', {
                                required: {
                                    value: true,
                                    message: 'Nome da departamento obrigatório.'
                                }
                            })}
                            valueDefault={props.info.sala}
                        />
                        <Form.Group className="mb-3">
                            <Form.Label>Seleciona a Escola</Form.Label>
                            <Form.Select {...register('escola')}>
                                <option disabled>Clique para selecionar</option>
                                {escolas && escolas.length > 0
                                    ? escolas.map((escola, index) => (
                                        <Option
                                            key={index}
                                            id={escola.id}
                                            nome={escola.nome}
                                        />
                                    ))
                                    :<></>}
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
            </Modal>
        </>
    );
}
