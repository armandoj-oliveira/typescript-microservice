import { Router } from 'express';
import PessoaController from '../controllers/PessoaController'

const pessoaRoutes = Router();
 
pessoaRoutes.get('/', PessoaController.consultarTodasPessoas);     // Pesquisas com ferramentas de APIs
pessoaRoutes.get('/:usuario', PessoaController.consultarPessoa);   // Pesquisas com ferramentas de APIs
pessoaRoutes.post('/', PessoaController.verificarOuCriarPessoa);   // Rota usada pelo plug-in

export default pessoaRoutes;
