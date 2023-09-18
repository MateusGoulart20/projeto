import { Form, Button, Modal, Row, Col, Container, } from "react-bootstrap";
import { useNavigate } from "react-router-dom";// Link, 
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Card from 'react-bootstrap/Card';

import { Input } from "../components/Input";
import { Evento } from "../components/Evento";
import { Header } from '../components/Header';
import { Navexample } from '../components/Navexample';

// import { loginUser } from '../services/user-services';
import { getEvento, crtEvento, putEvento, delEvento } from '../services/evento';

export function Eventos() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    // Zona para tentar pegar a lista de eventos
    const [eventos, setEventos] = useState([]);

    async function findEventos() {
        try {
            
            let data = {
                nome: document.querySelector("#nome").value,
                CNPJ: document.querySelector("#sala").value,
            }
            console.log()
            const result = await getEvento(data);
            console.log(result.data)
            setEventos(result.data);
            
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    useEffect(() => {
        findEventos();
    }, []);

    const recuperar = async (data) => {
        try {
            const list = await getEvento(data);
        } catch (error) {
            setResult({
                title: 'Houve um erro no login!',
                message: error.response.data.error,
            });
        }
    }

    const [isCreated, setIsCreated] = useState(false);

    async function removeEvento(data) {
        try {
            await delEvento(data);
            await findEventos();
        } catch (error) {
            console.error(error);
        }
    }

    async function addEvento(data) {
        try {
            console.log(data)
            await crtEvento(data);
            setIsCreated(false);
            await findEventos();
        } catch (error) {
            console.error(error);
        }
    }

    async function editEvento(data) {
        try {
            await putEvento(data);
            document.querySelector("#nome").value =""
            document.querySelector("#local").value =""
            await findEventos();
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <Container fluid>
            <Navexample
            />
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
                    >
                    </Input>
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
                    >
                    </Input>
					
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
                        />
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
