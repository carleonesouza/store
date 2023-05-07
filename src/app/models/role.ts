export class Role {

    recId: string;
    rota?: any;
    roles: any;
    isActive: boolean;
    roleName: string;

    public constructor(init?: Partial<Role>) {
        Object.assign(this, init);
    }
};
