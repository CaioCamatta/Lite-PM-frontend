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
      completedTasks: [],

      timelineScope: "hours",
    };

    this.addTeamMember = this.addTeamMember.bind(this);
    this.toggleAddMemberModal = this.toggleAddMemberModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderCreateMemberModal = this.renderCreateMemberModal.bind(this);

    this.offset = 0;
    this.leftTimestamp = 0;
    this.rightTimestamp = 0;
    this.timeTicks = 0;
  }

  componentDidMount() {
    let project = window.location.href.toString();
    let testcase = project.split("/project/");
    this.setState(
      {
        projectId: testcase[1],
      },
      () => {
        this.getProjectDetails(this.refreshTasks);
      }
    );
  }

  refreshTasks = () => {
    //reset the member task lists

    let wiper = this.state.project.Member;
    for (let i = 0; i < wiper.length; i++) {
      wiper[i].taskList = [];
    }

    this.setState({ Member: wiper, todoTasks: [], completedTasks: [] }, () => {
      let members = this.state.project.Member;
      let todos = this.state.todoTasks;
      let completed = this.state.completedTasks;
      for (let i = 0; i < this.state.project.Task.length; i++) {
        if (this.state.project.Task[i].status === "todo") {
          todos.push(this.state.project.Task[i]);
        } else if (this.state.project.Task[i].status === "completed") {
          completed.push(this.state.project.Task[i]);
        } else {
          for (let j = 0; j < members.length; j++) {
            if (members[j].userId === this.state.project.Task[i].userId) {
              members[j].taskList.push(this.state.project.Task[i]);
              break;
            }
          }
        }
      }

      this.setState(
        {
          Member: members,
          todoTasks: todos,
          completedTasks: completed,
        }
      );
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
          <Button
            color="success"
            disabled={this.state.taskDuration <= 0}
            onClick={this.addTask}
          >
            Add Task
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  addTask = () => {
    this.toggleAddTaskModal();
    let tempTasks = this.state.project.Task;

    //Put the task connection code here!
    if (this.state.taskDurationType === 0) {
      this.state.taskDuration = this.state.taskDuration * 3600;
    } else {
      this.state.taskDuration = this.state.taskDuration * 86400;
    }

    const projectId = this.state.project.projectId;
    axios
      .post(`${baseUrl}/api/tasks/create`, {
        projectId: projectId,
        title: this.state.taskName,
        duration: this.state.taskDuration,
        description: this.state.taskDescription,
      })
      .then((id) => {
        tempTasks.push({
          handleStop: this.handleStop,
          key: uuid(),
          taskId: id.data,
          index: tempTasks.length,
          title: this.state.taskName,
          status: "todo",
          description: this.state.taskDescription,
          duration: this.state.taskDuration,
          durationType: this.state.taskDurationType,
          userId: "",
        });

        this.setState(
          {
            Task: tempTasks,
            taskName: "Name",
            taskDescription: "Description",
            taskDuration: 0,
            taskDurationType: 0,
          },
          () => {
            this.refreshTasks();
            this.getProjectDetails(this.refreshTasks);
          }
        );
      });
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
        this.getProjectDetails(this.refreshTasks);
      });

    this.setState({
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
        <ModalHeader className="modal-header border-0">Add a Team Member</ModalHeader>
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
            cancel
          </Button>
          <Button color="secondary" onClick={this.addTeamMember}>
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
    let index = draggableData.node.attributes.dataindex.value;

    //reference to the task being moved
    let reference = this.taskReferences[index].current;
  
    //arrays of keys to the timelines
    let timelineKeys = Object.keys(this.timelineReferences);

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
        let location = this.findTask(reference);
        if (timelineKeys[i] === "garbage") {
          //delete the task
          let tasks = this.state.project.Task;
          tasks.splice(location, 1);
          this.setState({ Task: tasks }, () => {
            this.refreshTasks();
            this.deleteTask(reference.props.taskID);
          });
          //console.log("garbage");
        }
        //if the task was already there, do nothing (snap back into place)
        else if (
          reference.props.status === "todo" &&
          timelineKeys[i] === "todoTimeline"
        ) {
          this.refreshTasks();
          //console.log("todo to todo");

          //snap task back into place and dont change anything (probs call refresh tasks)
        } else if (
          reference.props.status === "completed" &&
          timelineKeys[i] === "completedTimeline"
        ) {
          this.refreshTasks();
          //console.log("complete to complete");

          //snap task back into place and dont change anything (probs call refresh tasks)
        }
        //if you are moving from todo to somewhere else
        else if (
          reference.props.status === "todo" &&
          timelineKeys[i] != "todoTimeline"
        ) {
          if (timelineKeys[i] === "completedTimeline") {
            let tasks = this.state.project.Task;
            tasks[location].status = "completed";
            this.setState({ Task: tasks }, () => {
              this.refreshTasks();
              this.completeTask(reference.props.taskID);
            });
            //console.log("todo to complete");

            //change status of the task to complete and leave userId
          } else {
            let tasks = this.state.project.Task;
            tasks[location].userId = this.timelineReferences[
              timelineKeys[i]
            ].current.props.memberID;
            let timestamps = this.positionInTimeline(
              reference,
              this.timelineReferences[timelineKeys[i]],
              location
            );
            tasks[location].startTime = timestamps[0];
            tasks[location].status = "inProgress";
            this.setState({ Task: tasks }, () => {
              this.refreshTasks();
              this.assignTask(
                this.timelineReferences[timelineKeys[i]].current.props.memberID,
                reference.props.taskID,
                timestamps[0]
              );
            });
            //console.log("todo to member");

            //set a new userId for the task to the proper memberId and change the status
          }
        }
        //moving from completed to somewhere else
        else if (
          reference.props.status === "completed" &&
          timelineKeys[i] != "completedTimeline"
        ) {
          if (timelineKeys[i] === "todoTimeline") {
            let tasks = this.state.project.Task;

            tasks[location].status = "todo";
            tasks[location].userId = "";
            this.setState({ Task: tasks }, () => {
              this.refreshTasks();
              this.editTask(
                reference.props.taskID,
                reference.props.name,
                reference.props.duration,
                reference.props.durationType,
                reference.props.description,
                "",
                "todo",
                tasks[location].startTime
              ); //editTask(taskId, title, duration, durationType, description, userId, status)
            });
            //console.log("complete to todo");
            
            //change status of the task to complete and set userId to null
          } else {
            let tasks = this.state.project.Task;
            let timestamps = this.positionInTimeline(
              reference,
              this.timelineReferences[timelineKeys[i]],
              location
            );
            tasks[location].startTime = timestamps[0];
            tasks[location].userId = this.timelineReferences[
              timelineKeys[i]
            ].current.props.memberID;
            tasks[location].status = "inProgress";
            this.setState({ Task: tasks }, () => {
              this.refreshTasks();
              this.assignTask(
                this.timelineReferences[timelineKeys[i]].current.props.memberID,
                reference.props.taskID,
                timestamps[0]
              );
            });
            //console.log("complete to member");

            //set a new userId for the task to the proper memberId and change the status
          }
        }
        //moving from member timelines (already have checked all possibilities of it coming from todo or completed, so it must have an assignee at this point)
        else if (
          reference.props.assignee ===
          this.timelineReferences[timelineKeys[i]].current.props.memberID
        ) {
          let tasks = this.state.project.Task;
          let timestamps = this.positionInTimeline(
            reference,
            this.timelineReferences[timelineKeys[i]],
            location
          );
          tasks[location].startTime = timestamps[0];
          this.setState({ Task: tasks }, () => {
            this.refreshTasks();
            this.assignTask(
              this.timelineReferences[timelineKeys[i]].current.props.memberID,
              reference.props.taskID,
              timestamps[0]
            );
            //console.log(this.state.project.Task);
          });
          console.log("member to self");
        }
        //moving from a timeline to anywhere else
        else {
          if (timelineKeys[i] === "todoTimeline") {
            let tasks = this.state.project.Task;
            tasks[location].status = "todo";
            tasks[location].userId = "";
            this.setState({ Task: tasks }, () => {
              this.refreshTasks();
              console.log(reference.props.durationType)
              this.editTask(
                reference.props.taskID,
                reference.props.name,
                reference.props.duration,
                reference.props.durationType,
                reference.props.description,
                "",
                "todo",
                tasks[location].startTime
              ); //FIX THISSSS
            });
            //console.log("member to todo");

            //set userId to null and change status
          } else if (timelineKeys[i] === "completedTimeline") {
            let tasks = this.state.project.Task;
            tasks[location].status = "completed";
            this.setState({ Task: tasks }, () => {
              this.refreshTasks();
              this.completeTask(reference.props.taskID); //FIX THISSSS
            });
            //console.log("member to completed");

            //change status and nothing else
          } else {
            //console.log("member to other member");
            let tasks = this.state.project.Task;
            tasks[location].userId = this.timelineReferences[
              timelineKeys[i]
            ].current.props.memberID;
            let timestamps = this.positionInTimeline(
              reference,
              this.timelineReferences[timelineKeys[i]],
              location
            );
            tasks[location].startTime = timestamps[0];
            this.setState({ Task: tasks }, () => {
              this.refreshTasks();
              this.assignTask(
                this.timelineReferences[timelineKeys[i]].current.props.memberID,
                reference.props.taskID,
                timestamps[0]
              );
            });
            //find the task and set its new userId
          }
        }
      }
    }
  };

  positionInTimeline = (draggable, timeline, location) => {
    //compare x coordinate of draggable with start x and end x of member timeline
    //get relative percent of x that draggable is in timeline
    //use relative x to set the starttime timestamp and to set the endtime timestamp
    //make api call to update this in backend

    let draggableStartX = draggable.childRef.current.getBoundingClientRect().x;
    let draggableEndX =
      draggable.childRef.current.getBoundingClientRect().x +
      draggable.childRef.current.getBoundingClientRect().width;

    let offset = 0;
    let relativePosition = 0;
    //determine where x is relative to the timeline - find percentage that it is across the timeline
    if (
      draggableStartX <=
      timeline.current.childRef.current.getBoundingClientRect().x
    ) {
      offset = 0;
    } else if (
      draggableEndX >=
      timeline.current.childRef.current.getBoundingClientRect().x +
        timeline.current.childRef.current.getBoundingClientRect().width
    ) {
      offset = 1;
    } else {
      let size = timeline.current.childRef.current.getBoundingClientRect()
        .width;
      relativePosition =
        draggableStartX -
        timeline.current.childRef.current.getBoundingClientRect().x;
      offset = relativePosition / size;
    }
    
    let newLeftStamp =
      (this.rightTimestamp - this.leftTimestamp) * offset + this.leftTimestamp;
    let duration = this.state.project.Task[location].duration;
    let newRightStamp =
      (this.rightTimestamp - this.leftTimestamp) * offset +
      this.leftTimestamp +
      duration;
    return [newLeftStamp, newRightStamp];

    //got the left and right timestamp for the task, just need to make the call and put this function everywhere that it needs to be in handlestop method
  };

  updateParentTimelineData = (
    offset,
    timeTicks,
    leftTimestamp,
    rightTimestamp
  ) => {
    this.offset = offset;
    this.leftTimestamp = leftTimestamp;
    this.rightTimestamp = rightTimestamp;
    this.timeTicks = timeTicks;
  };

  findTask = (reference) => {
    for (let i = 0; i < this.state.project.Task.length; i++) {
      if (reference.props.taskID === this.state.project.Task[i].taskId) {
        return i;
      }
    }
    return null;
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
              completedTasks={this.state.completedTasks}
              updateParentTimelineData={this.updateParentTimelineData}
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

  assignTask(userId, taskId, startTime) {
    const projectId = this.state.project.projectId;
    axios
      .post(`${baseUrl}/api/tasks/assign`, {
        projectId: projectId,
        userId: userId,
        startTime: startTime,
        taskId: taskId,
      })
      .then(
        (res) => {
          this.setState(
            {
              project: res.data,
            },
            () => {
              this.refreshTasks();
            }
          );
        },
        (err) => {
          console.log(err);
        }
      );
  }

  editStatusUserId(taskId, status, userId) {
    const projectId = this.state.project.projectId;
    axios
      .post(`${baseUrl}/api/tasks/assign`, {
        projectId: projectId,
        userId: userId,
        taskId: taskId,
        status: status,
      })
      .then(
        (res) => {
          this.setState(
            {
              project: res.data,
            },
            () => {
              this.refreshTasks();
            }
          );
        },
        (err) => {
          console.log(err);
        }
      );
  }

  editTask(
    taskId,
    title,
    duration,
    durationType,
    description,
    userId,
    status,
    startTime
  ) {
    const projectId = this.state.project.projectId;
    // if (durationType === 0) {
    //   duration = duration * 3600;
    // } else {
    //   duration = duration * 86400;
    // }
    axios
      .post(`${baseUrl}/api/tasks/edit`, {
        projectId: projectId,
        taskId: taskId,
        duration: duration,
        title: title,
        userId: userId,
        description: description,
        status: status,
        startTime: startTime,
      })
      .then(
        (res) => {
          this.setState(
            {
              project: res.data,
            },
            () => {
              this.refreshTasks();
            }
          );
        },
        (err) => {
          console.log(err);
        }
      );
  }
  completeTask(taskId) {
    const projectId = this.state.project.projectId;
    axios
      .post(`${baseUrl}/api/tasks/complete`, {
        projectId: projectId,
        taskId: taskId,
      })
      .then(
        (res) => {
          this.setState(
            {
              project: res.data,
            },
            () => {
              this.refreshTasks();
            }
          );
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
          this.setState(
            {
              project: res.data,
            },
            () => {
              this.refreshTasks();
            }
          );
        },
        (err) => {
          console.log(err);
        }
      );
  }
}

export default AppPage;
