import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../components/Input";
import { Header } from '../components/Header';
import { Modaly } from '../components/Modaly';

//import { loginUser } from '../services/user-services';
import { crt } from '../services/usuario';


export function Registro() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            
                const user = await crt(data);
                setResult(user);
                navigate('/home');
            
        } catch (error) {
            setResult({
                title: `'Houve um erro no cadastro!'`,
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
            <Header title="Gestão de Escolas" />
            <Form
                noValidate
                validated={!!errors}
                onSubmit={handleSubmit(onSubmit)}
                className="bg-light rounded p-5 shadow w-50 m-auto"
            >
                <Col>
                    <div className="">Registro</div>
                    <Input 
                        className="mb-4"
                        label="CPF"
                        type="text"
                        placeholder="Insira seu CPF {000.000.000-00}"
                        error={errors.cpf}
                        required={true}
                        name="CPF"
                        validations={register('CPF', {
                            required: {
                                value: true,
                                message: 'CPF é obrigatório'
                            },
                            
                        })}
                    >
                    </Input>
                    <Input 
                        className="mb-4"
                        label="Nome"
                        type="text"
                        placeholder="Insira seu nome"
                        error={errors.cpf}
                        required={true}
                        name="nome"
                        validations={register('nome', {
                            required: {
                                value: true,
                                message: 'Como devemos lhe chamar?'
                            }
                        })}
                    >
                    </Input>
                    <Input
                        className="mb-4"
                        label="Senha"
                        type="password"
                        placeholder="Insira sua senha"
                        error={errors.password}
                        required={true}
                        name="senha"
                        validations={register('senha', {
                            required: {
                                value: true,
                                message: 'Senha é obrigatório'
                            }
                        })}
                    />
                    <br/>
                    <br/>
                    <div className="d-flex justify-content-between">
                        <Button type="submit">Criar</Button>
                        <Link to="/">Já tenho conta</Link>
                    </div>
                </Col>
            </Form> 
        </Container>
    );
}