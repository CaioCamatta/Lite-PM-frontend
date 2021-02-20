import Head from "next/head";
import { Button, Row, Col, Container } from "reactstrap";
import AppPage from "./components/AppPage.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Layout from "./components/Layout";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Container className="mb-5 px-4">
          <Row
            className={
              styles.smTextCenter + " " + styles.hero + " d-flex d-flex px-3"
            }
          >
            <Col
              sm={{ size: 8 }}
              md={{ size: 6, offset: 1 }}
              offset={1}
              className="my-auto"
            >
              <h1>The eastiest way to manage your small project</h1>
              <p className="mt-3 mb-4 text-110">
                LitePM allows you to create and schedule tasks in an easy-to-use
                Gantt chart, manage team members, and easily create and share
                Google Docs with your team. All in a <b>single page</b>!
              </p>
              <Button size="lg" color="secondary mb-4">
                Start Project
              </Button>
            </Col>
            <Col
              sm={{ size: 4, offset: 0 }}
              md={{ size: 4, offset: 1 }}
              lg={{ size: 4, offset: 0 }}
              className="my-auto d-flex"
            >
              <FontAwesomeIcon
                icon={faUsers}
                color="#444444"
                className={styles.heroImage + " mx-auto"}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={{ size: 10, offset: 1 }}>
              <div className="mt-5 mb-5 pl-4">
                <h3 className="pl-2">How it Works</h3>
                <ol>
                  <li className="mb-2">Start your Project</li>
                  <li className="mb-2">
                    Share the Project Link with your teammates
                  </li>
                  <li className="mb-2">Manage your Project!</li>
                </ol>
              </div>
            </Col>
          </Row>
          <Row className={"mb-5 mt-2 d-flex " + styles.smMY3}>
            <Col sm={5} className={styles.smTextCenter + " text-right my-auto"}>
              <h2>Gather Team Info</h2>
              <p>Keep track of everyone’s names, emails, and other info.</p>
            </Col>
            <Col sm={7} className="p-4">
              <div className={styles.imageWithShadow + " rounded-xl"}>
                <Image
                  src="/index1.png"
                  alt="Gather Team Member Info LitePM"
                  width={925}
                  height={418}
                  className="rounded-xl"
                />
              </div>
            </Col>
          </Row>
          <Row className={"my-4 d-flex flex-row-reverse " + styles.smMY3}>
            <Col sm={5} className={styles.smTextCenter + " my-auto"}>
              <h2>Schedule Tasks</h2>
              <p>
                Create your tasks and use our drag-and-drop Gantt chart to
                assign tasks and visualize your project timeline.
              </p>
            </Col>
            <Col sm={{ size: 6, offset: 1 }} className="p-4">
              <div className={styles.imageWithShadow + " rounded-xl"}>
                <Image
                  src="/index2.png"
                  alt="Schedule Tasks Gantt Chart Info LitePM"
                  width={1100}
                  height={550}
                  className="rounded-xl"
                />
              </div>
            </Col>
          </Row>
          <Row className={"my-5 d-flex " + styles.smMY3}>
            <Col sm={5} className={styles.smTextCenter + " text-right my-auto"}>
              <h2>Keep track of documents</h2>
              <p>Easily create and keep track of all your Google Docs</p>
            </Col>
            <Col sm={7} className="p-4">
              <div className={styles.imageWithShadow + " rounded-xl"}>
                <Image
                  src="/index3.png"
                  alt="Documents LitePM"
                  width={638}
                  height={224}
                  className="rounded-xl"
                />
              </div>
            </Col>
          </Row>
          <Row className="d-flex mt-3 pb-4">
            <Button color="secondary mx-auto" size="lg">
              Start Project
            </Button>
          </Row>
        </Container>
      </Layout>{" "}
    </div>
  );
}
