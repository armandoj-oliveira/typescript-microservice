import { Router } from 'express';
import PessoaController from '../controllers/PessoaController'

const pessoaRoutes = Router();

pessoaRoutes.get('/pessoas', PessoaController.consultarTodasPessoas)
pessoaRoutes.get('/pessoa/:usuario', PessoaController.consultarPessoa);
pessoaRoutes.post('/pessoa', PessoaController.criarPessoa);

export default pessoaRoutes;
