import { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styles from "../../styles/Task.module.css";

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
      durationType: this.props.durationType
    };
  }

  toggleDisplayTask = () => {
    this.setState({ displayTask: !this.state.displayTask });
  };

  render() {
    return (
      <div>
        <Button className={styles.box} onClick={this.toggleDisplayTask}>
          <div className={styles.contents}>
            {this.state.name}
          </div>
        </Button>
        <Modal isOpen={this.state.displayTask} toggle={this.toggleDisplayTask}>
          <ModalHeader>{this.state.name}</ModalHeader>
          <ModalBody className="text-center">
            {this.state.description}
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.toggleDisplayTask}>
              Ok
            </Button>       
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
