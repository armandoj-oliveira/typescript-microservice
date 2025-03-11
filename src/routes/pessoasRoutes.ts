import { Router } from 'express';
import PessoaController from '../controllers/PessoaController'

const pessoaRoutes = Router();

pessoaRoutes.get('/', PessoaController.consultarTodasPessoas);
pessoaRoutes.get('/:usuario', PessoaController.consultarPessoa);

export default pessoaRoutes;
