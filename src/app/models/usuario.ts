import { Endereco } from './endereco';

export class Usuario {

    id?: string;
    fullName: string;
    email: string;
    phone: string;
    cpfCnpj: string;
    password: string;
    apiKey: string;
    status?: any;
    profile?: string;
    address?: Endereco;

    public constructor(init?: Partial<Usuario>) {
        Object.assign(this, init);
    }
};
