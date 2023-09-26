import { useState } from "react";
import { Button, Card, Form, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "./Input";

export function Relacao(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);

    async function editFood(data) {
        await props.editFood({ ...data, id: props.food.id });
        setIsUpdated(false);
    }

    return (
        <>
            <Row>
                <Col>
                    <Card className="mb-3 p-3 bg-light mx-auto">
                        <Card.Title className="mx-auto"><strong>Valores totais de Escolas</strong></Card.Title>
                        <Card.Text>
                            <strong>Professores: </strong>{props.professores}<br />
                            <strong>Administrativos: </strong>{props.administrativos}<br />
                            <strong>Tercerizados: </strong>{props.tercerizados}<br />
                            <strong>Estudantes: </strong>{props.estudantes}<br/>
                            <strong>Orcamento: </strong>{props.orcamento}
                        </Card.Text>
                        
                    </Card>
                </Col>
                <Col>
                    <Card className="mb-3 p-3 bg-light mx-auto">
                        <Card.Title className="mx-auto"><strong>Valores médios de Escolas</strong></Card.Title>
                        <Card.Text>
                            <strong>Professores: </strong>{props.professores / props.quantidade}<br />
                            <strong>Administrativos: </strong>{props.administrativos / props.quantidade}<br />
                            <strong>Tercerizados: </strong>{props.tercerizados / props.quantidade}<br />
                            <strong>Estudantes: </strong>{props.estudantes / props.quantidade}<br/>
                            <strong>Orcamento: </strong>{props.orcamento / props.quantidade}
                        </Card.Text>
                    </Card>
                </Col>
            </Row>
            
        </>
    );
}
