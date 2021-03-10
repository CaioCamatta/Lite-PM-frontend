import React, { Component } from "react";
import { Button } from "reactstrap";
import styles from "../../styles/Task.module.css";
import ReactTooltip from "react-tooltip";

import Draggable from "react-draggable";

let colors = ["#529CCA", "#9A6DD7", "#FFA344", "#4DAB9A", "#FF7369"]

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
    let color = this.props.taskID?.charCodeAt(this.props.taskID.length-1) % colors.length
    this.color = colors[color]
    this.childRef = React.createRef();
  }

  toggleDisplayTask = () => {
    this.setState({ displayTask: !this.state.displayTask });
  };

  render() {
    return (
      <Draggable
        defaultPosition={{ x: 0, y: 0 }}
        onStop={this.props.handleStop}
      >
        <div
          ref={this.childRef}
          className={this.props.className}
          style={{ left: this.props.left, width: this.props.width }}
          dataindex={this.props.taskID}
        >
          <Button className={`w-100 mb-0 px-0 ${styles.box}`} disabled={true} style={{backgroundColor: this.color}}>
            <div
              data-tip
              data-for={this.props.taskID}
              className={styles.contents}
            >
              {this.props.name}
            </div>
          </Button>
          <ReactTooltip
            id={this.props.taskID}
            key={this.props.taskID}
            multiline
          >
            <b>{this.props.name}</b>
            <br />
            {this.props.description}
            <br />
            <i>
              {this.props.timelineScope === "day"
                ? Math.round((this.props.duration * 10) / 60 / 60 / 24) / 10
                : Math.round((this.props.duration * 10) / 60 / 60) / 10}{" "}
              {this.props.timelineScope + "s"}
            </i>
          </ReactTooltip>
        </div>
      </Draggable>
    );
  }
}
