import { Account } from "../entities/Account";
import { Person } from "../entities/Person";


export const fromMap = (accounts: Account[], persons: Person[]) => {
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

}
    