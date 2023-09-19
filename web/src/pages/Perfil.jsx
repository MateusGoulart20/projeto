import { useState, useEffect } from "react";//  useEffect,
import { Button, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; //  Link,

import { Input } from "../components/Input";
import { Header } from '../components/Header';
import { Modal } from '../components/Modal';

import { del, put, getSave } from '../services/usuario';

import { useUserContext } from '../hooks/useUserContext';
import { Navexample } from "../components/Navexample";

export function Perfil() {
	const { user } = useUserContext();
	const { handleSubmit, register, formState: { errors } } = useForm();
	const [result, setResult] = useState(null);
	const navigate = useNavigate();
	let contexto = {
		nome:'',CPF:'' 
	}
	useEffect(() => {
		savos()
    }, []);
	async function savos(){
		let trans = await getSave();
		contexto = trans.data;
		console.log(contexto)
	}
	const onSubmit = async (data) => {
		try {
			console.log('a')
			console.log(data)
			const user = await put({ ...data, id: contexto.id });
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
	async function excluir() {
		let CPF = document.querySelector("#CPF").value
        let senha = document.querySelector("#senha").value
        let nome = document.querySelector("#nome").value
		//console.log(CPF)		console.log(senha)		console.log(nome)
		let resposta = await del({CPF,senha,nome})
		console.log(resposta)
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
						valueDefault={contexto.nome}
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
						valueDefault={contexto.CPF}
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
						<Button type="submit">Alterar</Button>
					</div>
				</Col>
			</Form>
		</Container>
	);
}