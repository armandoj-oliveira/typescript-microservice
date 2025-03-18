jest.mock("../../src/middleware/verificarInstituicaoMiddleware", () => ({
    verificarInstituicaoMiddleware: (req: Request, res: Response, next: NextFunction) => next(),
}));
  
import mongoose from "mongoose";
import request from "supertest";
import { NextFunction } from "express";
import app from "../../src/app";
import { Pessoa } from "../../src/models/Pessoa";

jest.mock("../../src/models/Pessoa");

describe("Pessoa Controller - Testes Unitários", () => {
    beforeAll(async () => {
        jest.clearAllMocks();
        await mongoose.connect(process.env.DB_TEST_CONNECTION_STRING as string);
        console.log('Banco conectado!');
    });

    afterAll(async () => {
        await mongoose.connection.close();
        await mongoose.disconnect();
        console.log("Conexão desligada!");
    });    

    test("Deve listar todas as pessoas armazenadas", async () => {
        (Pessoa.find as jest.Mock).mockResolvedValue([
            { usuario: "Armando" }
        ]);

        const response = await request(app).get("/pessoas/usuarios");

        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ usuario: "Armando" }])
    });

    test("Deve retornar erro ao listar as pessoas quando o banco falha", async () => {
        (Pessoa.find as jest.Mock).mockRejectedValue(new Error("Falha ao buscar as pessoas."));
    
        const response = await request(app).get("/pessoas/usuarios");
    
        console.log(response.body);

        expect(response.status).toBe(500); 
        expect(response.body).toHaveProperty("mensagem", "Falha ao buscar as pessoas.");
    });    
    
});