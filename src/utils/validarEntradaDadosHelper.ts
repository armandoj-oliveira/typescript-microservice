import ErroValidacao from "../errors/ErroValidacao";

export default function validarEntradaDados(dados: Record<string, unknown>, camposObrigatorios: string[]) {
    const erros: string[] = [];

    for (const campo of camposObrigatorios) {
        if (dados[campo] === undefined) {
            erros.push(`${campo} não fornecido.`);
        }
    }

    if (erros.length > 0) {
        throw new ErroValidacao(erros.join(" "), 400);
    }
}
