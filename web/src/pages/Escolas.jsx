import { Form, Button, Row, Col, Container, } from "react-bootstrap";
import { useNavigate } from "react-router-dom";// Link, 
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Card from 'react-bootstrap/Card';

import { Input } from "../components/Input";
import { Escola } from "../components/Escola";
import { Header } from '../components/Header';
import { Navexample } from '../components/Navexample';
import { Modal } from '../components/Modal';

// import { loginUser } from '../services/user-services';
import { get, crt, put, del } from '../services/escola';

export function Escolas() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    // Zona para tentar pegar a lista de escolas
    const [escolas, setEscolas] = useState([]);
    const [media, setMedia] = useState([]);

    async function findEscolas(data) {
        try {
            const result = await get(data);
            console.log(result.data)
            setEscolas(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    useEffect(() => {
        console.log('bora')
        findEscolas(null);
        console.log('bora')
        // eslint-disable-next-line
    }, []);
    // Fim de zona

    const onSubmit = async (data) => {
        try {
            //const user = await lgn(data);
            setResult(data);
            navigate('/home');
        } catch (error) {
            setResult({
                title: `'Houve um erro no login! ${error}'`,
                message: error.response.data.error,
            });
        }
    }
    const recuperar = async (data) => {
        try {
            const list = await get(data);
        } catch (error) {
            setResult({
                title: 'Houve um erro no login!',
                message: error.response.data.error,
            });
        }
    }

    //const [foods, setFoods] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    
    /*

    useEffect(() => {
        findEscolas();
        // eslint-disable-next-line
    }, []);

    async function findEscolas() {
        try {
            const result = await getFoods();
            setFoods(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }
    */
    async function removeEscola(data) {
        try {
            await del(data);
            await findEscolas();
        } catch (error) {
            console.error(error);
        }
    }

    async function addEscola(data) {
        try {
            await crt(data);
            setIsCreated(false);
            await findEscolas();
        } catch (error) {
            console.error(error);
        }
    }

    async function editEscola(data) {
        try {
            await put(data);
            await findEscolas();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container fluid>
            <Navexample
            />
            <Header title="Escolas" color="#FFFFFF" bcolor="#1F69D7" />
            {escolas && escolas.length > 0
                ?
                escolas.map((escola, index) => (
                    <Escola
                        key={index}
                        info={escola}
                    removeEscola={async () => await removeEscola(food.id)}
                    editEscola={editEscola}
                    />
                ))

                : <p className="text-center">Não existe escola cadastrada!</p>
            }
            <Modal show={isCreated} onHide={() => setIsCreated(false)}>
                <Modal.Header>
                    <Modal.Title>Cadastrar novo alimento</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(addEscola)} validated={!!errors}>
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            type='text'
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
                            <Form.Select {...register('unity')}>
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
/*
<Container

        >
            <Modal
                show={result}
                title={result?.title}
                message={result?.message}
                handleClose={() => setResult(null)}
            />
            <Header title="Visão Geral" />
            <Row className="d-flex">
                <Container
                    className="bg-light rounded p-5 shadow  m-auto"
                    
                >
                    <br />
                    <br />
                    <div className="d-flex justify-content-between">
                        <Button type="submit">Criar</Button>
                        <Link to="/registro">Criar conta</Link>
                    </div>
                </Container>
                
                <Container
                    className="bg-light rounded p-5 shadow w-40 m-auto"
                >
                    <br />
                    <br />
                    <div className="d-flex justify-content-between">
                        <Button type="submit">Criar</Button>
                        <Link to="/registro">Criar conta</Link>
                    </div>
                </Container>
            </Row>

        </Container>
*/