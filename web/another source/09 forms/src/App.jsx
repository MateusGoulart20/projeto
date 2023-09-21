import './App.css';
import { useForm } from 'react-hook-form';

export default function App() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const onSubmit = (data) => {
    //console.log(data);
  }
  const name = watch('name');
  const email = watch('email');
  const senha = watch('password');

  return (
    <div>
      <h1>Formulário</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Nome</label>
          <input
            type="name"
            id="name"
            name="name"
            className='entrada'
            {...register('name', {
              required: {
                value: true,
                message: 'Nome obrigatória.'
              }
            })}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            id="email"
            name="email"
            className='entrada'
            {...register('email', {
              required: {
                value: true,
                message: 'E-mail obrigatório'
              },
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Email inválido.',
              }
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            className='entrada'
            {...register('password', {
              required: {
                value: true,
                message: 'Senha obrigatória.'
              },
              minLength: {
                value: 5,
                message: 'A senha deve ter no mínimo 5 caracteres.'
              }
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div>
          <label htmlFor="birthday">Nascimento</label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            className='entrada'
            {...register('birthday', {
              required: {
                value: true,
                message: 'Nascimento obrigatório.'
              }
            })}
          />
          {errors.birthday && <span>{errors.birthday.message}</span>}
        </div>
        <div>
          <label htmlFor="cep">Seu Cep</label>
          <input
            type="text"
            id="cep"
            name="cep"
            className='entrada'
            {...register('cep', {
              pattern: {
                value: /^[0-9]{5}-[0-9]{3}$/i,
                message: 'Cep inválido.',
              }
            })}
          />
          {errors.cep && <span>{errors.cep.message}</span>}
        </div>
        <div>
          <p>Selecione seu sexo</p>
          <label htmlFor="gender">Sexo</label>
          <select
            id="gender"
            name="gender" 
            className='entrada'
            {...register('gender', {})}>
            <option value="not">Não informar</option>
            <option value="mulher">Mulher</option>
            <option value="homem">Massculino</option>
            <option value="intersexo">Intersexo</option>
          </select>
        </div>
        <button 
        type="submit" 
        className='entrada'
        disabled={!email || !senha || !name}>Cadastrar</button>
      </form>
    </div>
  );
}
/*
<label htmlFor="fem">Feminino</label>
<input type="radio" id="fem" name="gender" value="fem"
  {...register('gender', {})} /><br />
<label htmlFor="masc">Masculino</label>
<input type="radio" id="masc" name="gender" value="masc"
  {...register('gender', {})} /><br />
<label htmlFor="inter">Intersexo</label>
<input type="radio" id="inter" name="gender" value="inter"
  {...register('gender', {})} /><br />
<label htmlFor="no">Não informar</label>
<input type="radio" id="no" name="gender" value="no"
  {...register('gender', {})} /><br />*/