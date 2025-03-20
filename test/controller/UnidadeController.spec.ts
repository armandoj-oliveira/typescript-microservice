import request from "supertest";
import { NextFunction, Request, Response } from "express";
import app from "../../src/app";
import Unidade from "../../src/models/Unidade";

jest.mock("../../src/middleware/verificarInstituicaoMiddleware", () => ({
    verificarInstituicaoMiddleware: (req: Request, res: Response, next: NextFunction) => next(),
}));

jest.mock("../../src/models/Unidade");

describe("Unidade Controller - Testes Unitários", () => {
    const mockUnidade = {
        unidade_id: 11,
        unidade_sigla: "UC",
        unidade_nome: "Unidade Central",
        unidade_instituicao: "instituicao",
    };


    beforeAll(async () => {
        jest.clearAllMocks();
    });

    /*
    
        TESTES PARA MÉTODO - CONSULTAR TODAS UNIDADES

    */

    test("Deve retornar status 200 e todas as unidades", async () => {
        (Unidade.find as jest.Mock).mockResolvedValue([
            { unidade_nome: "Seção de Projetos e Processos" }
        ]);

        const response = await request(app).get("/unidades/");

        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ unidade_nome: "Seção de Projetos e Processos" }]);
    });

    test("Deve retornar erro 500 e mensagem quando falha na busca de unidades", async () => {
        (Unidade.find as jest.Mock).mockRejectedValue(new Error("Falha ao buscar as unidades."));

        const response = await request(app).get("/unidades/");

        console.log(response.body);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("mensagem", "Falha ao buscar as unidades.");
    });

    /*
    
        TESTES PARA MÉTODO - CONSULTAR UNIDADE POR ID

    */

    test("Deve retornar status 200 e os dados de uma unidade existente", async () => {
        (Unidade.findOne as jest.Mock).mockReturnValueOnce({
            exec: () => Promise.resolve(mockUnidade)
        });

        const response = await request(app).get(`/unidades/${mockUnidade.unidade_id}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            codigo: "UNIDADE_LOCALIZADA",
            mensagem: "Unidade encontrada com sucesso!",
            dados: mockUnidade
        });
    });

    test("Deve retornar erro 404 se a unidade não for encontrada", async () => {
        (Unidade.findOne as jest.Mock).mockReturnValueOnce({
            exec: () => Promise.resolve(null)
        });

        const response = await request(app).get("/unidades/99");

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            mensagem: "Não foi possível encontrar o ID fornecido."
        });
    });
});