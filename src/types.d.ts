export interface IContactsForm {
    name: string;
    phone: string;
    email: string;
    photo: string;
}

export interface IContact {
    id: string;
    name: string;
    phone: string;
    email: string;
    photo: string;
}

export interface ContactList {
    [id: string]: IContact
}