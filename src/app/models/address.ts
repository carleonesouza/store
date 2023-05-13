

export class Address {
    _id?: string;
    street: string;
    neighborhood: string;
    zipCode: number;
    status?: number;

    public constructor(init?: Partial<Address>) {
        Object.assign(this, init);
    }
}
