import { useState } from "react";
import { Button, Card, Form, Modal, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "./Input";

export function Escola(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);

    async function editEscola(data) {
        await props.editEscola({ ...data, id: props.info.id });
        setIsUpdated(false);
    }

    return (
        <>
            <Card className="mb-3 p-3 bg-light">
                <Row>
                    <Col md='9' className="d-flex justify-content-start">
                        <Card.Title>
                            <Col><strong>Nome: </strong>{props.info.nome}</Col>
                            <Col><strong>CNPJ: </strong>{props.info.CNPJ}</Col>
                            <Col><strong>Numero: </strong>{props.info.numero_contato}</Col>
                            
                            
                            
                            {/*<strong>E-mail: </strong>{props.info.email_contato}*/}
                        </Card.Title>
                        <Card.Text> </Card.Text>
                    </Col>
                    <Col md='3' className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={() => setIsUpdated(true)}>Editar</Button>
                        <Button
                            variant="outline-danger"
                            className="ms-3"
                            onClick={props.removeEscola}
                        >
                            Apagar
                        </Button>
                    </Col>
                </Row>
            </Card>
            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Editar escola: {props.info.nome}</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(editEscola)} validated={!!errors}>
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
                            placeholder='Insira o orcamento da escola'
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
                        <Form.Group>
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
                            Editar
                        </Button>
                        <Button variant="secondary" onClick={() => setIsUpdated(false)}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}
