import { Component } from "react";
import styles from "../../styles/ProjectDetails.module.css";

export default class ProjectDetails extends Component {
  render() {
    return (
      <div>
        <h1 className={styles.h1}>Project Name</h1>
        <div className={styles.date}>Feb 16, 2021 to Feb 20, 2021</div>
        <div className={styles.description}>
          Awesome Description Pellentesque feugiat facilisis nisi, eget posuere
          nisl condimentum ut. Vestibulum ut nisl a sapien sagittis tristique et
          a nibh. Integer blandit ut sem vel varius. Donec vel purus eget turpis
          pulvinar faucibus sit amet a risus. Ut ornare pharetra cursus. Ut
          rhoncus mollis mattis. Nam laoreet sollicitudin lacus sed fermentum.
        </div>
        <div className="mt-2">
          <div className={styles.projectLink}>Project Link:</div>
          <div className={styles.link}>
            https://lite-pm.vercel.app/yourUniqueId
          </div>
        </div>
      </div>
    );
  }
}
