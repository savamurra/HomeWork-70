import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getContacts} from "../../store/thunks/contactThunks.ts";
import { getAllContacts, isLoading, openModal} from "../../store/slices/contactSlice.ts";
import {useEffect} from "react";
import {Typography} from "@mui/material";
import Modal from "../../components/UI/Modal/Modal.tsx";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";


const Contacts = () => {
    const dispatch = useAppDispatch();
    const contacts = useAppSelector(getAllContacts)
    const loading = useAppSelector(isLoading)


    useEffect(() => {
        dispatch(getContacts())
    }, [dispatch])

    return (
        <>
            {loading ? (
                <Spinner/>
            ) : <div style={{maxWidth: 400, border: "6px solid SteelBlue", padding: 10,}}>
                <Modal/>
                <Typography variant='h5' style={{textAlign: "center", textTransform: "uppercase"}}>
                    Contacts list
                </Typography>
                {contacts.map((contact) => (
                    <div key={contact.id}
                         style={{
                             display: "flex",
                             padding: 10,
                             gap: 20,
                             alignItems: "center",
                             borderBottom: "2px solid SteelBlue",
                             margin: 10,
                             cursor: "pointer"
                         }}
                         onClick={() => dispatch(openModal(contact))}>
                        <img src={contact.photo} alt={contact.name} style={{
                            width: 120,
                            height: 100,
                            border: '2px solid Teal',
                            padding: 4,
                            borderRadius: '50%'
                        }}/>
                        <p>{contact.name}</p>
                    </div>
                ))}
            </div>
            }

        </>
    );
};

export default Contacts;