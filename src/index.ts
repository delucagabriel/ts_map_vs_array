import { Person } from "./entities/Person";
import { generateDb } from "./utils/GenerateFile";
import { JSONFile } from "lowdb/node";
import { Account } from "./entities/Account";
import { DB_ACCOUNT_PATH, DB_PERSON_PATH } from "./config";

const execute = async () => {
    const personData = new JSONFile<Person[]>(DB_PERSON_PATH)
    const accountData = new JSONFile<Account[]>(DB_ACCOUNT_PATH)
    const persons = await personData.read()
    const accounts = await accountData.read()
    console.log({ persons: persons?.length, accounts: accounts?.length })
    
    console.time('Map.get')
    const accountsMap = new Map<string, Account>()
    accounts?.forEach((account: Account) => {
        accountsMap.set(account.personId, account)
    });
    const customersFromMap = persons
        ?.filter((person: Person) => accountsMap.get(person.id)?.isAccountActive)
        .map((person: Person) => ({
            ...person,
            account: accountsMap.get(person.id)
        }))
    console.timeEnd('Map.get')
    console.log({ customersFromMap: customersFromMap?.length })

    console.time('Array.find')
    const customersFromFind = persons
        ?.filter((person: Person) => accounts
            ?.find((account: Account) => account.personId === person.id)?.isAccountActive
        )
        .map((person: Person) => ({
            ...person,
            account: accounts?.find((account: Account) => account.personId === person.id)
        }))
    console.timeEnd('Array.find')
    console.log({ customersFromFind: customersFromFind?.length })

}

generateDb(50000)
    .then(() => execute())
    .finally(() => console.log('Done'));
