import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../components/Input";
import { Header } from '../components/Header';
import { Modal } from '../components/Modal';

import { loginUser } from '../services/user-services';

export function Login() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const navigate = useNavigate();
    var user
    const onSubmit = async (data) => {
        try {
            //console.log('uncione')
            user = '111'
            user = await loginUser(data);
            setResult(user);
            //navigate('/foods');
        } catch (error) {
            setResult({
                title: 'Houve um erro no login!',
                message: error.response.data.error,
            });
        }
    }

    return (
        <Container>
            <Modal
                show={result}
                title={result?.title}
                message={result?.message}
                handleClose={() => setResult(null)}
            />
            <Header title={user + "Entre na sua conta"} />
            <Form
                noValidate
                validated={!!errors}
                onSubmit={handleSubmit(onSubmit)}
                className="bg-light rounded p-5 shadow w-50 m-auto"
            >
                <Col>
                
                    <Input
                        className="mb-4"
                        label="CPF"
                        type="text"
                        placeholder="Insira seu e-mail"
                       
                        required={true}
                        name="CPF"
                        /*validations={register('CPF', {
                            required: {
                                value: true,
                                message: 'E-mail é obrigatório'
                            },
                            pattern: {
                                value: /^[0-9][0-9][0-9]\.[0-9][0-9][0-9]\.[0-9][0-9][0-9]\.-[0-9][0-9]$/,
                                message: 'E-mail inválido!'
                            }
                        })}*/
                    />
                    <Input
                        className="mb-4"
                        label="Senha"
                        type="password"
                        placeholder="Insira sua senha"
                        
                        required={true}
                        name="password"
                        validations={register('password', {
                            required: {
                                value: true,
                                message: 'Senha é obrigatório'
                            }
                        })}
                    />
                    <div className="d-flex justify-content-between">
                        <Button type="submit">Entrar</Button>
                        <Link to="/register">Criar conta</Link>
                    </div>
                </Col>
            </Form>
        </Container>
    );
}
