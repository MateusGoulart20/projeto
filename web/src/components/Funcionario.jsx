import { useEffect, useState } from "react";
import { Button, Card, Form, Modal, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Option } from "./Option";
import { Input } from "./Input";

import { getDepartamento } from '../services/departamento'


export function Funcionario(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();

    const [result, setResult] = useState(null);
    const [isUpdated, setIsUpdated] = useState(false);
    const [departamentos, setDepartamentos] = useState([]);
    const [departamento, setDepartamento] = useState([]);
    
    async function findDepartamentos() {
        try {
            const result = await getDepartamento();
            setDepartamentos(result.data);
            setDepartamento(result.data.filter((school) => school.id == props.info.departamento)[0]);
        } catch (error) {
            setResult({
                title: 'Houve um erro no login!',
                message: error.response.data.error,
            });
            setIsUpdated(false)
        }
    }

    async function editFuncionario(data) {
        try {
            console.log(data)
            await props.editFuncionario({ ...data, id: props.info.id });
        } catch (error) {
            setResult({
                title: 'Houve um erro no login!',
                message: error.response,
            });
            setIsUpdated(false)
        }
    }

    useEffect(() => {
        findDepartamentos();
    }, []);
    
    
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
                                <Col><strong>CPF: </strong>{props.info.CPF}</Col>
                                <Col><strong>Cargo: </strong>{props.info.cargo}</Col>
                                <Col><strong>Departamento: </strong>{departamento.nome}</Col>
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
                            name='nomeF'
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
                            name='CPFF'
                            error={errors.CPF}
                            validations={register('CPF', {
                                required: {
                                    value: true,
                                    message: 'CPF do funcionario obrigatório.'
                                }
                            })}
                            valueDefault={props.info.CPF}
                        />
                        <Form.Group className="mb-3">
                            <Form.Label>Cargo do funcionário</Form.Label>
                            <Form.Select {...register('cargo')}>
                                <option disabled>Clique para selecionar</option>
                                <option value="professor">Professor</option>
                                <option value="limpeza">Limpeza</option>
                                <option value="secretario">Secretário</option>
                                
                                
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Grau acadêmico do funcionario</Form.Label>
                            <Form.Select {...register('grau_academico')}>
                                <option disabled>Clique para selecionar</option>
                                <option value="Ensino Medio Completo">Ensino Médio Completo</option>
                                <option value="Ensino Medio Profissionalizante Completo">Ensino Médio Profissionalizante Completo</option>
                                <option value="Superior Interrompida">Formação Superior Interrompida</option>
                                <option value="Superior Cursando">Formação Superior Cursando</option>
                                <option value="Superior Completa">Formação Superior Completa</option>
                                <option value="Especializacao">Especialização</option>
                                <option value="Mestrado">Mestrado</option>
                                <option value="Doutorado">Doutorado</option>
                                <option value="Pos-Doutorado">Pós-Doutorado</option>
                            </Form.Select>
                        </Form.Group>
                        
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
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Seleciona o Departamento</Form.Label>
                            <Form.Select {...register('departamento')}>
                                <option disabled>Clique para selecionar</option>
                                {departamentos && departamentos.length > 0
                                    ? departamentos.map((departamento, index) => (
                                        <Option
                                            key={index}
                                            id={departamento.id}
                                            nome={departamento.nome}
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
