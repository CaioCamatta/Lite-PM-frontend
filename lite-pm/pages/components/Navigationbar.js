import { Navbar, Nav, NavItem, NavLink, NavbarBrand, Container } from "reactstrap";


export default function Navigationbar() {
  return (
    <div>
      <Navbar color="light" light expand="md">
        <Container>
          <NavbarBrand>LitePM</NavbarBrand>
          <Nav className="ml-5" navbar>
            <NavItem>
              <NavLink>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>App</NavLink>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
