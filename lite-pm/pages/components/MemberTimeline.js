import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styles from "../../styles/MemberTimeline.module.css";
import Task from "./Task";

export default class MemberTimeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      leftTimestamp: props.leftTimestamp,
      rightTimestamp: props.rightTimestamp,
      spanTimestamp: props.rightTimestamp - props.leftTimestamp,
    };
    this.childRef = React.createRef();
  }

  render() {
    return (
      <div className={styles.timelineContainer} ref={this.childRef}>
        <div className={styles.name}>{this.state.name}</div>
        <div className={styles.timeline} ref={this.props.reference}>
          <div
            className="position-relative overflow-hidden rounded-xl"
            style={{ height: 35 }}
          >
            {this.props.tasks.map((task) => {
              return (
                <Task
                  name={new Date(task.startDate * 1000).getHours()}
                  key={task.taskId}
                  description={task.description}
                  duration={task.duration}
                  durationType={this.state.taskDurationType}
                  className="position-absolute mt-0"
                  left={`${
                    ((task.startDate * 1000 - this.state.leftTimestamp) * 100) /
                    this.state.spanTimestamp
                  }%`}
                  width={`${
                    (task.duration * 1000 * 100) / this.state.spanTimestamp
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
