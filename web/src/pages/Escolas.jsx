import { Form, Button, Modal, Row, Col, Container, } from "react-bootstrap";
import { useNavigate } from "react-router-dom";// Link, 
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


import { Input } from "../components/Input";
import { Escola } from "../components/Escola";
import { Header } from '../components/Header';
import { Navexample } from '../components/Navexample';

// import { loginUser } from '../services/user-services';
import { getEscola, crtEscola, putEscola, delEscola } from '../services/escola';

export function Escolas() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    // Zona para tentar pegar a lista de escolas
    const [escolas, setEscolas] = useState([]);

    async function findEscolas() {
        try {
            
            let data = {
                nome: document.querySelector("#nome").value,
                CNPJ: document.querySelector("#CNPJ").value,
            }
            //console.log()
            const result = await getEscola(data);
            //console.log(result.data)
            setEscolas(result.data);
            
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    useEffect(() => {
        findEscolas();
    }, []);


    const [isCreated, setIsCreated] = useState(false);

    async function removeEscola(data) {
        try {
            await delEscola(data);
            await findEscolas();
        } catch (error) {
            setResult({
				title: 'Houve um erro no login!',
				message: error.response.data.error,
			});
        }
    }

    async function addEscola(data) {
        try {
            //console.log(data)
            await crtEscola(data);
            setIsCreated(false);
            await findEscolas();
        } catch (error) {
            setResult({
				title: 'Houve um erro no login!',
				message: error.response.data.error,
			});
        }
    }

    async function editEscola(data) {
        try {
            await putEscola(data);
            document.querySelector("#nome").value =""
            document.querySelector("#CNPJ").value =""
            await findEscolas();
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
            <Navexample/>
            <Header title="Escolas" color="#FFFFFF" bcolor="#1F69D7" />
            <Form
				noValidate
				//validated={!!errors}
				onSubmit={handleSubmit(findEscolas)}
				className="bg-light rounded p-5 shadow w-50 m-auto"
			>
				<Row>					
                    <Input 
                        className="mb-4"
                        label="Nome"
                        type="text"
                        placeholder="Nome da escola"
                        error={errors.nome}
                        //required={false}
                        name="nome"
                        validations={register('nome', 
                        //{required: {value: false}, message: 'obrigatório'}
                        )}
                    >
                    </Input>
                    <Input 
                        className="mb-4"
                        label="CNPJ"
                        type="text"
                        placeholder="CNPJ da escola"
                        error={errors.CNPJ}
                        //required={false}
                        name="CNPJ"
                        validations={register('CNPJ', 
                        //{required: {value: false}, message: 'obrigatória'}
                        )}
                    >
                    </Input>
					
					<br />
					<br />

				</Row>
                <Row>
<Col md='6'><Button variant="primary" onClick={() => findEscolas()}>Buscar</Button></Col>
<Col md='6'><Button onClick={() => setIsCreated(true)}>Criar nova Escola</Button></Col>
                
                
                </Row>
			</Form>
            <br/>
            {escolas && escolas.length > 0
                ?
                escolas.map((escola, index) => (
                    <Escola
                        key={index}
                        info={escola}
                        removeEscola={async () => await removeEscola(escola)}
                        editEscola={editEscola}
                    />
                ))

                : <p className="text-center">Não existe escola cadastrada!</p>
            }
            <Modal show={isCreated} onHide={() => setIsCreated(false)}>
                <Modal.Header>
                    <Modal.Title>Cadastrar nova escola</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(addEscola)} validated={!!errors}>
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            type='text'
                            label='Nome da escola'
                            placeholder='Insira o nome da escola'
                            required={true}
                            name='nome'
                            error={errors.nome}
                            validations={register('nome', {
                                required: {
                                    value: true,
                                    message: 'Nome da escola obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='number'
                            label='Orçamento da escola'
                            placeholder='Insira o orçamento da escola'
                            required={true}
                            name='orcamento'
                            error={errors.orcamento}
                            validations={register('orcamento', {
                                required: {
                                    value: true,
                                    message: 'Orcamento da escola obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='text'
                            label='CNPJ da escola'
                            placeholder='Insira o CNPJ da escola'
                            required={true}
                            name='CNPJ'
                            error={errors.CNPJ}
                            validations={register('CNPJ', {
                                required: {
                                    value: true,
                                    message: 'CNPJ da escola obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='tel'
                            label='Telefone da escola'
                            placeholder='Insira o telefone da escola'
                            required={true}
                            name='numero_contato'
                            error={errors.telefone}
                            validations={register('numero_contato', {
                                required: {
                                    value: true,
                                    message: 'Telefone da escola obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='email'
                            label='E-mail da escola'
                            placeholder='Insira o e-mail da escola'
                            required={true}
                            name='email_contato'
                            error={errors.email}
                            validations={register('email_contato', {
                                required: {
                                    value: true,
                                    message: 'E-mail da escola obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='number'
                            label='Quantidade de professores da escola'
                            placeholder='Insira a quantidade de professores da escola'
                            required={true}
                            name='quantidade_professores'
                            error={errors.professor}
                            validations={register('quantidade_professores', {
                                required: {
                                    value: true,
                                    message: 'Quantidade de professores da escola é obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='number'
                            label='Quantidade de administrativos da escola'
                            placeholder='Insira a quantidade de administrativos da escola'
                            required={true}
                            name='quantidade_administrativos'
                            error={errors.administrativo}
                            validations={register('quantidade_administrativos', {
                                required: {
                                    value: true,
                                    message: 'Quantidade de administrativos da escola é obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='number'
                            label='Quantidade de tercerizados da escola'
                            placeholder='Insira a quantidade de tercerizados da escola'
                            required={true}
                            name='quantidade_tercerizados'
                            error={errors.tercerizado}
                            validations={register('quantidade_tercerizados', {
                                required: {
                                    value: true,
                                    message: 'Quantidade de tercerizados da escola é obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='number'
                            label='Quantidade de estudantes da escola'
                            placeholder='Insira a quantidade de estudantes da escola'
                            required={true}
                            name='quantidade_estudantes'
                            error={errors.estudante}
                            validations={register('quantidade_estudantes', {
                                required: {
                                    value: true,
                                    message: 'Quantidade de estudantes da escola é obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='number'
                            label='Quantidade de salas da escola'
                            placeholder='Insira a quantidade de salas da escola'
                            required={true}
                            name='quantidade_salas'
                            error={errors.sala}
                            validations={register('quantidade_salas', {
                                required: {
                                    value: true,
                                    message: 'Quantidade de salas da escola é obrigatório.'
                                }
                            })}
                        />
                        <Form.Group className="mb-3">
                            <Form.Label>Seleciona a Unidade Federativa</Form.Label>
                            <Form.Select {...register('unidade_federativa')}>
                                <option disabled>Clique para selecionar</option>
                                <option value={'AC'}>Acre</option>
                                <option value={'AL'}>Alagoas</option>
                                <option value={'AP'}>Amapá</option>
                                <option value={'AM'}>Amazonas</option>
                                <option value={'BA'}>Bahia</option>
                                <option value={'CE'}>Ceará</option>
                                <option value={'DF'}>Distrito Federal</option>
                                <option value={'ES'}>Espírito Santo</option>
                                <option value={'GO'}>Goiás</option>
                                <option value={'MA'}>Maranhão</option>
                                <option value={'MT'}>Mato Grosso</option>
                                <option value={'MS'}>Mato Grosso do Sul</option>
                                <option value={'MG'}>Minas Gerais</option>
                                <option value={'PA'}>Pará</option>
                                <option value={'PB'}>Paraíba</option>
                                <option value={'PR'}>Paraná</option>
                                <option value={'PE'}>Pernambuco</option>
                                <option value={'PI'}>Piauí</option>
                                <option value={'RJ'}>Rio de Janeiro</option>
                                <option value={'RN'}>Rio Grande do Norte</option>
                                <option value={'RS'}>Rio Grande do Sul</option>
                                <option value={'RO'}>Rondônia</option>
                                <option value={'RR'}>Roraima</option>
                                <option value={'SC'}>Santa Catarina</option>
                                <option value={'SP'}>São Paulo</option>
                                <option value={'SE'}>Sergipe</option>
                                <option value={'TO'}>Tocantins</option>
                            </Form.Select>
                        </Form.Group>
                        <Input
                            className="mb-3"
                            type='text'
                            label='Cidade da escola'
                            placeholder='Insira a cidade da escola'
                            required={true}
                            name='cidade'
                            error={errors.cidade}
                            validations={register('cidade', {
                                required: {
                                    value: true,
                                    message: 'Cidade da escola é obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='text'
                            label='Bairro da escola'
                            placeholder='Insira a bairro da escola'
                            required={true}
                            name='bairro'
                            error={errors.bairro}
                            validations={register('bairro', {
                                required: {
                                    value: true,
                                    message: 'Bairro da escola é obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='text'
                            label='Rua da escola'
                            placeholder='Insira a rua da escola'
                            required={true}
                            name='rua'
                            error={errors.rua}
                            validations={register('rua', {
                                required: {
                                    value: true,
                                    message: 'Rua da escola é obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='number'
                            label='Número da rua escola'
                            placeholder='Insira a rua da escola'
                            required={true}
                            name='numero_rua'
                            error={errors.rua}
                            validations={register('numero_rua', {
                                required: {
                                    value: true,
                                    message: 'Número da rua da escola é obrigatório.'
                                }
                            })}
                        />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Criar
                        </Button>
                        <Button variant="secondary" onClick={() => setIsCreated(false)}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>

    );
}
