import { Navbar, Nav, NavItem, NavLink, NavbarBrand } from "reactstrap";

export default function Navigationbar() {
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand className="ml-5">LitePM</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink>Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              App
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}
