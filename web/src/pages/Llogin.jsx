import { useState, useEffect } from "react"; //useEffect, 
import { Button, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../components/Input";
import { Header } from '../components/Header';
import { Modaly } from '../components/Modaly';

import { lgn, get } from '../services/usuario';

export function Llogin() {
	const { handleSubmit, register, formState: { errors } } = useForm();
	const [result, setResult] = useState(null);
	const navigate = useNavigate();
    
	useEffect(() => {
        conectar();
    }, []);

	async function conectar(){
		try {
            await get();
        } catch (error) {
            setResult({
				title: 'Não conectado!',
				message: error.response.data.error,
			});
			console.log(error.response.data.error)
			console.log(error)
        }
	}

	const onSubmit = async (data) => {
		try {
			const user = await lgn(data);
            setResult(user);
			navigate('/home');
		} catch (error) {
			setResult({
				title: 'Houve um erro no login!',
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