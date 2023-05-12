export class Perfil {

    _iid?: string;
    role: any;
    status: boolean;

    public constructor(init?: Partial<Perfil>) {
        Object.assign(this, init);
    }
};
