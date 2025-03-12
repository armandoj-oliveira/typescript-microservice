import { Router } from "express";
import UnidadeController from "../controllers/UnidadeController";

const unidadeRoutes = Router();

unidadeRoutes.get('/', UnidadeController.consultarTodasUnidades);                 // Pesquisas com ferramentas de APIs
unidadeRoutes.get('/:unidade_id', UnidadeController.consultarUnidadePorId);       // Pesquisas com ferramentas de APIs

export default unidadeRoutes;