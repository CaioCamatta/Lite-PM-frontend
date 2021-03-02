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

import Layout from "./Layout";
import ProjectDetails from "./ProjectDetails";
import TeamMember from "./TeamMember";
import Timeline from "./Timeline";
import MemberTimeline from "./MemberTimeline";
import ProjectDocuments from "./ProjectDocuments";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import uuid from "react-uuid";

const baseUrl = `https://litepm.redirectme.net`;

class AppPage extends Component {
  constructor(props) {
    super(props);

    this.timelineReferences = [];
    this.taskReferences = [];

    this.state = {
      teamMembers: [],
      project: {
        Task: [],
        Document: [],
        Member: [],
      },
      showAddMember: false,
      memberName: "",
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
    let project = window.location.href.toString();
    let testcase = project.split("/project/");
    this.setState(
      {
        projectId: testcase[1],
      },
      () => {
        this.getProjectDetails(this.addTasksToMemberObjects);
      }
    );
  }

  addTasksToMemberObjects = () => {
    //reset the member task lists
    let members = this.state.project.Member;
    let todos = this.state.todoTasks;

    //assign all tasks to their proper locations
    for (let i = 0; i < this.state.project.Task.length; i++) {
      if (
        this.state.project.Task[i].userId === -1 ||
        !this.state.project.Task[i].userId
      ) {
        todos.push(this.state.project.Task[i]);
      } else {
        for (let j = 0; j < this.state.project.Member.length; j++) {
          if (members[j].userId === this.state.project.Task[i].userId) {
            members[j].taskList = members[j].taskList ?? [];
            members[j].taskList.push(this.state.project.Task[i]);
            break;
          }
        }
      }
    }

    this.setState({ Member: members, todoTasks: todos });
  };

  refreshTasks = () => {
    //reset the member task lists
    let wiper = this.state.project.Member;
    for (let i = 0; i < wiper.length; i++) {
      wiper[i].taskList = [];
    }

    this.setState({ Member: wiper, todoTasks: [] }, () => {
      let members = this.state.project.Member;
      let todos = this.state.todoTasks;
      for (let i = 0; i < this.state.project.Task.length; i++) {
        if (this.state.project.Task[i].userId === -1) {
          todos.push(this.state.project.Task[i]);
        } else {
          for (let j = 0; j < members.length; j++) {
            if (members[j].userId === this.state.project.Task[i].userId) {
              members[j].taskList.push(this.state.project.Task[i]);
              break;
            }
          }
        }
      }

      this.setState({ Member: members, todoTasks: todos });
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
        <ModalHeader className="modal-header border-0">Add a Task</ModalHeader>
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
        <ModalFooter className="modal-footer border-0">
          <Button color="outline secondary" onClick={this.toggleAddTaskModal}>
            Cancel
          </Button>
          <Button color="secondary" onClick={this.addTask}>
            Add Task
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  addTask = () => {
    this.toggleAddTaskModal();
    let tempTasks = this.state.project.Task;
    tempTasks.push({
      handleStop: this.handleStop,
      key: uuid(),
      taskId: uuid(),
      index: tempTasks.length,
      title: this.state.taskName,
      description: this.state.taskDescription,
      duration: this.state.taskDuration,
      durationType: this.state.taskDurationType,
      userId: -1,
    });

    //Put the task connection code here!
    if (this.state.taskDurationType === 0) {
      this.state.taskDuration = this.state.taskDuration * 3600;
    } else {
      this.state.taskDuration = this.state.taskDuration * 86400;
    }

    const projectId = this.state.project.projectId;
    axios.post(`${baseUrl}/api/tasks/create`, {
      projectId: projectId,
      title: this.state.taskName,
      duration: this.state.taskDuration,
      description: this.state.taskDescription,
    });

    this.setState(
      {
        Task: tempTasks,
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

    const projectId = this.state.project.projectId;
    axios
      .post(`${baseUrl}/api/members/create`, {
        projectId: projectId,
        name: this.state.memberName,
        email: this.state.memberEmail,
        github: this.state.memberGit,
        phone: this.state.memberPhone,
      })
      .then(() => {
        this.getProjectDetails();
      });

    this.setState({
      memberName: "",
      memberEmail: "",
      memberGit: "",
      memberPhone: "",
    });
  }

  renderCreateMemberModal() {
    return (
      <Modal
        isOpen={this.state.showAddMember}
        toggle={this.toggleAddMemberModal}
      >
        <ModalHeader className="modal-header border-0">
          Add a Team Member
        </ModalHeader>
        <ModalBody className="text-left">
          <label>
            Name
            <input
              className={styles.inputs}
              name="memberName"
              type="text"
              placeholder="John Doe"
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Email
            <input
              className={styles.inputs}
              name="memberEmail"
              type="text"
              placeholder="JohnDoes@email.com"
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Github Link
            <input
              className={styles.inputs}
              name="memberGit"
              type="text"
              placeholder="github.com/johndoe"
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Phone Number
            <input
              className={styles.inputs}
              name="memberPhone"
              type="text"
              placeholder="999-666-3333"
              onChange={this.handleChange}
            />
          </label>
        </ModalBody>
        <ModalFooter className="modal-footer border-0">
          <Button color="outline secondary" onClick={this.toggleAddMemberModal}>
            Cancel
          </Button>
          <Button
            color="secondary"
            onClick={this.addTeamMember}
            disabled={!this.state.memberName}
          >
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
    //if draggable x,y is close to a reference, get that references memberID and set the tasks userId to that memberID
    //when changing the userId, we must update the database (for now just change it in the state if possible)
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
        let tasks = this.state.project.Task;
        //if the task was already there, do nothing (snap back into place)
        if (
          reference.props.assignee ===
          this.timelineReferences[timelineKeys[i]].current.props.memberID
        ) {
          break;
        } else {
          for (let j = 0; j < tasks.length; j++) {
            //otherwise change the attributes of the draggable task
            //if its currently todo, then assign userid and put to inProgress
            //if its currently inProgress and moved to todo, then set userId to null and change to todo
            //if its in progress and moves to completed then just change the status
            if (tasks[j].taskId === reference.props.taskID) {
              tasks[j].userId = this.timelineReferences[
                timelineKeys[i]
              ].current.props.memberID;
              break;
            }
          }

          this.setState({ Task: tasks }, () => {
            this.refreshTasks();
          });
        }
        break;
      }
    }
  };

  getProjectDetails = (callback) => {
    return axios
      .get(`${baseUrl}/api/project/get/${this.state.projectId}`, {})
      .then(
        (res) => {
          this.setState(
            {
              project: res.data,
            },
            () => {
              if (callback && typeof callback === "function") {
                callback();
              }
            }
          );
        },
        (err) => {
          console.log(err);
        }
      );
  };

  render() {
    const commonProps = {
      apiBaseUrl: baseUrl,
      projectId: this.state?.project?.projectId,
      getProjectDetails: this.getProjectDetails,
    };
    return (
      <Layout title={this.state?.project?.projectName}>
        <div style={{ minHeight: "90vh", marginBottom: 70 }}>
          <Container className="mt-5 mb-5">
            <ProjectDetails
              projname={this.state.project.projectName}
              description={this.state.project.Description}
              duration={this.state.project.Duration}
              projectLink={this.state.project.projectId}
              {...commonProps}
            />
            <h2 className={`${styles.h2} mb-4`}>The Team</h2>
            <div className="d-flex mb-3">
              {this.state.project.Member.map((member, index) => {
                return (
                  <TeamMember
                    key={index}
                    name={member.name}
                    email={member.email}
                    git={member.github}
                    phone={member.phone}
                  ></TeamMember>
                );
              })}
            </div>
            <Button
              color="secondary mt-2"
              className={`btn-brand1 ${styles.add}`}
              onClick={this.toggleAddMemberModal}
            >
              <FontAwesomeIcon icon={faPlus} width={18} className="mr-2" />
              Add Member
            </Button>
            <h2 className={styles.h2}>Tasks and Timeline</h2>
            <p className="small text-muted mb-4 mt-2">
              <FontAwesomeIcon
                icon={faInfoCircle}
                width={18}
                className="mr-2"
              />
              Drag and drop tasks to assign them. Drag timeline to move it.
            </p>
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
              documents={this.state.project.Document}
              className="mt-5 pt-4"
              {...commonProps}
            />
          </Container>

          <div>
            <this.renderCreateMemberModal />
            <this.renderAddTaskModal />
          </div>
        </div>
      </Layout>
    );
  }

  assignTask(userId) {
    const projectId = this.state.project.projectId;
    let startTime = Math.round(new Date().getTime() / 1000);
    axios
      .post(`${baseUrl}/api/tasks/assign`, {
        projectId: projectId,
        userId: userId,
        startTime: startTime,
      })
      .then(
        (res) => {
          this.setState({
            project: res.data,
          });
        },
        (err) => {
          console.log(err);
        }
      );
  }
  editTask(taskId, title, duration, durationType, description) {
    const projectId = this.state.project.projectId;
    if (durationType === 0) {
      duration = duration * 3600;
    } else {
      duration = duration * 86400;
    }
    axios
      .post(`${baseUrl}/api/tasks/assign`, {
        projectId: projectId,
        taskId: taskId,
        duration: duration,
        title: title,
        description: description,
      })
      .then(
        (res) => {
          this.setState({
            project: res.data,
          });
        },
        (err) => {
          console.log(err);
        }
      );
  }
  setStatusToDO(taskId){
    const projectId = this.state.project.projectId;
    axios
      .post(`${baseUrl}/api/tasks/assign`, {
        projectId: projectId,
        userId: "",
        taskId: taskId,
        status: "todo"
      })
      .then(
        (res) => {
          this.setState({
            project: res.data,
          });
        },
        (err) => {
          console.log(err);
        }
      );
  }
  compeleteTask(userId) {
    const projectId = this.state.project.projectId;
    axios
      .post(`${baseUrl}/api/tasks/complete`, {
        projectId: projectId,
        userId: userId,
      })
      .then(
        (res) => {
          this.setState({
            project: res.data,
          });
        },
        (err) => {
          console.log(err);
        }
      );
  }
  deleteTask(taskId) {
    const projectId = this.state.project.projectId;
    axios
      .post(`${baseUrl}/api/tasks/delete`, {
        projectId: projectId,
        taskId: taskId,
      })
      .then(
        (res) => {
          this.setState({
            project: res.data,
          });
        },
        (err) => {
          console.log(err);
        }
      );
  }
}

export default AppPage;
