import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonGroup,
} from "reactstrap";
import styles from "../../styles/Timeline.module.css";
import MemberTimeline from "./MemberTimeline";
import Task from "./Task";

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
      memberTimelines: this.props.timelines,
    };
  }

  // This likely needs to be moved @Caleb
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
        <div className={styles.todoContainer} ref={this.todoRef}>
          {this.props?.todoTasks?.map((task) => {
            let taskRef = React.createRef();
            this.props.addTaskReference(task.taskId, taskRef);

            return (
              <Task
                taskID={task.taskId}
                handleStop={this.props.handleStop}
                key={task.key}
                name={task.title}
                description={task.description}
                duration={task.description}
                durationType={task.durationType}
                ref={taskRef}
                assignee={task.userId}
              ></Task>
            );
          })}
          <Button
            key={uuid()}
            color="secondary"
            className={styles.addTask}
            onClick={this.props.addTaskModal}
            assignee={-1}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Task
          </Button>
        </div>
        <div>
          {this.props.project?.Member?.map((member) => {
            let timelineRef = React.createRef();
            this.props.addTimelineReference(member.userId, timelineRef);
            return (
              <MemberTimeline
                key={uuid()}
                memberID={member.userId}
                name={member.name}
                ref={timelineRef}
                tasks={member.taskList?.map((task) => {
                  let taskRef = React.createRef();
                  this.props.addTaskReference(task.taskId, taskRef);
                  return (
                    <Task
                      taskID={task.taskId}
                      handleStop={this.props.handleStop}
                      key={task.key}
                      name={task.title}
                      description={task.description}
                      duration={task.description}
                      durationType={task.durationType}
                      ref={taskRef}
                      assignee={task.userId}
                    ></Task>
                  );
                })}
              ></MemberTimeline>
            );
          })}
        </div>
      </div>
    );
  }
}
