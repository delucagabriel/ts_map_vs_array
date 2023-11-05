import { Account } from "../entities/Account";
import { Person } from "../entities/Person";

type Customer = Person & { account: Account }



export const fromFor = (accounts: Account[], persons: Person[]) => {
    console.time('For')
    const customersFromFor: Customer[] = []
    for (let i=0; i<persons.length; i++) {
        const person = persons[i]
        for (let j=0; j<accounts.length; j++) {
            const account = accounts[j]
            if (account.personId === person.id && account.isAccountActive) {
                customersFromFor.push({
                    ...person,
                    account
                })
                continue
            }
        }
    }
    console.timeEnd('For')
    console.log({ customersFromFor: customersFromFor.length })
}