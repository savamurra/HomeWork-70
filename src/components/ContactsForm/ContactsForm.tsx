import {useEffect, useState} from "react";
import {IContactsForm} from "../../types";
import {Button, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import * as React from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {RootState} from "../../app/store.ts";
import {editContact} from "../../store/thunks/contactThunks.ts";
import {resetSelectedContact} from "../../store/slices/contactSlice.ts";
import {useNavigate} from "react-router-dom";

interface IProps {
    addNewContact: (contact: IContactsForm) => void;
}

const initialState = {
    name: '',
    phone: '',
    email: '',
    photo: '',
}

const ContactsForm: React.FC<IProps> = ({addNewContact}) => {
    const [form, setForm] = useState<IContactsForm>(initialState);
    const selectedContact = useAppSelector((state: RootState) => state.contact.selectedContact);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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
            if (form.name.trim().length > 0 ) {
                addNewContact(form);
            }
        }
        setForm(initialState);
    }
    return (
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
                    />
                </Grid>
                <Grid size={8}>
                    {form.photo && (
                        <img src={form.photo} alt={form.name} style={{width: 250, height: 140}}/>
                    )}
                </Grid>
                <Grid size={8}>
                <Button type="submit" variant="contained" sx={{width: "100%"}}>
                    {selectedContact ? 'Edit' : 'Create'}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ContactsForm;