import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosAPI.tsx";
import {ContactList, IContact, IContactsForm} from "../../types";

export const createContact = createAsyncThunk<void, IContactsForm>('contact/createDish', async (contact: IContactsForm) => {
    await axiosApi.post('contact.json', {...contact});
});

export const getContacts = createAsyncThunk<IContact[], void>('contact/getContact', async () => {
    const response: {data: ContactList | null} = await axiosApi.get('contact.json');
    const contactList = response.data;

    if (contactList === null) {
        return [];
    }

    const contact: ContactList = contactList;
    return Object.keys(contactList).map(item => {
        return {
            ...contact[item],
            id: item
        };
    });
});

export const editContact = createAsyncThunk<void, IContact>('contact/editContact', async (contact) => {
    const {id, ...data} = contact;
    await axiosApi.put(`contact/${id}.json`, data);
});

export const deleteContact = createAsyncThunk<void, string>('contact/deleteContact', async (id: string) => {
    await axiosApi.delete(`contact/${id}.json`);
})

