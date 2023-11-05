import { Account } from "../entities/Account"
import { Person } from "../entities/Person"


export const fromFind = (accounts: Account[], persons: Person[]) => {
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