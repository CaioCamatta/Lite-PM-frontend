import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

export function ProjectDoc(props) {
  return (
    <div className="mx-2 mb-3 shadow-md rounded-lg">
      <a target="_blank" href={props.url} className="text-decoration-none">
        <div className="w-100 px-3 py-2 text-dark d-flex">
          <span className="font-weight-bold pl-2">{props.name}</span>
          <span className="overflow-hidden small ml-3 my-auto text-muted">
            {props.url}
          </span>
          <FontAwesomeIcon
            icon={faExternalLinkAlt}
            className="ml-2 ml-auto my-auto small"
          />
        </div>
      </a>
    </div>
  );
}

export default class ProjectDocuments extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={this.props.className}>
        <h3 className="mb-3">Documents</h3>
        {this.props.documents?.map((document, i) => (
          <ProjectDoc key={i} name={document.name} url={document.url} />
        ))}
      </div>
    );
  }
}
