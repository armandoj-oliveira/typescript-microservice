class ErroValidacao extends Error {
    status: number;

    constructor(mensagem: string, status = 422) {
        super(mensagem);
        this.status = status;
        Object.setPrototypeOf(this, ErroValidacao.prototype);
    }
}

export default ErroValidacao;
