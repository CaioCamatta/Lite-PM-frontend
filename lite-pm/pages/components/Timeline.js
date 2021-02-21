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

  render() {
    return (
      <div>
        <div className={styles.todoContainer} ref={this.todoRef}>
          {this.props.todoTasks.map((task) => {
            let taskRef = React.createRef();
            this.props.addTaskReference(task.taskID, taskRef);

            return (
              <Task
                taskID={task.taskID}
                handleStop={this.props.handleStop}
                key={task.key}
                name={task.name}
                description={task.description}
                duration={task.description}
                durationType={task.durationType}
                ref={taskRef}
                assignee={task.assignee}
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
          {this.props.project.members.map((member) => {
            let timelineRef = React.createRef();
            this.props.addTimelineReference(member.memberID, timelineRef);
            return (
              <MemberTimeline
                key={uuid()}
                memberID={member.memberID}
                name={member.name}
                ref={timelineRef}
                tasks={member.taskList.map((task) => {
                  let taskRef = React.createRef();
                  this.props.addTaskReference(task.taskID, taskRef);
                  return (
                    <Task
                      taskID={task.taskID}
                      handleStop={this.props.handleStop}
                      key={task.key}
                      name={task.name}
                      description={task.description}
                      duration={task.description}
                      durationType={task.durationType}
                      ref={taskRef}
                      assignee={task.assignee}
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
