import { Produto } from './produto.model';
import { Usuario } from './usuario';

export class Venda {

    _id: string;
    produto: Produto;
    quantidade: number;
    total: number;
    formaPagamnto: string;
    troco?: number;
    valorPago: number;
    user: Usuario;
    status?: boolean;

    public constructor(init?: Partial<Venda>) {
        Object.assign(this, init);
    }
};
