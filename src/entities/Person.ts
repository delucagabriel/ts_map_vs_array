import { faker } from "@faker-js/faker";

export type Person = {
    id: string; 
    name: string; 
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    
    };
    phone: string;
}

export const newPerson = (): Person=> ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    address: {
        street: faker.location.street(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country()
    },
    phone: faker.phone.number()
})