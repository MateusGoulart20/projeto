import { useState } from "react";//  useEffect,
import { Button, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; //  Link,

import { Input } from "../components/Input";
import { Header } from '../components/Header';
import { Modal } from '../components/Modal';

import { del } from '../services/usuario';

import { useUserContext } from '../hooks/useUserContext';
import { Navexample } from "../components/Navexample";

export function Perfil() {
	const { user } = useUserContext();
	const { handleSubmit, register, formState: { errors } } = useForm();
	const [result, setResult] = useState(null);
	const navigate = useNavigate();
	var test;
	const onSubmit = async (data) => {
		try {
			console.log('a')
			console.log(data)
			const user = await del(data);
			console.log(user)
            setResult(user);
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
			<Navexample/>
            <Header title="Visão Estatística" color="#FFFFFF" bcolor="#1F69D7" />
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
						<Button type="submit">Excluir</Button>
					</div>
				</Col>
			</Form>
		</Container>
	);
}