# 🚀 microservico-pessoas-unidades

![TypeScript](https://img.shields.io/badge/TypeScript-Linguagem-blue?style=for-the-badge&logo=typescript)
![Express.js](https://img.shields.io/badge/Express.js-Framework-green?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-darkgreen?style=for-the-badge&logo=mongodb)  
![Mongoose](https://img.shields.io/badge/Mongoose-ODM-red?style=for-the-badge&logo=mongoose)
![Yarn](https://img.shields.io/badge/Yarn-Gerenciador-blue?style=for-the-badge&logo=yarn)  

Criação de um **microserviço** utilizando **TypeScript**, **Express** e **MongoDB** com **Mongoose** para gerenciamento de banco de dados.

---

## 📌 **Índice**
- [📌 Tecnologias](#-tecnologias)
- [⚡ Instalação](#-instalação)
- [🌐 Rotas da API](#-rotas-da-api)
- [📜 Licença](#licenças)

---

## 🚀 **Tecnologias**
Este projeto utiliza as seguintes tecnologias:

- 🔹 [TypeScript](https://www.typescriptlang.org/)
- 🔹 [Node.js](https://nodejs.org/)
- 🔹 [Express.js](https://expressjs.com/)
- 🔹 [MongoDB](https://www.mongodb.com/)
- 🔹 [Mongoose](https://mongoosejs.com/)
- 🔹 [Yarn](https://yarnpkg.com/)
- 🔹 [Nodemon](https://www.npmjs.com/package/nodemon) (Para hot reload durante o desenvolvimento)
- 🔹 [Dotenv](https://www.npmjs.com/package/dotenv) (Para gerenciamento de variáveis de ambiente)

---

## ⚡ **Instalação**
1️⃣ **Clone este repositório:**

```
git clone https://github.com/armandoj-oliveira/microservico-pessoas-unidades.git
```

2️⃣ **Acesse a pasta do projeto:**

```
cd microservico-typescript
```

3️⃣ **Instale as dependências:**
```
yarn install
```

4️⃣ **Execute o projeto:**

```
yarn start
```

5️⃣ **Outros comandos úteis:**

Para rodar os testes:
```
yarn test
```

Para verificar e corrigir problemas de formatação e estilo de código:
```
yarn lint
```

---

## 🌐 Rotas da API

### 🧑‍💻 Pessoas
| Método | Endpoint      | Descrição                                      |
|--------|-------------|----------------------------------------------|
| GET    | `/usuarios`  | Retorna todas as pessoas cadastradas        |
| GET    | `/`          | Consulta uma pessoa específica              |
| POST   | `/`          | Cria um novo registro de pessoa             |
| PATCH  | `/hash`      | Atualiza o hash diário da pessoa            |

### 🏢 Unidades
| Método | Endpoint           | Descrição                                    |
|--------|--------------------|--------------------------------------------|
| GET    | `/`                | Retorna todas as unidades                  |
| GET    | `/:unidade_id`     | Consulta uma unidade específica pelo ID    |


---

## 📜 Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
