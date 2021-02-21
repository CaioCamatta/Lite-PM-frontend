import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,
  Container,
} from "reactstrap";
import Head from "next/head";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar color="light" light expand="md">
        <Container>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />
          <NavbarBrand>LitePM</NavbarBrand>
          <Nav className="ml-5 ">
            <NavItem>
              <Link href="/">
                <a>
                  <NavLink>Home</NavLink>
                </a>
              </Link>
            </NavItem>
            <NavItem>
              <NavLink>App</NavLink>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
      <div>{children}</div>
      <div className="bg-dark text-white text-center mt-3">
        <p className="px-3 py-4 m-0">
          Created by Caio, Caleb, Jaskanwar, Jason in Canada. © 2021
        </p>
      </div>
    </div>
  );
}
