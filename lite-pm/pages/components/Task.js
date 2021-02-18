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
      name: "Create this Timeline wohooooooooooooooo",
      description:
        "Awesome Description Pellentesque feugiat facilisis nisi, eget posuere nisl condimentum ut. Vestibulum ut nisl a sapien sagittis tristique et a nibh. Integer blandit ut sem vel varius. Donec vel purus eget turpis pulvinar faucibus sit amet a risus. Ut ornare pharetra cursus. Ut rhoncus mollis mattis. Nam laoreet sollicitudin lacus sed fermentum.",
      currentState: "test",
      assignee: "test",
      duration: 3,
      displayTask: false,
      durationType: 0
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
