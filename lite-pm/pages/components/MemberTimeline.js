import { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styles from "../../styles/MemberTimeline.module.css";

export default class MemberTimeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name
    };
  }

  

  render() {
    return (
      <div className={styles.timelineContainer}>
          <div className={styles.name}>{this.state.name}</div>
          <div className={styles.timeline}></div>
      </div>

    );
  }
}