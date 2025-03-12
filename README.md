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
- [🚀 Como Usar](#-como-usar)
- [📌 Rotas Disponíveis](#-rotas-disponíveis)

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
```sh
git clone https://github.com/armandoj-oliveira/microservico-pessoas-unidades.git
```
2️⃣ Acesse a pasta do projeto:
```sh
cd microservico-typescript
```
3️⃣ Instale as dependências:
```sh
yarn install
```

---

## 🚀 **Como Usar**

Após iniciar o servidor, a API estará rodando em http://localhost:8000 ou na porta configurada.

📌 Rotas Disponíveis:

📌 Pessoa (/pessoa)

GET /pessoa → Retorna todas as pessoas cadastradas.

GET /pessoa/:usuario → Retorna uma pessoa específica.

📌 Unidade (/unidade)

GET /unidade → Retorna todas as unidades cadastradas.

GET /unidade/:unidade_id → Retorna uma unidade específica.
