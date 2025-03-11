import { Router } from "express";
import UnidadeController from "../controllers/UnidadeController";

const unidadeRoutes = Router();

unidadeRoutes.get('/', UnidadeController.consultarTodasUnidades);
unidadeRoutes.get('/:unidade_id', UnidadeController.consultarUnidadePorId);

export default unidadeRoutes;