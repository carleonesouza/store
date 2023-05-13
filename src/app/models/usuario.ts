import { Address } from './address';

export class Usuario {

    _id?: string;
    fullName: string;
    email: string;
    phone: string;
    cpfCnpj: string;
    password: string;
    apiKey: string;
    status?: any;
    profile?: string;
    address?: Address;

    public constructor(init?: Partial<Usuario>) {
        Object.assign(this, init);
    }
};
