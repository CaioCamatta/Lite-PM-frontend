import { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonGroup,
} from "reactstrap";
import styles from "../../styles/Timeline.module.css";
import Task from "./Task";
import MemberTimline from "./MemberTimeline";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import uuid from "react-uuid";

import axios from "axios";
const baseUrl = `http://localhost:5000`;

export default class Timeline extends Component {
  //create nice boxes, all must be same size - on click open up display modal for task showing all details
  //figure out how to have them nicely space in container
  //include a state for to do/ complete and in progress
  constructor(props) {
    super(props);
    this.state = {
      showAddTask: false,
      taskName: "Name",
      taskDescription: "Description",
      taskDuration: 0,
      taskDurationType: 0, //0 for hours, 1 for days
      tasks: [
        <Button
          key={uuid()}
          color="secondary"
          className={styles.addTask}
          onClick={this.toggleAddTaskModal}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Task
        </Button>,
      ],
      memberTimelines: this.props.timelines,
    };
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
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
    let tempTasks = this.state.tasks;
    tempTasks[tempTasks.length - 1] = (
      <Task
        key={uuid()}
        name={this.state.taskName}
        description={this.state.taskDescription}
        duration={this.state.taskDuration}
        durationType={this.state.taskDurationType} //0 for hours 1 for days
      ></Task>
    );
    tempTasks.push(
      <Button
        key={uuid()}
        color="secondary"
        className={styles.addTask}
        onClick={this.toggleAddTaskModal}
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Add Task
      </Button>
    );

    //Put the task connection code here!
    if (this.state.taskDurationType === 0) {
      this.state.taskDuration = this.state.taskDuration * 3600;
    } else {
      this.state.taskDuration = this.state.taskDuration * 86400;
    }

    const projectId = "944f27b6-e6a0-4f2b-af4b-2d3911fc7d76"; //Used for testing need to remove after for production
    axios.post(`${baseUrl}/api/tasks/create`, {
      projectId: projectId,
      title: this.state.taskName,
      duration: this.state.taskDuration,
      description: this.state.taskDescription,
    });

    this.setState({
      tasks: tempTasks,
      taskName: "Name",
      taskDescription: "Description",
      taskDuration: 0,
      taskDurationType: 0,
    });
  };

  render() {
    return (
      <div>
        <div className={styles.todoContainer}>{this.state.tasks}</div>
        <div>{this.state.memberTimelines}</div>
        <div>
          <this.renderAddTaskModal />
        </div>
      </div>
    );
  }
}
