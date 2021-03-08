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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

export default function Layout({ children, title }) {
  return (
    <div>
      <Head>
        <title>LitePM{title ? " | " + title : null}</title>
        <meta
          name="description"
          content="The eastiest way to manage your small project. LitePM allows you to create and schedule tasks on a Gantt chart, manage team members, and share documents."
        />
        <meta property="og:title" content="LitePM" />
        <meta property="og:site_name" content="LitePM" />
        <meta property="og:url" content="https://litepm.com/" />
        <meta
          property="og:description"
          content="The eastiest way to manage your small project. LitePM allows you to create and schedule tasks on a Gantt chart, manage team members, and share documents."
        />
        <meta property="og:type" content="product" />
        <meta property="og:image" content="https://litepm.com/og-logo.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        className="text-white"
        expand="md"
        style={{ backgroundColor: "#6BA4C7" }}
      >
        <Container>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />
          <Link href="/">
            <a>
              <NavbarBrand>
                <img src="/logo-white.png" height={46} className="p-1" />
              </NavbarBrand>
            </a>
          </Link>
          <Nav className="ml-5 ">
            <NavItem>
              <Link href="/">
                <a>
                  <NavLink>Home</NavLink>
                </a>
              </Link>
            </NavItem>
            {/* <NavItem>
              <NavLink>App</NavLink>
            </NavItem> */}
          </Nav>
        </Container>
      </Navbar>
      <div>{children}</div>
      <div className="bg-dark text-white text-center mt-3">
        <p className="px-3 py-4 m-0">
          Created by{" "}
          <a href="https://www.linkedin.com/in/caio-coelho/">
            Caio C. Coelho{" "}
            <FontAwesomeIcon
              icon={faExternalLinkAlt}
              width={12}
              className="mx-1 mb-1"
            />
          </a>
          ,{" "}
          <a href="https://www.linkedin.com/in/caleb-sutherland/">
            Caleb Sutherland
            <FontAwesomeIcon
              icon={faExternalLinkAlt}
              width={12}
              className="mx-1 mb-1"
            />
          </a>
          ,{" "}
          <a href="https://www.linkedin.com/in/jaskanwar-randhawa/">
            Jaskanwar Randhawa
            <FontAwesomeIcon
              icon={faExternalLinkAlt}
              width={12}
              className="mx-1 mb-1"
            />
          </a>
          ,{" "}
          <a href="https://www.linkedin.com/in/jason-maslanka/">
            Jason Maslanka
            <FontAwesomeIcon
              icon={faExternalLinkAlt}
              width={12}
              className="mx-1 mb-1"
            />
          </a>{" "}
          in <b>Canada</b>. Logo by{" "}
          <a href="https://www.linkedin.com/in/ben-millard00/">
            Ben Millard
            <FontAwesomeIcon
              icon={faExternalLinkAlt}
              width={12}
              className="mx-1 mb-1"
            />
          </a>
          . © 2021
        </p>
      </div>
    </div>
  );
}
