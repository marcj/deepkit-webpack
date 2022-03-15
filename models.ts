import { MaxLength, MinLength, PrimaryKey } from "@deepkit/type";

export class User {
    id: number & PrimaryKey = 0;

    constructor(public username: string & MinLength<3> & MaxLength<128>) {
    }
}
