import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styles from "../../styles/Todo.module.css";
import Task from "./Task";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import uuid from "react-uuid";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.childRef = React.createRef();
  }

  render() {
    return (
      <div className={styles.todoContainer} ref={this.childRef}>
        {this.props.tasks}
        <Button
          key={uuid()}
          color="secondary"
          className={styles.addTask}
          onClick={this.props.addTaskModal}
          assignee={-1}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" width={18} />
          Add Task
        </Button>
      </div>
    );
  }
}
