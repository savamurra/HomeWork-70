import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.tsx";
import { Container } from "@mui/material";
import Contacts from "./containers/Contacts/Contacts.tsx";
import ContactsForm from "./components/ContactsForm/ContactsForm.tsx";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Container>
        <Routes>
          <Route path="/" element={<Contacts />} />
          <Route path="contactForm" element={<ContactsForm />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
