// types/user.types.ts

export interface Hair {
    color: string;
    type: string;
}

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface Address {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: Coordinates;
    country: string;
}

export interface Bank {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
}

export interface CompanyAddress extends Omit<Address, 'stateCode'> {
    stateCode: string;
}

export interface Company {
    department: string;
    name: string;
    title: string;
    address: CompanyAddress;
}

export interface Crypto {
    coin: string;
    wallet: string;
    network: string;
}

export type UserRole = 'admin' | 'moderator' | 'user';

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: Hair;
    ip: string;
    address: Address;
    macAddress: string;
    university: string;
    bank: Bank;
    company: Company;
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: Crypto;
    role: UserRole;
}

// Для ответа API с пагинацией
export interface UsersResponse {
    users: User[];
    total: number;
    skip: number;
    limit: number;
}

// Для формы редактирования пользователя
export interface UserFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: {
        address: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    company: {
        department: string;
        title: string;
    };
}