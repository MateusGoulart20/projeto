import { Form, Button, Modal, Row, Col, Container, } from "react-bootstrap";
import { useNavigate } from "react-router-dom";// Link, 
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Card from 'react-bootstrap/Card';

import { Input } from "../components/Input";
import { Departamento } from "../components/Departamento";
import { Header } from '../components/Header';
import { Navexample } from '../components/Navexample';
import { Option } from "../components/Option";

// import { loginUser } from '../services/user-services';
import { getDepartamento, crtDepartamento, putDepartamento, delDepartamento } from '../services/departamento';
import { getEscola } from '../services/escola'

export function Departamentos() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const navigate = useNavigate();
    
    const [escolas, setEscolas] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [isCreated, setIsCreated] = useState(false);


    async function findEscolas() {
        try {
            const result = await getEscola();
            setEscolas(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    async function findDepartamentos() { // Zona para tentar pegar a lista de departamentos
        try {

            let data = {
                nome: document.querySelector("#nome").value,
                CNPJ: document.querySelector("#sala").value,
            }
            //console.log()
            const result = await getDepartamento(data);
            //console.log(result.data)
            setDepartamentos(result.data);

        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    useEffect(() => {
        findDepartamentos();
        findEscolas();
    }, []);


    async function removeDepartamento(data) {
        try {
            await delDepartamento(data);
            await findDepartamentos();
        } catch (error) {
            console.error(error);
        }
    }

    async function addDepartamento(data) {
        try {
            //console.log(data)
            await crtDepartamento(data);
            setIsCreated(false);
            document.querySelector("#nome").value = null
            document.querySelector("#sala").value = null    
            await findDepartamentos();
        } catch (error) {
            console.error(error);
        }
    }

    async function editDepartamento(data) {
        try {
            await putDepartamento(data);
            document.querySelector("#nome").value =null
            document.querySelector("#CNPJ").value =null
            await findDepartamentos();
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <Container fluid>
            <Navexample
            />
            <Header title="Departamentos" color="#FFFFFF" bcolor="#1F69D7" />
            <Form
                noValidate
                //validated={!!errors}
                onSubmit={handleSubmit(findDepartamentos)}
                className="bg-light rounded p-5 shadow w-50 m-auto"
            >
                <Row>
                    <Input
                        className="mb-4"
                        label="Nome"
                        type="text"
                        placeholder="Nome da departamento"
                        error={errors.nome}
                        //required={false}
                        name="nome"
                        validations={register('nome',
                            //{required: {value: false}, message: 'obrigatório'}
                        )}
                    >
                    </Input>
                    <Input
                        className="mb-4"
                        label="Sala"
                        type="text"
                        placeholder="CNPJ da departamento"
                        error={errors.CNPJ}
                        //required={false}
                        name="sala"
                        validations={register('sala',
                            //{required: {value: false}, message: 'obrigatória'}
                        )}
                    >
                    </Input>

                    <br />
                    <br />

                </Row>
                <Row>
                    <Col md='5'><Button variant="primary" onClick={() => findDepartamentos()}>Buscar</Button></Col>
                    <Col md='7'><Button onClick={() => setIsCreated(true)}>Criar novo Departamento</Button></Col>


                </Row>
            </Form>
            <br />
            {departamentos && departamentos.length > 0
                ?
                departamentos.map((departamento, index) => (
                    <Departamento
                        key={index}
                        info={departamento}
                        removeDepartamento={async () => await removeDepartamento(departamento)}
                        editDepartamento={editDepartamento}
                    />
                ))

                : <p className="text-center">Não existe departamento cadastrada!</p>
            }
            <Modal show={isCreated} onHide={() => setIsCreated(false)}>
                <Modal.Header>
                    <Modal.Title>Cadastrar nova departamento</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(addDepartamento)} validated={!!errors}>
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
                        <Form.Group className="mb-3">
                            <Form.Label>Seleciona a Unidade Federativa</Form.Label>
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
                        {/*
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
                        />*/}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Criar
                        </Button>
                        <Button variant="secondary" onClick={() => setIsCreated(false)}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>

    );
}
