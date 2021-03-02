import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styles from "../../styles/MemberTimeline.module.css";
import Task from "./Task";

export default class MemberTimeline extends Component {
  constructor(props) {
    super(props);
    this.childRef = React.createRef();
  }

  // We need to make task.startDate and task.duration integers in the database, not strings
  render() {
    const spanTimestamp = this.props.rightTimestamp - this.props.leftTimestamp;
    return (
      <div className={styles.timelineContainer} ref={this.props.reference}>
        <div className={styles.name}>{this.props.name}</div>
        <div className={styles.timeline} ref={this.childRef}>
          <div
            className="position-relative rounded-xl"
            style={{ height: 35 }}
          >
            {this.props.tasks?.map((task, index) => {
              let taskRef = React.createRef();
              this.props.addTaskReference(task.taskId, taskRef);
              return (
                <Task
                  handleStop={this.props.handleStop}
                  name={task.title}
                  taskID={task.taskId}
                  key={index}
                  description={task.description}
                  duration={task.duration}
                  timelineScope={this.props.timelineScope}
                  className="position-absolute mt-0"
                  ref={taskRef}
                  assignee={task.userId}
                  status={task.status}
                  left={`${
                    ((parseInt(task.startTime) -
                      this.props.leftTimestamp) *
                      100) /
                    spanTimestamp
                  }%`}
                  width={`${
                    (parseInt(task.duration) * 1000 * 100) / spanTimestamp
                  }%`}
                ></Task>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}