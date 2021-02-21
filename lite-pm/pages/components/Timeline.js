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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import uuid from "react-uuid";

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
      timelineScope: "hour",
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

  roundToNearestHour(timestamp) {
    // Round milliseconds timestamp to nearest hour
    return Math.round(timestamp / (3600 * 1000)) * 3600 * 1000;
  }

  roundToNearestDate(timestamp) {
    // Round milliseconds timestamp to nearest date at midnight
    return Math.round(timestamp / (60 * 60 * 24 * 1000)) * 60 * 60 * 24 * 1000;
  }

  calculateTimeTicks = () => {
    let timeTicks = [];
    let rightTimestamp, leftTimestamp;

    if (this.state.timelineScope == "hour") {
      // When timelineScope is set to Hours, timeline will span three days
      const DAY_AND_HALF = 1000 * 3600 * 36;

      leftTimestamp = this.roundToNearestHour(
        Math.round(Date.now() - DAY_AND_HALF)
      ); // Round to nearest hour
      rightTimestamp = this.roundToNearestHour(
        Math.round(Date.now() + DAY_AND_HALF)
      ); // Round to nearest hour
      const THREE_HOURS = 1000 * 60 * 60 * 3;

      var currTime = leftTimestamp;

      while (currTime < rightTimestamp) {
        timeTicks.push(new Date(currTime).getHours());
        currTime += THREE_HOURS;
      }
    } else if (this.state.timelineScope == "day") {
      // When timelineScope is set to Hours, timeline will span two weeks
      const WEEK = 1000 * 60 * 60 * 24 * 7;

      leftTimestamp = this.roundToNearestDate(Math.round(Date.now() - WEEK)); // Round to nearest hour
      rightTimestamp = this.roundToNearestDate(Math.round(Date.now() + WEEK)); // Round to nearest hour
      const ONE_DAY = 1000 * 60 * 60 * 24;

      var currTime = leftTimestamp;

      while (currTime < rightTimestamp) {
        timeTicks.push(new Date(currTime).getDate());
        currTime += ONE_DAY;
      }
    }

    return [timeTicks, leftTimestamp, rightTimestamp];
  };

  addTask = () => {
    this.toggleAddTaskModal();
    let tempTasks = this.state.tasks;
    tempTasks[tempTasks.length - 1] = (
      <Task
        handleStop={this.props.handleStop}
        key={uuid()}
        name={this.state.taskName}
        description={this.state.taskDescription}
        duration={this.state.taskDuration}
        durationType={this.state.taskDurationType}
        reference={this.props.reference}
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
    this.setState({
      tasks: tempTasks,
      taskName: "Name",
      taskDescription: "Description",
      taskDuration: 0,
      taskDurationType: 0,
    });
  };

  render() {
    const timeTicks = this.calculateTimeTicks()[0];

    return (
      <div>
        <div className={styles.todoContainer}>{this.state.tasks}</div>
        <div
          className={`w-100 pr-2 d-flex justify-content-between text-muted small mb-2 ${styles.timeTicks}`}
        >
          {timeTicks.map((tick) => {
            return <span>{tick}</span>;
          })}
        </div>
        <div>{this.state.memberTimelines}</div>
        <div>
          <this.renderAddTaskModal />
        </div>
      </div>
    );
  }
}
