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
      <div className={styles.timelineContainer} ref={this.childRef}>
        <div className={styles.name}>{this.props.name}</div>
        <div className={styles.timeline} ref={this.props.reference}>
          <div
            className="position-relative rounded-xl"
            style={{ height: 35 }}
          >
            {this.props.tasks?.map((task, index) => {
              task = task.props;
              return (
                <Task
                  name={new Date(parseInt(task.startDate) * 1000).getHours()}
                  key={index}
                  description={task.description}
                  duration={task.duration}
                  durationType={this.props.taskDurationType}
                  className="position-absolute mt-0"
                  left={`${
                    ((parseInt(task.startDate) * 1000 -
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
