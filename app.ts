import { validate } from "@deepkit/type";
import { User } from "./models";

console.log('valid', validate<User>({ id: 0, username: 'Peter' }));
console.log('invalid', validate<User>({ id: 0, username: 'x' }));
