import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

//import { Input } from "../components/Input";
import { Header } from '../components/Header';
import { Modal } from '../components/Modal';

// import { loginUser } from '../services/user-services';
import { lgn } from '../services/usuario';

export function Llogin() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const user = await lgn(data);
            setResult(data);
            navigate('/home');
        } catch (error) {
            setResult({
                title: 'Houve um erro no login!',
                message: error.response.data.error,
            });
        }
    }

    return (
        <Container
            
        >
            <Modal
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
                    <div>CPF</div>
                    <input
                     type="text"
                     name="CPF"
                     id=""
                     label="CPF"
                     placeholder="000.000.000-00"
                     pattern="/^[0-9][0-9][0-9]\.[0-9][0-9][0-9]\.[0-9][0-9][0-9]\-[0-9][0-9]$/"
                     required
                     size={15}
                    />
                    {/*}
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
                    </Input>*/}
                    {/*<Input 
                        className="mb-4"
                        label="Nome"
                        type="text"
                        placeholder="Insira seu nome"
                        error={errors.cpf}
                        required={true}
                        name="npme"
                        validations={register('nome', {
                            required: {
                                value: true,
                                message: 'Como devemos lhe chamar?'
                            }
                        })}
                    >
                    </Input>*/}
                    <div>Senha</div>
                    <input
                     type="password"
                     name="nome"
                     id=""
                     label="nome"
                     placeholder=""
                     required
                    />
                    {/*<Input
                        className="mb-4"
                        label="Senha"
                        type="password"
                        placeholder="Insira sua senha"
                        error={errors.password}
                        required={true}
                        name="password"
                        validations={register('password', {
                            required: {
                                value: true,
                                message: 'Senha é obrigatório'
                            }
                        })}
                    />*/}
                    <br/>
                    <br/>
                    <div className="d-flex justify-content-between">
                        <Button type="submit">Entrar</Button>
                        <Link to="/registro">Criar conta</Link>
                    </div>
                </Col>
            </Form>
        </Container>
    );
}
/*
<Input
                        className="mb-4"
                        label="E-mail"
                        type="text"
                        placeholder="Insira seu e-mail"
                        error={errors.email}
                        required={true}
                        name="email"
                        validations={register('email', {
                            required: {
                                value: true,
                                message: 'E-mail é obrigatório'
                            },
                            pattern: {
                                value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
                                message: 'E-mail inválido!'
                            }
                        })}
                    />*/
