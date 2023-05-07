import { Usuario } from './usuario';
import { Venda } from './vendas';

export class Caixa {

    _id: string;
    user: string;
    orders?: Array<Venda>;
    valorAbertura: number;
    valorFechamento: number;
    criadoEm: Date;
    fechadoEm: Date;
    status?: boolean;

    public constructor(init?: Partial<Caixa>) {
        Object.assign(this, init);
    }
};
