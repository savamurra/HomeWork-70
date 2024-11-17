import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IContact} from "../../types";
import {createContact, deleteContact, editContact, getContacts} from "../thunks/contactThunks.ts";
import {RootState} from "../../app/store.ts";

interface ContactState {
    contacts: IContact[];
    isLoading: boolean;
    selectedContact: IContact | null;
    isOpenModal: boolean;
}

const initialState: ContactState = {
    contacts: [],
    isOpenModal: false,
    selectedContact: null,
    isLoading: false,
}

export const getAllContacts = (state: RootState) => state.contact.contacts

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<IContact>) => {
            state.selectedContact = action.payload;
            state.isOpenModal = true;
        },
        closeModal: (state) => {
            state.isOpenModal = false;
        },
        resetSelectedContact: (state) => {
            state.selectedContact = null;
        }
    },
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
            .addCase(editContact.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editContact.fulfilled, (state) => {
                state.isLoading = false;
                state.selectedContact = null
            })
            .addCase(editContact.rejected, state => {
                state.isLoading = false;
            })
            .addCase(deleteContact.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteContact.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteContact.rejected, state => {
                state.isLoading = false;
            })
    }
})

export const {openModal, closeModal, resetSelectedContact} = contactSlice.actions;