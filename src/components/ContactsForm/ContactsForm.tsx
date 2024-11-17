import {useCallback, useEffect, useState} from "react";
import {IContactsForm} from "../../types";
import {Button, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import * as React from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {RootState} from "../../app/store.ts";
import {createContact, editContact} from "../../store/thunks/contactThunks.ts";
import {isLoading, resetSelectedContact} from "../../store/slices/contactSlice.ts";
import {useNavigate} from "react-router-dom";
import Spinner from "../UI/Spinner/Spinner.tsx";


const initialState = {
    name: '',
    phone: '',
    email: '',
    photo: '',
}

const ContactsForm = () => {
    const [form, setForm] = useState<IContactsForm>(initialState);
    const selectedContact = useAppSelector((state: RootState) => state.contact.selectedContact);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loading = useAppSelector(isLoading);

    const isDisabled = () => {
        if (form.name.trim().length > 0 && form.phone.trim().length > 0 && form.email.trim().length > 0) {
            return true;
        }
    }

    const newContact = useCallback(async (contact: IContactsForm) => {
        await dispatch(createContact({...contact}));
        navigate('/')
    }, [dispatch])

    useEffect(() => {
        if (selectedContact) {
            setForm(selectedContact);
        } else {
            setForm(initialState);
        }
        return () => {
            dispatch(resetSelectedContact());
        }
    }, [selectedContact, dispatch]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    }


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedContact) {
            await dispatch(editContact({...selectedContact, ...form}));
            dispatch(() => dispatch(resetSelectedContact()))
            navigate("/")
        } else {
            if (form.name.trim().length > 0) {
                await newContact(form);
            }
        }
        setForm(initialState);
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <Typography variant="h4" sx={{flexGrow: 1, textAlign: "center",}}>
                    {selectedContact ? 'Edit Form' : 'Create Form'}
                </Typography>
                <Grid container spacing={2} sx={{mx: "auto", width: "50%", mt: 4, justifyContent: "center"}}>
                    <Grid size={8}>
                        <TextField
                            sx={{width: "100%"}}
                            id="outlined-basic"
                            label="Name"
                            name="name"
                            value={form.name}
                            variant="outlined"
                            onChange={onChange}
                            required
                        />
                    </Grid>
                    <Grid size={8}>
                        <TextField
                            sx={{width: "100%"}}
                            id="outlined-basic"
                            label="Phone"
                            name="phone"
                            value={form.phone}
                            variant="outlined"
                            onChange={onChange}
                            required
                        />
                    </Grid>
                    <Grid size={8}>
                        <TextField
                            sx={{width: "100%"}}
                            id="outlined-basic"
                            label="Email"
                            name="email"
                            value={form.email}
                            variant="outlined"
                            onChange={onChange}
                            required
                        />
                    </Grid>
                    <Grid size={8}>
                        <TextField
                            sx={{width: "100%"}}
                            id="outlined-basic"
                            label="Photo"
                            name="photo"
                            value={form.photo}
                            variant="outlined"
                            onChange={onChange}
                            required
                        />
                    </Grid>
                    <Grid size={8}>
                        {form.photo && (
                            <img src={form.photo} alt={form.name} style={{width: 250, height: 140}}/>
                        )}
                    </Grid>
                    <Grid size={8}>
                        <Button color="secondary" type="submit" variant="contained" sx={{width: "100%"}} disabled={!isDisabled()}>
                            {loading ? (<Spinner/>) : null}
                            <span style={{marginRight: "20px"}}>
                            {selectedContact ? 'Edit' : 'Create'}
                            </span>
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default ContactsForm;