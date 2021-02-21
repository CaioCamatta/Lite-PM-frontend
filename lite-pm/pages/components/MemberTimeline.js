import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styles from "../../styles/MemberTimeline.module.css";

export default class MemberTimeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      tasks: this.props.tasks,
    };
    this.childRef = React.createRef();
  }

  render() {
    return (
      <div className={styles.timelineContainer} ref={this.childRef}>
        <div className={styles.name}>{this.state.name}</div>
        <div className={styles.timeline}>
          <div>{this.state.tasks}</div>
        </div>
      </div>
    );
  }
}
