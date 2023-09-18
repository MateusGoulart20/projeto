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
import { getEscola } from '../services/escola';
import { viewEscola } from '../services/escola';
import { Relacao } from "../components/Relacao";

export function Principal() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    // Zona para tentar pegar a lista de escolas
    const [escolas, setEscolas] = useState([]);
    const [media, setMediaEscola] = useState([]);
    async function findFoods() {
        try {
            const result = await getEscola();
            setEscolas(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }
    async function findMediaEscola() {
        try {
            const result = await viewEscola();
            console.log(result)
            console.log(result.data)
            setMediaEscola(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }
    useEffect(() => {
        findMediaEscola();
        findFoods();
    }, []);
    return (
        <Container fluid>
            <Navexample
            />
            <Header title="Visão Estatística" color="#FFFFFF" bcolor="#1F69D7" />
            {media && media.quantidade>0
                ?
                <Relacao
                    quantidade={media.quantidade}
                    administrativos={media.quantidade_administrativos}
                    estudantes={media.quantidade_estudantes}
                    professores={media.quantidade_professores}
                    salas={media.quantidade_salas}
                    tercerizados={media.quantidade_tercerizados}
                    orcamento={media.orcamento}
                />

                : <p className="text-center">Não existe escola cadastrada!</p>}
        </Container>

    );
}