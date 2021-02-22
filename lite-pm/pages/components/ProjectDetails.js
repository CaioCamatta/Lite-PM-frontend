import { Component } from "react";
import styles from "../../styles/ProjectDetails.module.css";

export default class ProjectDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1 className={styles.h1}>{this.props.projname}</h1>
        <div className={styles.date}>
          Duration: {this.props.duration} day
          {this.props.duration > 1 ? "s" : ""}.
        </div>
        <div className={styles.description}>{this.props.description}</div>
        <div className="mt-2 d-inline-block">
          <div className={styles.projectLink}>Project Link:</div>
          <div className={styles.link}>
            <a href={`https://LitePM.com/project/${this.props.projectLink}`}>
              https://LitePM.com/project/{this.props.projectLink}
            </a>
          </div>
        </div>
      </div>
    );
  }
}
