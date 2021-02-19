import React, { Component } from "react";
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonGroup,
} from "reactstrap";

import styles from "../../styles/AppPage.module.css";

import Navigationbar from "./Navigationbar";
import ProjectDetails from "./ProjectDetails";
import TeamMember from "./TeamMember";
import Task from "./Task";
import ProjectDocuments from "./ProjectDocuments";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import axios from 'axios';

const baseUrl = `http://localhost:5000`;

class AppPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamMembers: [],
      project: {
        documents: [
          { name: "Planning", url: "https://www.google.com/9smc7h2" },
          { name: "Design", url: "https://www.google.com/8sn3da1" },
        ],
      },
      showAddMember: false,
      memberName: "Name",
      memberEmail: "Email",
      memberGit: "Github Link",
      memberPhone: "Phone Number",
      showAddTask: false,
      taskName: "Name",
      taskDescription: "Description",
      taskDuration: 0,
      taskDurationType: 0, //0 for hours, 1 for days
    };
    this.addTeamMember = this.addTeamMember.bind(this);
    this.toggleAddMemberModal = this.toggleAddMemberModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderCreateMemberModal = this.renderCreateMemberModal.bind(this);
  }

  toggleAddMemberModal() {
    this.setState({ showAddMember: !this.state.showAddMember });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "number" ? target.number : target.value;
    const name = target.name;

    this.setState({
      [name]: target.value,
    });
  }

  addTeamMember() {
    this.toggleAddMemberModal();
    let members = this.state.teamMembers;
    members.push(
      <TeamMember
        name={this.state.memberName}
        email={this.state.memberEmail}
        git={this.state.memberGit}
        phone={this.state.memberPhone}
      ></TeamMember>
    );

    //This creates members into the database 
    //const queryString = window.location.search;
    //const urlParams = new URLSearchParams(queryString)
    //const projectId = urlParams.get('projectId');
    
    //Used for testing need to remove after for production
    const projectId = "944f27b6-e6a0-4f2b-af4b-2d3911fc7d76";
    axios.post(`${baseUrl}/api/members/create`,{projectId: projectId, name: this.state.memberName, email: this.state.memberEmail, github: this.state.memberGit, phone: this.state.memberPhone});

    this.setState({
      teamMembers: members,
      memberName: "Name",
      memberEmail: "Email",
      memberGit: "Github Link",
      memberPhone: "Phone Number",
    });
  }

  renderCreateMemberModal() {
    return (
      <Modal
        isOpen={this.state.showAddMember}
        toggle={this.toggleAddMemberModal}
      >
        <ModalHeader>Add a Team Member</ModalHeader>
        <ModalBody className="text-center">
          <label>
            <input
              className={styles.inputs}
              name="memberName"
              type="text"
              placeholder="Name"
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            <input
              className={styles.inputs}
              name="memberEmail"
              type="text"
              placeholder="Email"
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            <input
              className={styles.inputs}
              name="memberGit"
              type="text"
              placeholder="Github Link"
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            <input
              className={styles.inputs}
              name="memberPhone"
              type="text"
              placeholder="Phone"
              onChange={this.handleChange}
            />
          </label>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleAddMemberModal}>
            cancel
          </Button>
          <Button color="success" onClick={this.addTeamMember}>
            Add Member
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  toggleAddTaskModal = () => {
    this.setState({ showAddTask: !this.state.showAddTask });
  };

  renderCreateMemberModal() {
    return (
      <Modal
        isOpen={this.state.showAddMember}
        toggle={this.toggleAddMemberModal}
      >
        <ModalHeader>Add a Team Member</ModalHeader>
        <ModalBody className="text-center">
          <label>
            <input
              className={styles.inputs}
              name="memberName"
              type="text"
              placeholder="Name"
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            <input
              className={styles.inputs}
              name="memberEmail"
              type="text"
              placeholder="Email"
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            <input
              className={styles.inputs}
              name="memberGit"
              type="text"
              placeholder="Github Link"
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            <input
              className={styles.inputs}
              name="memberPhone"
              type="text"
              placeholder="Phone"
              onChange={this.handleChange}
            />
          </label>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleAddMemberModal}>
            cancel
          </Button>
          <Button color="success" onClick={this.addTeamMember}>
            Add Member
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  setDurationType = (num) => {
    this.setState({ taskDurationType: num });
  };

  renderAddTaskModal = () => {
    return (
      <Modal isOpen={this.state.showAddTask} toggle={this.toggleAddTaskModal}>
        <ModalHeader>Add a Task</ModalHeader>
        <ModalBody className="text-center">
          <div className='float-left'>
            <label>
              <input
                className={styles.inputs}
                name="taskName"
                type="text"
                placeholder="Name"
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label>
              <input
                className={styles.inputs}
                name="taskDescription"
                type="text"
                placeholder="Description"
                onChange={this.handleChange}
              />
            </label>
            <br />
            <div className="float-left">
              <label>
                <input
                  className={styles.duration}
                  name="taskDuration"
                  type="number"
                  placeholder="0"
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <ButtonGroup className="ml-2">
              <Button
                color="secondary"
                onClick={() => this.setDurationType(0)}
                active={this.state.taskDurationType === 0}
              >
                Hours
              </Button>
              <Button
                color="secondary"
                onClick={() => this.setDurationType(1)}
                active={this.state.taskDurationType === 1}
              >
                Days
              </Button>
            </ButtonGroup>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleAddTaskModal}>
            cancel
          </Button>
          <Button color="success" onClick={this.addTask}>
            Add Task
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  addTask = () => {};

  render() {
    return (
      <div>
        <Navigationbar></Navigationbar>
        <Container className="mt-5">
          <ProjectDetails></ProjectDetails>
          <h2 className={styles.h2}>The Team</h2>
          <div className="d-flex">{this.state.teamMembers}</div>
          <Button
            color="secondary mt-2"
            className={styles.add}
            onClick={this.toggleAddMemberModal}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Member
          </Button>
          <h2 className={styles.h2}>Tasks and Timeline</h2>
          <h2 className={styles.todoHeader}>To-do</h2>
          <div className="d-flex">
            <Task></Task>
          </div>
          <Button
            color="secondary mt-2"
            className={styles.add}
            onClick={this.toggleAddTaskModal}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Task
          </Button>

          <ProjectDocuments
            documents={this.state.project.documents}
            className="mt-5"
          />
        </Container>

        <div>
          <this.renderCreateMemberModal />
          <this.renderAddTaskModal />
        </div>
      </div>
    );
  }
}

export default AppPage;
