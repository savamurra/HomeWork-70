import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosAPI.tsx";
import {IContactsForm} from "../../types";

export const createContact = createAsyncThunk<void, IContactsForm>('dishes/createDish', async (contact: IContactsForm) => {
    await axiosApi.post('contact.json', {...contact});
});
