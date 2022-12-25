import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Invoicenavbar() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Invoice Manager</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#newInvoice">Create Invoice</Nav.Link>
            <Nav.Link href="#pastInvoice">Past Invoices</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Invoicenavbar;
