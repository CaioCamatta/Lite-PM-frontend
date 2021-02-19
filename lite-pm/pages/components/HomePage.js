import React, { Component } from "react";
import { Container, Button } from "reactstrap";
import styles from "../../styles/HomePage.module.css";
import Navigationbar from "./Navigationbar";
import Router from 'next/router';

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Navigationbar></Navigationbar>
        <Container className={styles.container}>
          <div>
            <h1 className={styles.h1}>
              The eastiest way to manage your small project
            </h1>
            <div className={styles.description}>
              LitePM allows you to create and schedule tasks in an easy-to-use
              Gantt chart, manage team members, and easily create and share
              Google Docs with your team. All in a single page!
            </div>
          </div>
          <div className={styles.homeImage}>
            <img src="" alt="img"></img>
          </div>
          <Button color="secondary" onClick={() => Router.push('/projects/Test')}>
            Create Project
          </Button>
        </Container>
        <div></div>
      </div>
    );
  }    
}
