export class Categoria {

    _id: string;
    name: string;
    description?: string;
    status?: string;

    public constructor(init?: Partial<Categoria>) {
        Object.assign(this, init);
    }
};
