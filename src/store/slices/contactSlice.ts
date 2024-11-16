import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IContact} from "../../types";
import {createContact, getContacts} from "../thunks/contactThunks.ts";
import {RootState} from "../../app/store.ts";

interface ContactState {
    contacts: IContact[];
    isLoading: boolean;
}

const initialState: ContactState = {
    contacts: [],
    isLoading: false,
}

export const getAllContacts = (state: RootState) => state.contact.contacts

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createContact.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createContact.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createContact.rejected, state => {
                state.isLoading = false;
            })
            .addCase(getContacts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getContacts.fulfilled, (state,action: PayloadAction<IContact[]>) => {
                state.isLoading = false;
                state.contacts = action.payload;
            })
            .addCase(getContacts.rejected, state => {
                state.isLoading = false;
            })
    }
})