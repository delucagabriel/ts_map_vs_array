import { faker } from "@faker-js/faker";

export type Account = {
    id: string;
    personId: string;
    accountName: string;
    accountNumber: string;
    balance: number;
    isAccountActive: boolean;
}

export const newAccount = (personId: string): Account => ({
    id: faker.string.uuid(),
    personId,
    accountName: faker.finance.accountName(),
    accountNumber: faker.finance.accountNumber(),
    balance: +faker.finance.amount(0, 10000, 2),
    isAccountActive: faker.datatype.boolean()
});