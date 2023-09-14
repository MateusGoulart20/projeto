//import './App.css';
// npm install react-bootstrap bootstrap react-hook-form
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Input } from './components/Input';


/*
- “Nome Completo“: obrigatório
- “E-mail“: obrigatório
- “Data de nascimento“: obrigatório, deve ser maior de idade
- “Aceito receber novidades por e-mail“: um checkbox que o padrão já vem
selecionado
- Botão “Cadastrar“: ao clicar apenas mostre os dados no console para teste
*/

// React Bootstrap + React Hook Form
export default function App() {
  const { handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log(data)
    /*try {
      const result = await fetch('http://localhost:8080/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const token = await result.json();
      console.log(token);
    } catch (error) {
      console.error(error);
    }*/
  }
  return (
    <div className="d-flex align-items-center" style={{ height: '100vh' }}>

      <Form
        noValidate
        validated={!!errors}
        onSubmit={handleSubmit(onSubmit)}
        className='w-50 bg-red'
      >
        <Col className=''>
          <Row className='p-2'>
            <Input
              label="Nome Completo"
              type="text"
              placeholder="Insira seu Nome"
              error={errors.name}
              required={true}
              name="name"
              validations={register('name', {
                required: {
                  value: true,
                  message: 'Nome é obrigatório'
                },
              })}
            />
          </Row><Row className='p-2'>
            <Input
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
            />
          </Row><Row className='p-2'>
            <Input
              label="Data de nascimento"
              type="date"
              placeholder="Insira sua senha"
              error={errors.password}
              required={true}
              name="birthday"
              validations={register('birthday', {
                required: {
                  value: true,
                  message: 'Nascimento é obrigatório'
                }
              })}
            />
          </Row><Row className='p-2'>
            <Form.Check // prettier-ignore
              id='news'
              label='Aceito receber novidades por e-mail'
              type='checkbox'
              checked
              {...register('news')}
            />
          </Row>
        </Col>
        <Button type="submit" className='p-2'>Cadastrar</Button>
      </Form>
    </div>
  );
}
