import React, { Component } from "react";
import styles from "../../styles/Completed.module.css";

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
