// TESTES ABAIXO  

/* Testar conexão
database.authenticate()
  .then(console.log('Conectou ao banco!'))
  .catch(e => console.error('Erro conexão:', e)); 
/*/

/* Modo SQL para declarar uma tabela
// ruim, mas permitido
database.query(`CREATE TABLE public.teste (
  cardapio integer NOT NULL,
  receita integer NOT NULL,
  quantidade integer NOT NULL)`)
  .then(() => console.log('tabela criada!'))
  .catch(console.error)
//*/

/*/ Utilizando 'define' para relacionamento com a tabela criando um Model
const TesteModel = database.define('Teste', {
  cardapio: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  receita: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, { // sem as colunas extras de createAt e updateAt, marcadores de criação e modificação
  timestamps: false,
  tableName: 'teste'
});

/* Criando algo na tabela 'teste' OBS: funciona com o erro de referência
// utilizando modo assicrono para contornar a promise
(async () => {
  try {
    // await utilizado para definir o aguarde do async
    const teste = await TesteModel.create({ // é uma promise
      cardapio: 2,
      receita: 150,
      quantidade: 210
    });
    console.log(teste);
  } catch (error) {
    console.error('Erro crate', error)
  }
})();
//*/

/* Buscando registro utilizando 'findByPk', buscando pela chave primária
(async () => {
  try {
    // await utilizado para definir o aguarde do async/ é uma promise
    const teste = await TesteModel.findByPk(1);
    console.log(teste.dataValues);
  } catch (error) {
    console.error('Erro find', error)
  }
})();
//*/

/* Criando uma nova tabela e especificando
const TarefaModel = database.define('Tarefa', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  finished: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, { // sem as colunas extras de createAt e updateAt, marcadores de criação e modificação
  timestamps: true,
  tableName: 'tarefa'
});
//*/

/* criação de tabela
(async () => {
  try {
    // await utilizado para definir o aguarde do async/ é uma promise
    await TarefaModel.sync(); // comando reseter-criador de tabela
  } catch (error) {
    console.error('Erro Criar Tabela', error)
  }
})();
//*/
/* criação de registro na tabela
(async () => {
  try {
    // await utilizado para definir o aguarde do async/ é uma promise
    const tarefa = await TarefaModel.create({
      description: 'Estudar ReactJS',
    });
    console.log(tarefa.dataValues);
  } catch (error) {
    console.error('Erro Criar Tabela', error)
  }
})();
//*/

/* criação de registro na tabela
(async () => {
  try {
    // await utilizado para definir o aguarde do async/ é uma promise
    const tarefas = await TarefaModel.findAll();
    // console.log(tarefas); //forma padrão.
    console.log(tarefas.map(tarefa => tarefa.dataValues)); //forma formatada. (forEach não funciona, usar map)
  } catch (error) {
    console.error('Erro Criar Tabela', error)
  }
})();
//*/

/* teste de modelos e conexão
(async () => {
  try {
    // await utilizado para definir o aguarde do async/ é uma promise
    const user = await UserModel.create({
      name: 'Marcos'
    });
    console.log(user.dataValues); //forma padrão.
  } catch (error) {
    console.error(error)
  }
})();
//*/

/* teste de modelos e conexão
(async () => {
  try {
    // await utilizado para definir o aguarde do async/ é uma promise
    const tarefa = await TaskModel.create({
      description: 'Estudar ReactJS',
      userId: 1
    });
    console.log(tarefa.dataValues); //forma padrão.
  } catch (error) {
    console.error(error)
  }
})();
//*/

/* teste de modelos e conexão
(async () => {
  try {
    // await utilizado para definir o aguarde do async/ é uma promise
    const result = await PerformanceModel.create({
      userId: 1
    });
    console.log(result.dataValues); //forma padrão.
  } catch (error) {
    console.error(error)
  }
})();
//*/