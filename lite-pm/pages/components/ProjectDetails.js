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
        <div className={styles.date}>{this.props.duration}</div>
        <div className={styles.description}>
          {this.props.description}
        </div>
        <div className="mt-2">
          <div className={styles.projectLink}>Project Link:</div>
          <div className={styles.link}>lite-pm.com/project/{this.props.projectLink}</div>
        </div>
      </div>
    );
  }
}
