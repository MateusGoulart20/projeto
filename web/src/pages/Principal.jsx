import { Button, Row, Col, Container, } from "react-bootstrap";// Form,
import { useNavigate } from "react-router-dom";// Link, 
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Card from 'react-bootstrap/Card';

//import { Input } from "../components/Input";
import { Escola } from "../components/Escola";
import { Header } from '../components/Header';
import { Navexample } from '../components/Navexample';
//import { Modal } from '../components/Modal';

// import { loginUser } from '../services/user-services';
import { get } from '../services/escola';
import { getView } from '../services/escola';
import { Relacao } from "../components/Relacao";

export function Principal() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    // Zona para tentar pegar a lista de escolas
    const [escolas, setEscolas] = useState([]);
    const [media, setMedia] = useState([]);
    async function findFoods() {
        try {
            const result = await get();
            setEscolas(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }
    async function findMedia() {
        try {
            const result = await getView();
            console.log(result)
            console.log(result.data)
            setMedia(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }
    useEffect(() => {
        findMedia();
        findFoods();
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
    /*
    const [isCreated, setIsCreated] = useState(false);
    //const { handleSubmit, register, formState: { errors } } = useForm();
    //const navigate = useNavigate();

    useEffect(() => {
        findFoods();
        // eslint-disable-next-line
    }, []);

    async function findFoods() {
        try {
            const result = await getFoods();
            setFoods(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    async function removeFood(id) {
        try {
            await deleteFood(id);
            await findFoods();
        } catch (error) {
            console.error(error);
        }
    }

    async function addFood(data) {
        try {
            //await createFood(data);
            //setIsCreated(false);
            //await findFoods();
        } catch (error) {
            console.error(error);
        }
    }

    async function editFood(data) {
        try {
            /*await updateFood({
                id: data.id,
                nameFood: data.nameFood,
                unity: data.unity
            });
            await findFoods();
        } catch (error) {
            console.error(error);
        }
    }*/

    return (
        <Container fluid>
            <Navexample
            />
            <Header title="Visão Estatística" color="#FFFFFF" bcolor="#1F69D7" />
            {/*<Row className="w-50 m-auto mb-2 mt-1 ">
                <Col md='5'>
                    <Button onClick={() => setIsCreated(true)}>Criar novo alimento</Button>
                </Col>
                <Col md='3'></Col>
                <Col md='4'>
                    <Button variant="outline-secondary" onClick={() => {
                        sessionStorage.removeItem('token');
                        navigate('/');
                    }}>Sair</Button>
                </Col>
                </Row>*/}
            {media && media.quantidade>0
                ?
                <Relacao
                    quantidade={media.quantidade}
                    administrativos={media.quantidade_administrativos}
                    estudantes={media.quantidade_estudantes}
                    professores={media.quantidade_professores}
                    salas={media.quantidade_salas}
                    tercerizados={media.quantidade_tercerizados}
                />

                : <p className="text-center">Não existe escola cadastrada!</p>}{/*

                    <Escola
                    //escolas.map((food, index) => (
                        //key={index}
                        //food={food}
                        //removeFood={async () => await removeFood(food.id)}
                        //editFood={editFood}
                        //))
                        />
                */}
            {/*<Card style={{ width: '50%' }}>
                <Card.Body >
                    <Card.Title className="">Relações das escolas</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                        {media.toString}

                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
            </Card>
            <Col className="w-50 m-auto">
                {escolas && escolas.length > 0
                    ? escolas.map((food, index) => (
                        <Escola
                            key={index}
                            food={food}
                        //removeFood={async () => await removeFood(food.id)}
                        //editFood={editFood}
                        />
                    ))
                    : <p className="text-center">Não existe nenhum alimento cadastrado!</p>}
            </Col>
            <div>
                <header>
                    <div>
                        <script title="oNlineWebFonts" src="https://db.onlinewebfonts.com/animations/icons/406982.js" type="text/javascript"></script>
                        <bold>Visão</bold>
                    </div>
                </header>

            </div>*/}
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