import { Form, Button, Modal, Row, Col, Container, } from "react-bootstrap";
import { useNavigate } from "react-router-dom";// Link, 
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


import { Input } from "../components/Input";
import { Funcionario } from "../components/Funcionario";
import { Header } from '../components/Header';
import { Navexample } from '../components/Navexample';
import { Option } from "../components/Option";
import { Modaly } from '../components/Modaly';

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
    const [isCreated, setIsCreated] = useState(false);

    useEffect(() => {
        findFuncionarios();
        findDepartamentos();
    }, []);

    function clearQuery(){
        document.querySelector("#nome").value = ""
        document.querySelector("#CPF").value = ""
        document.querySelector("#cargo").value = ""
    }

    async function findDepartamentos() {
        try {
            const result = await getDepartamento();
            setDepartamentos(result.data);
        } catch (error) {
            setResult({
                title: 'Houve um erro no login!',
                message: error.response.data.error,
            });
            setIsCreated(false)
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
            const result = await getFuncionario(data);
            setFuncionarios(result.data);

        } catch (error) {
            setResult({
                title: 'Houve um erro no login!',
                message: error.response,
            });
            console.log(error)
            setIsCreated(false)
            
        }
    }

    async function removeFuncionario(data) {
        try {
            await delFuncionario(data);
            clearQuery();
            await findFuncionarios();
        } catch (error) {
            setResult({
                title: 'Houve um erro na remoção!',
                message: error.response.data.error,
            });
            setIsCreated(false)
        }
    }
    async function addFuncionario(data) {
        try {
            await crtFuncionario(data);
            clearQuery();
            setIsCreated(false);
            await findFuncionarios();
        } catch (error) {
            setIsCreated(false);
            setResult({
                title: 'Houve um erro no adicionar!',
                message: error.response.data.error,
            });
            
        }
    }
    async function editFuncionario(data) {
        try {
            await putFuncionario(data);
            clearQuery();
            await findFuncionarios();
        } catch (error) {
            setResult({
                title: 'Houve um erro na edição!',
                message: error.response.data.error,
            });
            setIsCreated(false)
        }
    }


    return (
        <Container>
            <Modaly
                show={result}
                title={result?.title}
                message={result?.message}
                handleClose={() => setResult(null)}
            />
            <Navexample />
            <Header title="Funcionarios" color="#FFFFFF" bcolor="#1F69D7" />
            <Form
                noValidate
                onSubmit={handleSubmit(findFuncionarios)}
                className="bg-light rounded p-5 shadow w-50 m-auto"
            >
                <Row>
                    <Input
                        className="mb-4"
                        label="Nome"
                        type="text"
                        placeholder="Nome do funcionario"
                        //error={errors.nome}
                        name="nome"
                        //validations={register('nome',                        )}
                    >
                    </Input>
                    <Input
                        className="mb-4"
                        label="CPF"
                        type="text"
                        placeholder="CPF do funcionario"
                        //error={errors.CPF}
                        name="CPF"
                        //validations={register('CPF',                        )}
                    >
                    </Input>
                    <Form.Group className="mb-3">
                            <Form.Label>Cargo do funcionário</Form.Label>
                            <Form.Select {...register('cargo')} id="cargo">
                                <option value="">Clique para selecionar</option>
                                <option value="professor">Professor</option>
                                <option value="limpeza">Limpeza</option>
                                <option value="secretario">Secretário</option>
                                
                                
                            </Form.Select>
                        </Form.Group>

                    <br />
                    <br />

                </Row>
                <Row>
                    <Col md='5'><Button variant="primary" onClick={() => findFuncionarios()}>Buscar</Button></Col>
                    <Col md='7'><Button onClick={() => setIsCreated(true)}>Criar novo Funcionario</Button></Col>


                </Row>
            </Form>
            <br />
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
                                    : <></>}
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
