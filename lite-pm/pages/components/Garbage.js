import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styles from "../../styles/Garbage.module.css";
import Task from "./Task";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import uuid from "react-uuid";

export default class Garbage extends Component {
  constructor(props) {
    super(props);
    this.childRef = React.createRef();
  }

  render() {
    return (
      <div className={styles.container} ref={this.childRef}>   
          <FontAwesomeIcon width={18} icon={faTrash} className="mr-2 text-muted"/>   
      </div>
    );
  }
}
