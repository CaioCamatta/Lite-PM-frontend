import { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styles from "../../styles/MemberTimeline.module.css";
import Task from "./Task";

export default class MemberTimeline extends Component {
  constructor(props) {
    super(props);

    // Replace leftTimestamp and rightTimestamp with
    //    parameters from parent once Caleb is done the changes
    const DAY_AND_HALF = 1000 * 60 * 60 * 36;

    const leftTimestamp = Date.now() - DAY_AND_HALF;
    const rightTimestamp = Date.now() + DAY_AND_HALF;

    this.state = {
      name: this.props.name,
      leftTimestamp: leftTimestamp,
      rightTimestamp: rightTimestamp,
      spanTimestamp: rightTimestamp - leftTimestamp,
    };
  }

  render() {
    return (
      <div className={styles.timelineContainer}>
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
