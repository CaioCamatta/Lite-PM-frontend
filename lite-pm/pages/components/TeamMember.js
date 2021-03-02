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
      <div className={`${styles.box} p-1 pr-2 shadow-sm`}>
        <div className={styles.title}>{this.state.displayName}</div>
        <div className={styles.contents}>
          {this.state.displayEmail === "Email"
            ? "‏‏‎ ‎"
            : this.state.displayEmail}
        </div>
        <div className={styles.contents}>
          {/* This is API should not be populating displayPhone with "Phone Number when people dont enter a phone number" */}
          {this.state.displayPhone === "Phone Number"
            ? "‏‏‎ ‎"
            : this.state.displayPhone}
        </div>
        <div className={styles.contents}>
          {this.state.displayGit === "Github Link"
            ? "‏‏‎ ‎"
            : this.state.displayGit}
        </div>
      </div>
    );
  }
}
