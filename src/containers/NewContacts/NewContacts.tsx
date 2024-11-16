import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks.ts';
import ContactsForm from "../../components/ContactsForm/ContactsForm.tsx";
import {IContactsForm} from "../../types";
import {createContact} from "../../store/thunks/contactThunks.ts";


const NewContacts = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();


    const addNewContact = async (contact: IContactsForm) => {
        await dispatch(createContact({...contact}));
        navigate('/');
    };

    return (
        <div className="mb-2">
            <ContactsForm addNewContact={addNewContact}/>
        </div>
    );
};

export default NewContacts;