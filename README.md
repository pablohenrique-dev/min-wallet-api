# MinWallet

## Descrição

O MinWallet é um app que permite aos usuários cadastrar, atualizar e excluir todos os seus gastos e ganhos de forma que ao final do mês, o mesmo possa ter controle sobre sua vida financeira. Acesse o repositório front-end [aqui](https://github.com/pablohenrique-dev/min-wallet-frontend).

## Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- Prisma
- Docker
- Vitest
- Zod

## Rodando o projeto localmente

#### 1º - Abra o seu terminal e clone o projeto com o comando abaixo:

```bash
git clone git@github.com:pablohenrique-dev/min-wallet-api.git
```

#### 2º - Navege para a pasta do projeto:

```bash
cd min-wallet-api/
```

#### 3º - Crie um arquivo .env e cole as informações abaixo:

```js
NODE_ENV="dev"
PORT=3333
DATABASE_URL ="postgresql://docker:docker@localhost:5432/api-minwallet?schema=public"
JWT_SECRET="jwt-secret-example"
CLIENT_URL="http://localhost:5173"

MAIL_HOST=" "
MAIL_PORT=" "
MAIL_USER=" "
MAIL_PASS=" "
MAIL_FROM=" "
```

#### 4º - No seu terminal, execute o comando abaixo:

```bash
npm run wrap
```

#### 5º - Acessando a documentação das rotas:

Com o projeto rodando, basta acessar a url: http://localhost:3333/api-docs/#/
