import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonGroup,
} from "reactstrap";
import styles from "../../styles/Timeline.module.css";
import MemberTimeline from "./MemberTimeline";
import Task from "./Task";
import * as _ from "underscore";
import Todo from './Todo'
import Completed from './Completed'
import Garbage from './Garbage'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import uuid from "react-uuid";
import axios from "axios";
const baseUrl = `http://18.218.177.154:5000`;

export default class Timeline extends Component {
  //create nice boxes, all must be same size - on click open up display modal for task showing all details
  //figure out how to have them nicely space in container
  //include a state for to do/ complete and in progress
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.throttledMouseMove = _.throttle(
      this.throttledMouseMove.bind(this),
      60
    );
    this.state = {
      memberTimelines: this.props.timelines,
      timelineScope: "day",
      isScrolling: false,
      clientX: 0,
      scrollX: 0,
      offset: 0,
    };
    this.todoRef = React.createRef();
    this.completedRef = React.createRef();
  }

  roundToNearestHour(timestamp) {
    // Round milliseconds timestamp to nearest hour
    return Math.round(timestamp / (3600 * 1000)) * 3600 * 1000;
  }

  roundToNearestDate(timestamp) {
    // Round milliseconds timestamp to nearest date at midnight
    return Math.round(timestamp / (60 * 60 * 24 * 1000)) * 60 * 60 * 24 * 1000;
  }

  calculateTimeTicks = (offset) => {
    let timeTicks = [];
    let rightTimestamp, leftTimestamp;

    if (this.state.timelineScope == "hour") {
      // When timelineScope is set to Hours, timeline will span three days
      const DAY_AND_HALF = 1000 * 3600 * 36;

      leftTimestamp = this.roundToNearestHour(
        Math.round(Date.now() - DAY_AND_HALF) + offset
      ); // Round to nearest hour
      rightTimestamp = this.roundToNearestHour(
        Math.round(Date.now() + DAY_AND_HALF) + offset
      ); // Round to nearest hour
      const THREE_HOURS = 1000 * 60 * 60 * 3;

      var currTime = leftTimestamp;

      while (currTime < rightTimestamp) {
        timeTicks.push(new Date(currTime).getHours());
        currTime += THREE_HOURS;
      }
    } else if (this.state.timelineScope == "day") {
      // When timelineScope is set to Hours, timeline will span two weeks
      const WEEK = 1000 * 60 * 60 * 24 * 7;

      leftTimestamp = this.roundToNearestDate(
        Math.round(Date.now() - WEEK) + offset
      ); // Round to nearest hour
      rightTimestamp = this.roundToNearestDate(
        Math.round(Date.now() + WEEK) + offset
      ); // Round to nearest hour
      const ONE_DAY = 1000 * 60 * 60 * 24;

      var currTime = leftTimestamp;

      while (currTime < rightTimestamp) {
        timeTicks.push(new Date(currTime).getDate());
        currTime += ONE_DAY;
      }
    }

    return [timeTicks, leftTimestamp, rightTimestamp];
  };

  onMouseDown = (e) => {
    e.preventDefault();
    this.setState({ isScrolling: true, clientX: e.clientX });
  };

  onMouseUp = () => {
    this.setState({ isScrolling: false });
  };

  onMouseMove = (e) => {
    e.persist();
    this.throttledMouseMove(e);
  };

  throttledMouseMove = (e) => {
    const { clientX, scrollX } = this.state;
    if (this.state.isScrolling) {
      this.setState({
        scrollX: scrollX + e.clientX - clientX,
        clientX: e.clientX,
        offset: (scrollX + e.clientX - clientX) * 1000 * 60 * 4,
      });
    }
  };

  render() {
    const [timeTicks, leftTimestamp, rightTimestamp] = this.calculateTimeTicks(
      this.state.offset
    );
    const currentRelativeTime =
      ((Date.now() - leftTimestamp) * 100) / (rightTimestamp - leftTimestamp);
    this.props.addTimelineReference("todoTimeline", this.todoRef)
    this.props.addTimelineReference("completedTimeline", this.completedRef)
    return (
      <div className="overflow-hidden">
        <Todo ref={this.todoRef} addTaskModal={this.props.addTaskModal} tasks={this.props?.todoTasks?.map((task, index) => {
            let taskRef = React.createRef();
            this.props.addTaskReference(task.taskId, taskRef);

            return (
              <Task
                taskID={task.taskId}
                handleStop={this.props.handleStop}
                key={index}
                name={task.title}
                description={task.description}
                duration={task.description}
                durationType={task.durationType}
                ref={taskRef}
                assignee={task.userId}
              ></Task>
            );
          })}></Todo>

        <div
          ref={this.ref}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onMouseMove={this.onMouseMove}
          data-heigth="100px"
          left="12%"
          style={{ cursor: "grabbing" }}
          className={`w-100 pr-2 d-flex justify-content-between position-relative text-muted small mb-2 ${styles.timeTicks}`}
        >
          <span
            className="d-inline-block position-absolute"
            style={{
              height: 19 + 5 + 50.7 * this.props.project?.Member.length,
              width: 2,
              background: "#749ffff0",
              left: `${currentRelativeTime}%`,
            }}
          ></span>
          {timeTicks.map((tick, index) => {
            return <span key={index}>{tick}</span>;
          })}
        </div>
        <div>
          {this.props.project?.Member?.map((member, index) => {
            let timelineRef = React.createRef();
            this.props.addTimelineReference(member.userId, timelineRef);
            return (
              <MemberTimeline
                key={index}
                memberID={member.userId}
                name={member.name}
                ref={timelineRef}
                timeTicks={timeTicks}
                leftTimestamp={leftTimestamp}
                rightTimestamp={rightTimestamp}
                tasks={member.taskList?.map((task) => {
                  let taskRef = React.createRef();
                  this.props.addTaskReference(task.taskId, taskRef);
                  return (
                    <Task
                      taskID={task.taskId}
                      handleStop={this.props.handleStop}
                      key={task.key}
                      name={task.title}
                      description={task.description}
                      duration={task.duration}
                      durationType={task.durationType}
                      startDate={task.startDate}
                      ref={taskRef}
                      assignee={task.userId}
                    ></Task>
                  );
                })}
              ></MemberTimeline>
            );
          })}
        </div>
        <div className={styles.completedHeader}>Completed</div>
        <Completed ref={this.completedRef} tasks={this.props?.completedTasks?.map((task, index) => {
            let taskRef = React.createRef();
            this.props.addTaskReference(task.taskId, taskRef);

            return (
              <Task
                taskID={task.taskId}
                handleStop={this.props.handleStop}
                key={index}
                name={task.title}
                description={task.description}
                duration={task.description}
                durationType={task.durationType}
                ref={taskRef}
                assignee={task.userId}
              ></Task>
            );
          })}></Completed>
          <Garbage></Garbage>
      </div>
    );
  }
}
