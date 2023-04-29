

export class Endereco {
    _id?: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: number;
    indEndStatus?: number;

    public constructor(init?: Partial<Endereco>) {
        Object.assign(this, init);
    }
}
