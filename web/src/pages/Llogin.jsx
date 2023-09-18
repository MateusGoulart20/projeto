import { useEffect, useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../components/Input";
import { Header } from '../components/Header';
import { Modal } from '../components/Modal';

import { loginUser } from '../services/user-services';
import { lgn } from '../services/usuario';
import { conexao } from '../services/usuario';

export function Llogin() {
	const { handleSubmit, register, formState: { errors } } = useForm();
	const [result, setResult] = useState(null);
	const navigate = useNavigate();
	var test;
    useEffect (() => {
        //test = 'a';
        //console.log(test)
        //test = conexao();
        //console.log(test)
        // eslint-disable-next-line
    }, []);
        
    //console.log(`Conexão ${test}`)
	const onSubmit = async (data) => {
		try {
			console.log('a')
			console.log(data)
            test = await conexao();
			const user = await lgn(data);
			console.log(user)
            setResult(user);
			navigate('/home');
		} catch (error) {
			console.log(error)
			console.log(error.response)
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
                    <Input 
                        className="mb-4"
                        label="CPF (000.000.000-00)"
                        type="text"
                        placeholder="Insira seu CPF {000.000.000-00}"
                        error={errors.cpf}
                        required={true}
                        name="CPF"
                        validations={register('CPF', {
                            required: {
                                value: true,
                                message: 'CPF obrigatório'
                            }
                            
                        })}
                    >
                    </Input>
                    <Input 
                        className="mb-4"
                        label="Senha"
                        type="password"
                        placeholder="Insira sua senha"
                        error={errors.cpf}
                        required={true}
                        name="senha"
                        validations={register('senha', {
                            required: {
                                value: true,
                                message: 'Senha obrigatória'
                            },
                            
                        })}
                    >
                    </Input>
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
					{/*<div>Senha</div>
					<input
						type="password"
						name="senha"
						id="senha"
						label="senha"
						placeholder="senha"
						required
					/>*/}
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
					<br />
					<br />
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
