import { Form, Button, Modal, Row, Col, Container, } from "react-bootstrap";
import { useNavigate } from "react-router-dom";// Link, 
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


import { Input } from "../components/Input";
import { Funcionario } from "../components/Funcionario";
import { Header } from '../components/Header';
import { Navexample } from '../components/Navexample';
import { Option } from "../components/Option";

// import { loginUser } from '../services/user-services';
import { getFuncionario, crtFuncionario, putFuncionario, delFuncionario } from '../services/funcionario';
import { getDepartamento } from '../services/departamento'

export function Funcionarios() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    // Zona para tentar pegar a lista de funcionarios
    const [funcionarios, setFuncionarios] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);

    async function findDepartamentos() {
        try {
            const result = await getDepartamento();
            setDepartamentos(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    async function findFuncionarios() {
        try {
            
            let data = {
                nome: document.querySelector("#nome").value,
                CPF: document.querySelector("#CPF").value,
                cargo: document.querySelector("#cargo").value,
            }
            //console.log()
            const result = await getFuncionario(data);
            //console.log(result.data)
            setFuncionarios(result.data);
            
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    useEffect(() => {
        findFuncionarios();
        findDepartamentos();
    }, []);


    const [isCreated, setIsCreated] = useState(false);

    async function removeFuncionario(data) {
        try {
            await delFuncionario(data);
            await findFuncionarios();
        } catch (error) {
            console.error(error);
        }
    }

    async function addFuncionario(data) {
        try {
            //console.log(data)
            await crtFuncionario(data);
            setIsCreated(false);
            await findFuncionarios();
        } catch (error) {
            console.error(error);
        }
    }

    async function editFuncionario(data) {
        try {
            await putFuncionario(data);
            document.querySelector("#nome").value =""
            document.querySelector("#CNPJ").value =""
            await findFuncionarios();
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <Container fluid>
            <Navexample
            />
            <Header title="Funcionarios" color="#FFFFFF" bcolor="#1F69D7" />
            <Form
				noValidate
				//validated={!!errors}
				onSubmit={handleSubmit(findFuncionarios)}
				className="bg-light rounded p-5 shadow w-50 m-auto"
			>
				<Row>					
                    <Input 
                        className="mb-4"
                        label="Nome"
                        type="text"
                        placeholder="Nome do funcionario"
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
                        label="CPF"
                        type="text"
                        placeholder="CPF do funcionario"
                        error={errors.CPF}
                        //required={false}
                        name="CPF"
                        validations={register('CPF', 
                        //{required: {value: false}, message: 'obrigatória'}
                        )}
                    >
                    </Input>
                    <Input 
                        className="mb-4"
                        label="Cargo"
                        type="text"
                        placeholder="Cargo do funcionario"
                        error={errors.CPF}
                        //required={false}
                        name="cargo"
                        validations={register('cargo', 
                        //{required: {value: false}, message: 'obrigatória'}
                        )}
                    >
                    </Input>
					
					<br />
					<br />

				</Row>
                <Row>
<Col md='5'><Button variant="primary" onClick={() => findFuncionarios()}>Buscar</Button></Col>
<Col md='7'><Button onClick={() => setIsCreated(true)}>Criar novo Funcionario</Button></Col>
                
                
                </Row>
			</Form>
            <br/>
            {funcionarios && funcionarios.length > 0
                ?
                funcionarios.map((funcionario, index) => (
                    <Funcionario
                        key={index}
                        info={funcionario}
                        removeFuncionario={async () => await removeFuncionario(funcionario)}
                        editFuncionario={editFuncionario}
                    />
                ))

                : <p className="text-center">Não existe funcionario cadastrada!</p>
            }
            <Modal show={isCreated} onHide={() => setIsCreated(false)}>
                <Modal.Header>
                    <Modal.Title>Cadastrar nova funcionario</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(addFuncionario)} validated={!!errors}>
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
