import { useEffect, useState } from "react";
import { Container, Col, Button, Row } from "react-bootstrap";
//import { Container, Col, Modal, Form, Button, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
//import { useForm } from 'react-hook-form';

import { Food } from "../components/Food";
import { Header } from "../components/Header";
//import { Input } from '../components/Input';

import {  getFoods } from "../services/food-service";
//import { createFood, deleteFood, getFoods, updateFood } from "../services/food-service";

export function FoodsRead() {
    const [foods, setFoods] = useState([]);
//    const [isCreated, setIsCreated] = useState(false);
//    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        findFoods();
        // eslint-disable-next-line

        //// Redimensionar
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 600);
        };

        // Verifica o tamanho da tela quando o componente é montado
        handleResize();

        // Adiciona um listener para verificar o tamanho da tela quando a janela é redimensionada
        window.addEventListener('resize', handleResize);

        // Remove o listener quando o componente é desmontado
        return () => {
            window.removeEventListener('resize', handleResize);
        };
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
/*
    async function removeFood(id) {
        try {
            await deleteFood(id);
            await findFoods();
        } catch (error) {
            console.error(error);
        }
    }
*//*
    async function addFood(data) {
        try {
            await createFood(data);
            setIsCreated(false);
            await findFoods();
        } catch (error) {
            console.error(error);
        }
    }
*//*
    async function editFood(data) {
        try {
            await updateFood({
                id: data.id,
                nameFood: data.nameFood,
                unity: data.unity
            });
            await findFoods();
        } catch (error) {
            console.error(error);
        }
    }
*/

    
    return (
        <Container fluid>
            <Header title="Alimentos (Read)" color="#fff" />
            <Row className={`${isSmallScreen ? 'w-75' : 'w-50'} m-auto mb-5 mt-5`
            /*
            <Col md='10'>
                    <Button onClick={() => setIsCreated(true)}>Criar novo alimento</Button>
            </Col>
            */
            }>
                <Col md='10'>
                    <Link to="/update">Atualizações</Link>
                </Col>
                <Col md='2'>
                    <Button variant="secondary" onClick={() => {
                        sessionStorage.removeItem('token');
                        navigate('/');
                    }}>Sair</Button>
                </Col>
            </Row>
            <Col className={`${isSmallScreen ? 'w-75' : 'w-50'} m-auto`}>
                {foods && foods.length > 0
                    ? foods.map((food, index) => (
                        <Food
                            key={index}
                            food={food
                            //removeFood={async () => await removeFood(food.id)}
                            //editFood={editFood}
                            }                            
                        />
                    ))
                    : <p className="text-center">Não existe nenhum alimento cadastrado!</p>}
            </Col>
        </Container>
    );
}
