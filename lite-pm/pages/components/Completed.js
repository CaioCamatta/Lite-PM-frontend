import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styles from "../../styles/Completed.module.css";
import Task from "./Task";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import uuid from "react-uuid";

export default class Completed extends Component {
  constructor(props) {
    super(props);
    this.childRef = React.createRef();
  }

  render() {
    return (
      <div className={`p-1 px-2 ${styles.todoContainer}`}  ref={this.childRef}>
        {this.props.tasks}
      </div>
    );
  }
}
