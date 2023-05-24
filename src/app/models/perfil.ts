export class Perfil {

    _iid?: string;
    role: string;
    status: boolean;

    public constructor(init?: Partial<Perfil>) {
        Object.assign(this, init);
    }
};
