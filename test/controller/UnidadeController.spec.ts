jest.mock("../../src/middleware/verificarInstituicaoMiddleware", () => ({
    verificarInstituicaoMiddleware: (req: Request, res: Response, next: NextFunction) => next(),
}));

import mongoose from "mongoose";
import request from "supertest";
import { NextFunction } from "express";
import app from "../../src/app";
import Unidade from "../../src/models/Unidade";

jest.mock("../../src/models/Unidade");

describe("Unidade Controller - Testes Unitários", () => {
    beforeAll(async () => {
        jest.clearAllMocks();
        await mongoose.connect(process.env.DB_TEST_CONNECTION_STRING as string);
        console.log("Banco conectado!");
    });

    afterAll(async () => {
        await mongoose.connection.close();
        await mongoose.disconnect();
        console.log("Conexão desligada!");
    });

    test("Deve listar todas as unidade armazenadas", async () => {
        (Unidade.find as jest.Mock).mockResolvedValue([
            { unidade_nome: "Seção de Projetos e Processos" }
        ]);

        const response = await request(app).get("/unidades/");

        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ unidade_nome: "Seção de Projetos e Processos" }])
    });

    test("Deve retornar erro ao listar as unidades quando o banco falha", async () => {
        (Unidade.find as jest.Mock).mockRejectedValue(new Error("Falha ao buscar as unidades."));

        const response = await request(app).get("/unidades/");

        console.log(response.body);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("mensagem", "Falha ao buscar as unidades.");
    });
});