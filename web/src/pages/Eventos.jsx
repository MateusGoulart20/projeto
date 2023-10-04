import { Form, Button, Modal, Row, Col, Container, } from "react-bootstrap";
import { useNavigate } from "react-router-dom";// Link, 
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//import Card from 'react-bootstrap/Card';

import { Input } from "../components/Input";
import { Evento } from "../components/Evento";
import { Header } from '../components/Header';
import { Navexample } from '../components/Navexample';
import { Option } from "../components/Option";
import { Modaly } from "../components/Modaly";

// import { loginUser } from '../services/user-services';
import { getEvento, crtEvento, putEvento, delEvento } from '../services/evento';
import { getDepartamento } from '../services/departamento'
import { getEscola } from '../services/escola'

export function Eventos() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();
    
    // Zona para tentar pegar a lista de eventos
    const [isCreated, setIsCreated] = useState(false);
    const [result, setResult] = useState(null); // Respostas genéricas
    
    const [eventos, setEventos] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [escolas, setEscolas] = useState([]);
    
    useEffect(() => {
        findEscolas();
        findEventos();
        findDepartamentos();
    }, []);

    function clearQuery(){
        document.querySelector("#nome").value =""
        document.querySelector("#local").value =""
    }

    async function findDepartamentos() {
        try {
            const list = await getDepartamento();
            setDepartamentos(list.data);
        } catch (error) {
            setResult({
                title: 'Houve um erro no login!',
                message: error.response.data.error,
            });
            console.log(error)
        }
    }
    async function findEscolas() {
        try {
            const list = await getEscola();
            setEscolas(list.data);
        } catch (error) {
            setResult({
                title: 'Houve um erro no login!',
                message: error,
            });
            console.log(error)
        }
    }
    async function findEventos() {
        try {
            
            let data = {
                nome: document.querySelector("#nome").value,
                local: document.querySelector("#local").value,
            }
            const list = await getEvento(data);
            setEventos(list.data);
        } catch (error) {
            setResult({
                title: 'Houve um erro na busca de eventos!',
                message: error.response.data.error,
            });
            console.log(error)
        }
    }
    async function addEvento(data) {
        try {
            await crtEvento(data);
            clearQuery();
            setIsCreated(false);
            await findEventos();
        } catch (error) {
            setResult({
				title: 'Houve um erro ao adicionar!',
				message: error.response.data.error,
			});
        }
    }
    async function editEvento(data) {
        try {
            await putEvento(data);
            clearQuery();
            await findEventos();
        } catch (error) {
            setResult({
                title: 'Houve um erro ao editar!',
                message: error.response.data.error,
            });
        }
    }
    async function removeEvento(data) {
        try {
            await delEvento(data);
            clearQuery();
            await findEventos();
        } catch (error) {
            setResult({
				title: 'Houve um erro ao remover!',
				message: error.response.data.error,
			});
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
            <Navexample/>
            <Header title="Eventos" color="#FFFFFF" bcolor="#1F69D7" />
            <Form
				noValidate
				//validated={!!errors}
				onSubmit={handleSubmit(findEventos)}
				className="bg-light rounded p-5 shadow w-50 m-auto"
			>
				<Row>					
                    <Input 
                        className="mb-4"
                        label="Nome"
                        type="text"
                        placeholder="Nome da evento"
                        error={errors.nome}
                        //required={false}
                        name="nome"
                        validations={register('nome', 
                        //{required: {value: false}, message: 'obrigatório'}
                        )}
                    />
                    <Input 
                        className="mb-4"
                        label="Local"
                        type="text"
                        placeholder="CNPJ da evento"
                        error={errors.CNPJ}
                        //required={false}
                        name="local"
                        validations={register('local', 
                        //{required: {value: false}, message: 'obrigatória'}
                        )}
                    />
					<br />
					<br />

				</Row>
                <Row>
<Col md='5'><Button variant="primary" onClick={() => findEventos()}>Buscar</Button></Col>
<Col md='7'><Button onClick={() => setIsCreated(true)}>Criar novo Evento</Button></Col>
                
                
                </Row>
			</Form>
            <br/>
            {eventos && eventos.length > 0
                ?
                eventos.map((evento, index) => (
                    <Evento
                        key={index}
                        info={evento}
                        removeEvento={async () => await removeEvento(evento)}
                        editEvento={editEvento}
                    />
                ))

                : <p className="text-center">Não existe evento cadastrada!</p>
            }
            <Modal show={isCreated} onHide={() => setIsCreated(false)}>
                <Modal.Header>
                    <Modal.Title>Cadastrar nova evento</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(addEvento)} validated={!!errors}>
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
                        />
                        <Input
                            className="mb-3"
                            type='text'
                            label='Local do evento'
                            placeholder='Insira o nome da evento'
                            required={true}
                            name='local'
                            error={errors.nome}
                            validations={register('local', {
                                required: {
                                    value: true,
                                    message: 'Nome da evento obrigatório.'
                                }
                            })}
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
                        />
                        <Form.Group className="mb-3">
                        <Form.Label>Seleciona a Escola</Form.Label>
                        <Form.Select>
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
