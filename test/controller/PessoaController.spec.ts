import request from "supertest";
import { NextFunction, Request, Response } from "express";
import app from "../../src/app";
import { Pessoa } from "../../src/models/Pessoa";

jest.mock("../../src/middleware/verificarInstituicaoMiddleware", () => ({
    verificarInstituicaoMiddleware: (req: Request, res: Response, next: NextFunction) => next(),
}));
jest.mock("../../src/utils/verificarUnidadeHelper", () => ({ verificarUnidadeExistente: jest.fn().mockResolvedValue(false) }));
jest.mock("../../src/models/Pessoa");
jest.mock("../../src/controllers/UnidadeController");

const mockPessoa = {
    nome_usuario: "usuario teste",
    usuario: "usuario",
    instituicao: "Instituicao",
    unidade_id: [1],
    infra_hash: ["a"]
};

describe("Pessoa Controller | CONSULTAS | Testes Unitários", () => {
    beforeAll(async () => {
        jest.clearAllMocks();
    });

    /*
    
        TESTES PARA MÉTODO - CONSULTA RTODAS PESSOAS

    */

    test("Deve retornar status 200 e todos usuários", async () => {
        (Pessoa.find as jest.Mock).mockResolvedValue(mockPessoa);

        const response = await request(app).get("/pessoas/usuarios");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockPessoa);
    });

    test("Deve retornar erro 500 e mensagem quando falha na busca de usuários", async () => {
        (Pessoa.find as jest.Mock).mockRejectedValue(new Error("Falha ao buscar as pessoas."));

        const response = await request(app).get("/pessoas/usuarios");

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("mensagem", "Falha ao buscar as pessoas.");
    });

    /*
    
        TESTES PARA MÉTODO - CONSULTAR PESSOA

    */

    test("Deve retornar status 200 e os dados de um usuário", async () => {

        (Pessoa.findOne as jest.Mock).mockReturnValue({
            populate: jest.fn().mockReturnThis(),
            exec: jest.fn().mockResolvedValue(mockPessoa),
        });

        const response = await request(app).get("/pessoas/").send(mockPessoa);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            codigo: "USUARIO_LOCALIZADO",
            mensagem: "Usuário localizado.",
            dados: mockPessoa
        });
    });

    test("Deve retornar erro 400 quando a entrada for inválida", async () => {
        const response = await request(app)
            .post("/pessoas/")
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("mensagem");
    });
});

describe("Pessoa Controller | CADASTRAR | Testes Unitários", () => {
    beforeAll(async () => {
        jest.clearAllMocks();
    });

    /*
    
        TESTES PARA MÉTODO - CADASTRAR PESSOA

    */

    test('Deve retornar status 201 quando cadastrar uma nova pessoa', async () => {
        (Pessoa.findOne as jest.Mock).mockReturnValue(null);
        (Pessoa.create as jest.Mock).mockResolvedValue(mockPessoa);

        const response = await request(app).post("/pessoas/").send(mockPessoa);

        expect(response.status).toBe(201);
        expect(response.body.codigo).toBe('USUARIO_CADASTRADO');
        expect(Pessoa.create).toHaveBeenCalledWith(mockPessoa);
    });
    
});