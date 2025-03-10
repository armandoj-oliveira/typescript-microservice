import { Router } from 'express';
import PessoaController from '../controllers/pessoaController';

const routes = Router();

routes.get('/:nome_usuario', PessoaController.consultarPessoa);
routes.post('/', PessoaController.criarPessoa);

export default routes;