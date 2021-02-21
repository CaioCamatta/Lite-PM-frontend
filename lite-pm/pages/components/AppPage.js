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
import Timeline from "./Timeline";
import ProjectDocuments from "./ProjectDocuments";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import uuid from "react-uuid";

const baseUrl = `http://localhost:5000`;

class AppPage extends Component {
  constructor(props) {
    super(props);

    this.timelineReferences = [];
    this.taskReferences = [];

    this.state = {
      teamMembers: [],
      project: {
        projectId: "944f27b6-e6a0-4f2b-af4b-2d3911fc7d76",
        tasks: [
          { taskID: "23123413", assignee: "jas", name: "some task" },
          { taskID: "23129413", assignee: -1, name: "another task" },
          { taskID: "1234", assignee: "caleb", name: "todo task" },
        ],
        documents: [
          {
            title: "Planning",
            url: "https://www.google.com/9smc7h2",
            documentId: "bdfe8bfe-ce0b-4bcf-aa4f-a6b31c1b42cc",
          },
          { title: "Design", url: "https://www.google.com/8sn3da1" },
        ],
        members: [
          {
            memberID: "caleb",
            email: "asdas@asd.com",
            taskList: [],
            name: "caleb",
          },
          {
            memberID: "jas",
            email: "asdas@asd.com",
            taskList: [],
            name: "jas",
          },
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

      todoTasks: [],
    };

    this.addTeamMember = this.addTeamMember.bind(this);
    this.toggleAddMemberModal = this.toggleAddMemberModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderCreateMemberModal = this.renderCreateMemberModal.bind(this);    
  }

  componentDidMount() {
    //reset the member task lists
    let members = this.state.project.members;
    let todos = this.state.todoTasks;

    //assign all tasks to their proper locations
    for (let i = 0; i < this.state.project.tasks.length; i++) {
      if (this.state.project.tasks[i].assignee === -1) {
        todos.push(this.state.project.tasks[i]);
      } else {
        for (let j = 0; j < this.state.project.members.length; j++) {
          if (members[j].memberID === this.state.project.tasks[i].assignee) {
            members[j].taskList.push(this.state.project.tasks[i]);
            break;
          }
        }
      }
    }

    this.setState({ members: members, todoTasks: todos });
  }

  refreshTasks = () => {
    //reset the member task lists
    let wiper = this.state.project.members;
    for (let i = 0; i < wiper.length; i++) {
      wiper[i].taskList = [];
    }

    this.setState({ members: wiper, todoTasks: [] }, () => {
      let members = this.state.project.members;
      let todos = this.state.todoTasks;
      for (let i = 0; i < this.state.project.tasks.length; i++) {
        if (this.state.project.tasks[i].assignee === -1) {
          todos.push(this.state.project.tasks[i]);
        } else {
          for (let j = 0; j < members.length; j++) {
            if (members[j].memberID === this.state.project.tasks[i].assignee) {
              members[j].taskList.push(this.state.project.tasks[i]);
              break;
            }
          }
        }
      }

      this.setState({ members: members, todoTasks: todos })
    });
    
  };

  toggleAddTaskModal = () => {
    this.setState({ showAddTask: !this.state.showAddTask });
  };

  setDurationType = (num) => {
    this.setState({ taskDurationType: num });
  };

  renderAddTaskModal = () => {
    return (
      <Modal isOpen={this.state.showAddTask} toggle={this.toggleAddTaskModal}>
        <ModalHeader>Add a Task</ModalHeader>
        <ModalBody className="text-center">
          <div className="float-left">
            <label>
              <div className="float-left">Title*</div>
              <input
                className={styles.taskInput}
                name="taskName"
                type="text"
                placeholder="Title"
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label>
              <div className="float-left">Description</div>
              <input
                className={styles.taskInput}
                name="taskDescription"
                type="text"
                placeholder="Description"
                onChange={this.handleChange}
              />
            </label>
            <br />

            <div className="float-left">
              <div className={styles.durationText}>Duration*</div>
              <label>
                <input
                  className={styles.duration}
                  name="taskDuration"
                  type="number"
                  placeholder="0"
                  onChange={this.handleChange}
                />
              </label>
              <ButtonGroup className="ml-3">
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

  addTask = () => {
    this.toggleAddTaskModal();
    let tempTasks = this.state.project.tasks;
    tempTasks.push({
      handleStop: this.handleStop,
      key: uuid(),
      taskID: uuid(),
      index: tempTasks.length,
      name: this.state.taskName,
      description: this.state.taskDescription,
      duration: this.state.taskDuration,
      durationType: this.state.taskDurationType,
      assignee: -1,
    });

    this.setState(
      {
        tasks: tempTasks,
        taskName: "Name",
        taskDescription: "Description",
        taskDuration: 0,
        taskDurationType: 0,
      },
      () => this.refreshTasks()
    );
  };

  toggleAddMemberModal() {
    this.setState({ showAddMember: !this.state.showAddMember });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  addTeamMember() {
    this.toggleAddMemberModal();
    let members = this.state.teamMembers;
    members.push(
      <TeamMember
        key={uuid()}
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
    axios.post(`${baseUrl}/api/members/create`, {
      projectId: projectId,
      name: this.state.memberName,
      email: this.state.memberEmail,
      github: this.state.memberGit,
      phone: this.state.memberPhone,
    });

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

  addTimelineReference = (id, reference) => {
    this.timelineReferences[id] = reference;
  };

  addTaskReference = (id, reference) => {
    this.taskReferences[id] = reference;
  };

  handleStop = (event, draggableData) => {
    let draggableY = event.y;
    //get the key  of the draggableData to find in references
    let index = draggableData.node.children[0].attributes.dataindex.value;

    //reference to the task being moved
    let reference = this.taskReferences[index].current;

    //arrays of keys to the timelines
    let timelineKeys = Object.keys(this.timelineReferences);
    //loop through timeline references
    //if draggable x,y is close to a reference, get that references memberID and set the tasks assignee to that memberID
    //when changing the assignee, we must update the database (for now just change it in the state if possible)
    console.log(this.timelineReferences)
    for (let i = 0; i < timelineKeys.length; i++) {
      let timelineY =
        this.timelineReferences[
          timelineKeys[i]
        ].current.childRef.current.getBoundingClientRect().y +
        this.timelineReferences[
          timelineKeys[i]
        ].current.childRef.current.getBoundingClientRect().height /
          2;
      
      if (Math.abs(draggableY - timelineY) < 30) {
        let tasks = this.state.project.tasks;
        //if the task was already there, do nothing
        if (
          reference.props.assignee ===
          this.timelineReferences[timelineKeys[i]].current.props.memberID
        ) {
          break;
        } else {
          for (let j = 0; j < tasks.length; j++) {
            //otherwise reset the assignee
            if (tasks[j].taskID === reference.props.taskID) {
              tasks[j].assignee = this.timelineReferences[
                timelineKeys[i]
              ].current.props.memberID;
              break;
            }
          }

          this.setState({ tasks: tasks}, () => {
            this.refreshTasks();
          });
        }
        break;
      }
    }
  };

  render() {
    const commonProps = {
      apiBaseUrl: baseUrl,
      projectId: this.state?.project?.projectId,
    };

    return (
      <div>
        <Navigationbar></Navigationbar>
        <Container className="mt-5 mb-5">
          <ProjectDetails></ProjectDetails>
          <h2 className={styles.h2}>The Team</h2>
          {/* add map for team members */}
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
          <Timeline
            project={this.state.project}
            handleStop={this.handleStop}
            addTimelineReference={this.addTimelineReference}
            addTaskReference={this.addTaskReference}
            todoTasks={this.state.todoTasks}
            addTaskModal={this.toggleAddTaskModal}
          ></Timeline>

          <ProjectDocuments
            documents={this.state.project.documents}
            className="mt-5"
            {...commonProps}
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
