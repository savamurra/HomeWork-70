import NewContacts from "./containers/NewContacts/NewContacts.tsx";
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.tsx";
import {Container} from "@mui/material";
import Contacts from "./containers/Contacts/Contacts.tsx";

function App() {

    return (
        <>
            <header>
            <Navbar/>
            </header>
            <Container>
                <Routes>
                    <Route path="/" element={<Contacts/>}/>
                    <Route path="newContact" element={<NewContacts/>}/>
                </Routes>
            </Container>
        </>
    )
}

export default App;
