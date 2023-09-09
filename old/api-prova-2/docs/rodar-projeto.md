# Rodar o projeto
instalar dependências, na pasta do projeto rode
```bash
npm install
```
---

## Criar ou conectar com o banco:
Verifique no arquivo **src/database/config.js** se suas configurações do seu banco está correto, se não, faça os ajustes se necessário.
<br />
Caso precise criar o banco:
```bash
npx sequelize db:create
```
Caso já tenha o banco rode apenas as migrations:
```bash
npx sequelize db:migrate
```
---

## Popular o banco
Se precisar popular seu banco de dados, rode:
```bash
npm run populate
```

---
## Rode a API
Para rodar nossa API rode o comando:
```bash
npm start
```
nossa API estará rodando localmente em <br />
http://localhost:8080

---

##  Configura o Insomnia
dentro de **docs**, tem um arquivo chamando **Insomnia.json** <br />
Abre seu Insomnia, vai em: <br />
Vai em *Personal Projecst* no ícone 🏠 <br />
*Create* - *Import* <br />
jogue esse arquivo **Insomnia.json**, depois: <br />
*Scan* - *Import*

---

# Lembre-se: Manipule apenas a tabela necessária
# Pronto! Agora pode manipular sua API pelo front-end localmente.
