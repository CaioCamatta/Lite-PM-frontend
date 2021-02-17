import React, { Component } from "react";
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Navigationbar from "./Navigationbar";
import ProjectDetails from "./ProjectDetails";
import styles from "../../styles/AppPage.module.css";
import TeamMember from "./TeamMember";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class AppPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamMembers: [],
      showModal: false,
      memberName: "Name",
      memberEmail: "Email",
      memberGit: "Github Link",
      memberPhone: "Phone Number",
    };
    this.addTeamMember = this.addTeamMember.bind(this);
    this.toggleAddMemberModal = this.toggleAddMemberModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderCreateMemberModal = this.renderCreateMemberModal.bind(this);
  }

  toggleAddMemberModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleChange(event) {
    const target = event.target;
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
      <Modal isOpen={this.state.showModal} toggle={this.toggleAddMemberModal}>
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
          </Button>{" "}
          <Button color="success" onClick={this.addTeamMember}>
            Add Member
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

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
        </Container>

        <div>
          <this.renderCreateMemberModal />
        </div>
      </div>
    );
  }
}

export default AppPage;
