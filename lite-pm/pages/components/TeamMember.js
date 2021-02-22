import { Component } from "react";
import styles from "../../styles/TeamMember.module.css";

export default class TeamMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: this.props.name,
      displayEmail: this.props.email,
      displayGit: this.props.git,
      displayPhone: this.props.phone,
    };
  }

  render() {
    return (
      <div className={`${styles.box} p-1 pr-2`}>
        <div className={styles.title}>{this.state.displayName}</div>
        <div className={styles.contents}>{this.state.displayEmail}</div>
        <div className={styles.contents}>{this.state.displayGit}</div>
        <div className={styles.contents}>{this.state.displayPhone}</div>
      </div>
    );
  }
}
