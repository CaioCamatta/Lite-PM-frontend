import React, { Component } from "react";
import { Container, Button, Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import styles from "../../styles/HomePage.module.css";
import Navigationbar from "./Navigationbar";
import Router from 'next/router';
import axios from "axios";
const baseUrl = "http://localhost:5000";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddProject: false,
      projectName: "Name",
      projectDescription: "Description",
      projectDuration: 0,
    };
    this.toggleAddProjectModal = this.toggleAddProjectModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addProject = this.addProject.bind(this);
    this.renderCreateProjectModal = this.renderCreateProjectModal.bind(this);
  }
  
///////////////////////////////////////////////////////////////////////////////////////
  createProject(){
    return axios.post(`${baseUrl}/api/project/create`, {
      newName: this.state.projectName,
      newDuration: this.state.projectDuration,
      newDescription: this.state.projectDescription
    }).then((res) => {
      Router.push(`/projects/${res.data}`);
    }, (err) => {
      console.log(err)
    })
  }
//////////////////////////////////////////////////////////////////////////////////////

handleChange(event) {
  const target = event.target;
  const value = target.type === "number" ? target.number : target.value;
  const name = target.name;

  this.setState({
    [name]: target.value,
  });
}

  toggleAddProjectModal() {
    this.setState({ showAddProject: !this.state.showAddProject });
  }
  
  addProject() {
    this.toggleAddProjectModal();
    this.createProject();
    this.setState({
      projectName: "Project Name",
      projectDescription: "Description",
      projectDuration: "Duration"
    });
  }

  renderCreateProjectModal() {
    return (
      <Modal
        isOpen={this.state.showAddProject}
        toggle={this.toggleAddProjectModal}
      >
        <ModalHeader className="modal-header border-0">Create a new project!</ModalHeader>
        <ModalBody className="text-left">
          <label>
            Project Name
            <br/>
            <input
              className={styles.inputs}
              name="projectName"
              type="text"
              placeholder="Project Name"
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Description
            <br/>
            <input
              className={styles.inputs}
              name="projectDescription"
              type="text"
              placeholder="Description"
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Duration
            <br/>
            <input
              className={styles.duration}
              name="projectDuration"
              type="number"
              placeholder="0"
              onChange={this.handleChange}
            />
          </label>
        </ModalBody>
        <ModalFooter className="modal-footer border-0">
          <Button outline color="secondary" onClick={this.toggleAddProjectModal}>
            cancel
          </Button>
          <Button color="secondary" onClick={this.addProject}>
            Create Project
          </Button>
        </ModalFooter>
      </Modal>
    );
  }  

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
          <Button color="secondary" onClick={this.toggleAddProjectModal}>
            Create Project
          </Button>
        </Container>

        <div>
          <this.renderCreateProjectModal/>
        </div>
      </div>
    );
  }

}
