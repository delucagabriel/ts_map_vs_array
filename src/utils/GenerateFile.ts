import { JSONPreset } from 'lowdb/node'
import { Person, newPerson } from "../entities/Person";
import { Account, newAccount } from '../entities/Account';
import { DB_ACCOUNT_PATH, DB_PERSON_PATH } from '../config';

import { mkdirSync, existsSync } from "fs";

export const generateDb  = async (items: number) => {
    if(!existsSync('db')) {
        mkdirSync('db', { recursive: true })
    }
    const persontData: Person[] = [];
    const accountData: Account[] = [];
    const personDB = await JSONPreset(DB_PERSON_PATH, persontData)
    const accountDB = await JSONPreset(DB_ACCOUNT_PATH, accountData)
    for (let i=0; i<items; i++ ){
        const person = newPerson()
        const account = newAccount(person.id)
        personDB.data.push(person)
        accountDB.data.push(account)
    }
    await personDB.write()
    await accountDB.write()
}