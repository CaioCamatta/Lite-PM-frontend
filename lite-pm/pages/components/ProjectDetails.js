import { Component } from "react";
import styles from "../../styles/ProjectDetails.module.css";

export default class ProjectDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      projectName: this.props.projname,
      projectDescription: this.props.description,
      projectDuration : this.props.duration,
      projectLink : `lite-pm.com/project/${this.props.projectLink}`
    };
  }
  render() {
    return (
      <div>
        <h1 className={styles.h1}>{this.state.projectName}</h1>
        <div className={styles.date}>{this.state.projectDuration}</div>
        <div className={styles.description}>
          {this.state.projectDescription}
        </div>
        <div className="mt-2">
          <div className={styles.projectLink}>Project Link:</div>
          <div className={styles.link}>
            {this.state.projectLink}
          </div>
        </div>
      </div>
    );
  }
}
