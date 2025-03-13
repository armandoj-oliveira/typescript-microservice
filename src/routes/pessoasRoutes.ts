import { Router } from 'express';
import PessoaController from '../controllers/PessoaController';
import HashController from '../controllers/HashController';

const pessoaRoutes = Router();

// ROTAS - PESSOAS
pessoaRoutes.get('/usuarios', PessoaController.consultarTodasPessoas);    // Pesquisas com ferramentas de APIs
pessoaRoutes.get('/', PessoaController.consultarPessoa);                  // Pesquisas com ferramentas de APIs
pessoaRoutes.post('/', PessoaController.criarPessoa);                     // Rota usada pelo plug-in

// ROTAS - HASH
pessoaRoutes.patch('/hash', HashController.atualizarHashDiario);          // Rota usada pelo plug-in  

export default pessoaRoutes;