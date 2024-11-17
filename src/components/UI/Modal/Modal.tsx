import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {closeModal} from "../../../store/slices/contactSlice.ts";
import {Button, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {RootState} from "../../../app/store.ts";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {NavLink} from "react-router-dom";
import {deleteContact, getContacts} from "../../../store/thunks/contactThunks.ts";
import {useCallback} from "react";


const Modal = () => {
    const dispatch = useAppDispatch();
    const isOpenModal = useAppSelector((state: RootState) => state.contact.isOpenModal);
    const selectedContact = useAppSelector((state: RootState) => state.contact.selectedContact);

    const onDelete = useCallback(async (id: string) => {
        await dispatch(deleteContact(id))
        dispatch(closeModal())
        await dispatch(getContacts())
    },[dispatch])


    if (!isOpenModal) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 8,
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            }}>
                <IconButton
                    style={{
                        marginLeft: 480,
                        padding: 0,
                    }}
                    onClick={() => dispatch(closeModal())}
                >
                    <CloseIcon/>
                </IconButton>
                {selectedContact && (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        marginBottom: 20,
                        alignItems: 'center',
                        justifyItems: 'center',
                    }}>
                        <img src={selectedContact.photo} alt={selectedContact.name}
                             style={{width: 150, height: 130}}
                        />
                        <div style={{width: '100%'}}>
                            <p>
                                <PersonIcon style={{marginRight: 8, verticalAlign: 'middle'}}/>
                                {selectedContact.name}
                            </p>
                            <p>
                                <EmailIcon style={{marginRight: 8, verticalAlign: 'middle'}}/>
                                {selectedContact.email}
                            </p>
                            <p>
                                <PhoneIcon style={{marginRight: 8, verticalAlign: 'middle'}}/>
                                {selectedContact.phone}
                            </p>
                        </div>
                        <Button style={{ width: 120}}
                            onClick={() => onDelete(selectedContact.id)}
                        >
                            <DeleteIcon/>
                            Delete
                        </Button>
                        <Button to='/contactForm'
                                component={NavLink}
                                style={{ width: 120}}
                                onClick={() => dispatch(closeModal())}
                        >
                            <EditIcon style={{marginRight: 8}}/>
                            Edit
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
