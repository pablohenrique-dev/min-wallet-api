import { User } from "./model/user";

 

export interface UsersRepository {
	create: ({
		email,
		password,
		name,
	}: {
		email: string;
		password: string;
		name: string;
	}) => Promise<User>;
	findByEmail: (email: string) => Promise<User | null>
}
