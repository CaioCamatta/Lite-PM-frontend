import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styles from "../../styles/Task.module.css";

import Draggable from "react-draggable";


export default class Task extends Component {
  //create nice boxes, all must be same size - on click open up display modal for task showing all details
  //figure out how to have them nicely space in container
  //include a state for to do/ complete and in progress
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      description: this.props.description,
      currentState: "unclaimed",
      assignee: "test",
      duration: this.props.duration,
      displayTask: false,
      durationType: this.props.durationType,
    };

    this.childRef = React.createRef();
  }

  toggleDisplayTask = () => {
    this.setState({ displayTask: !this.state.displayTask });
  };

  

  render() {
    return (
      <Draggable defaultPosition={{x: 0, y: 0}} onStop={this.props.handleStop} >
        <div ref={this.childRef}>
          <Button  dataindex={this.props.taskID} className={styles.box} onClick={this.toggleDisplayTask} disabled={true}>
            <div className={styles.contents}>{this.state.name}</div>
          </Button>
          <Modal
            isOpen={this.state.displayTask}
            toggle={this.toggleDisplayTask}
          >
            <ModalHeader>{this.state.name}</ModalHeader>
            <ModalBody className="text-center">
              {this.state.description}
              <div className="d-flex">
                Duration: {this.state.duration}
                {this.state.durationType === 0 ? (
                  <div className="ml-1">Hours</div>
                ) : (
                  <div>Days</div>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={this.toggleDisplayTask}>
                Ok
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </Draggable>
    );
  }
}
