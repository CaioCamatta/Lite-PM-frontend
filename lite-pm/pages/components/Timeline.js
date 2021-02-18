import { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup } from "reactstrap";
import styles from "../../styles/Timeline.module.css";
import Task from "./Task";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
          color="secondary"
          className={styles.addTask}
          onClick={this.toggleAddTaskModal}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Task
        </Button>,
      ],
    };
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "number" ? target.number : target.value;
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
        name={this.state.taskName}
        description={this.state.taskDescription}
        duration={this.state.taskDuration}
        durationType={this.state.taskDurationType}
      ></Task>
    );
    tempTasks.push(
      <Button
        color="secondary"
        className={styles.addTask}
        onClick={this.toggleAddTaskModal}
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Add Task
      </Button>
    );
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
        <div>
          <this.renderAddTaskModal />
        </div>
      </div>
    );
  }
}
