import { useState, useEffect } from "react";//  useEffect,
import { Button, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; //  Link,

import { Input } from "../components/Input";
import { Header } from '../components/Header';
import { Modaly } from '../components/Modaly';

import { del, put, getSave } from '../services/usuario';

import { Navexample } from "../components/Navexample";

export function Perfil() {
	const { handleSubmit, register, formState: { errors } } = useForm();
	const navigate = useNavigate();

	// UseStates
	const [result, setResult] = useState(null);
	const [perfil, setPerfil] = useState(null);
	
	useEffect(() => {
		savos()
	}, []);
	async function savos() {
		let trans = await getSave();
		setPerfil(trans.data);
		console.log(perfil)
		//console.log(contexto)
	}
	const onSubmit = async (data) => {
		try {
			const user = await put({ ...data, id: contexto.id });
			setResult(user);
		} catch (error) {
			setResult({
				title: 'Houve um erro no envio!',
				message: error.response.data.error,
			});
		}
	}
	async function excluir() {
		try {
			const id = sessionStorage.getItem('id');
			await del({ id: id })

			navigate('/sair');
		} catch (error) {
			setResult({
				title: `Houve um erro de exclusão`,
				message: error.response.data.error,
			});
		}
	}
	return (
		<Container

		>
			<Modaly
				show={result}
				title={result?.title}
				message={result?.message}
				handleClose={() => setResult(null)}
			/>
			<Navexample />
			<Header title={`Olá, ${perfil?.nome}`} color="#FFFFFF" bcolor="#1F69D7" />
			<Form
				noValidate
				validated={!!errors}
				onSubmit={handleSubmit(onSubmit)}
				className="bg-light rounded p-5 shadow w-50 m-auto"
			>
				<Col>
					<Input
						className="mb-4"
						label="Nome"
						type="text"
						placeholder=""
						error={errors.nome}
						required={true}
						name="nome"
						validations={register('nome', {
							required: {
								value: true,
								message: 'Nome obrigatório'
							}

						})}
						valueDefault={perfil?.nome}
					></Input>
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
						valueDefault={perfil?.CPF}
					></Input>
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
					></Input>
					<br />
					<br />
					<div className="d-flex justify-content-between">
						<Button onClick={excluir}>Excluir-se</Button>
						<Button type="submit">Alterar-se</Button>
					</div>
				</Col>
			</Form>
		</Container>
	);
}