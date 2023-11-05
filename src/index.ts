import { Person } from "./entities/Person";
import { generateDb } from "./utils/GenerateFile";
import { JSONFile } from "lowdb/node";
import { Account } from "./entities/Account";
import { DB_ACCOUNT_PATH, DB_PERSON_PATH } from "./config";
import { fromMap } from "./usecases/map";
import { fromFind } from "./usecases/find";
import { fromFor } from "./usecases/for";

const personData = new JSONFile<Person[]>(DB_PERSON_PATH)
const accountData = new JSONFile<Account[]>(DB_ACCOUNT_PATH)
const persons = await personData.read()
const accounts = await accountData.read()

const executeMap = async (accounts, persons) => {
    console.log({ persons: persons?.length, accounts: accounts?.length })
    fromMap(accounts!, persons!);
}

const executeFor = async (accounts, persons) => {
    fromFor(accounts!, persons!);
}

const executeFind = async (accounts, persons) => {
    fromFind(accounts!, persons!);
}

generateDb(50000)
    .then(() => executeMap(accounts, persons))
    .then(() => executeFor(accounts, persons))
    .then(() => executeFind(accounts, persons))
    .finally(() => console.log('Done'));
