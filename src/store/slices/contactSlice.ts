import {createSlice} from "@reduxjs/toolkit";
import {IContact} from "../../types";
import {createContact} from "../thunks/contactThunks.ts";

interface ContactState {
    contacts: IContact[];
    isLoading: boolean;
}

const initialState: ContactState = {
    contacts: [],
    isLoading: false,
}

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
    }
})