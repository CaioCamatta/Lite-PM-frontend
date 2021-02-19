import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  FormText,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export function ProjectDoc(props) {
  return (
    <div className="mx-2 mb-3 shadow-md rounded-lg  d-flex">
      <a
        target="_blank"
        href={props.url}
        className="text-decoration-none w-100"
      >
        <div className="w-100 pl-3 pr-1 py-2 text-dark d-flex">
          <span className="font-weight-bold pl-2 my-auto">{props.title}</span>
          <span className="overflow-hidden small ml-3 my-auto text-muted">
            {props.url}
            <FontAwesomeIcon
              icon={faExternalLinkAlt}
              className="ml-2 small text-muted"
            />
          </span>
        </div>
      </a>
      <Button
        className="ml-auto my-auto py-2 px-3"
        color="light"
        onClick={() => props.deleteDocument(props.documentId)}
      >
        <FontAwesomeIcon icon={faTrash} className="small text-muted" />
      </Button>
    </div>
  );
}

export default class ProjectDocuments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleCreateDocumentModal: false,
    };
  }

  deleteDocument = (documentId) => {
    axios
      .post(`${this.props.apiBaseUrl}/api/document/delete`, {
        projectId: this.props.projectId,
        documentId: documentId,
      })
      .then(
        (response) => {
          this.toggleCreateDocumentModal();
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  createDocument = () => {
    axios
      .post(`${this.props.apiBaseUrl}/api/document/create`, {
        projectId: this.props.projectId,
        title: this.state.title,
        link: this.state.url,
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: target.value,
    });
  };

  toggleCreateDocumentModal = () => {
    this.setState({
      showCreateDocumentModal: !this.state.showCreateDocumentModal,
    });
  };

  renderCreateDocumentModal = () => {
    return (
      <Modal
        isOpen={this.state.showCreateDocumentModal}
        toggle={this.toggleCreateDocumentModal}
      >
        <ModalHeader>Add Document</ModalHeader>
        <ModalBody>
          <Label for="title">Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            onChange={this.handleChange}
          />
          <Label for="url" className="mt-2">
            Project Link
          </Label>
          <Input type="text" name="url" id="url" onChange={this.handleChange} />
          <FormText color="muted">
            Create your document in Google Docs or MS Office and paste the Share
            link here.
          </FormText>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleCreateDocumentModal}>
            Cancel
          </Button>
          <Button color="success" onClick={this.createDocument}>
            Create Document
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  render() {
    return (
      <div className={this.props.className}>
        <h3 className="mb-3">Documents</h3>
        {this.props.documents?.map((document, i) => (
          <ProjectDoc
            key={i}
            title={document.title}
            url={document.url}
            documentId={document.documentId}
            deleteDocument={this.deleteDocument}
          />
        ))}
        <div className="w-100 d-flex">
          <Button
            onClick={this.toggleCreateDocumentModal}
            className="mx-auto px-3 rounded-xl shadow-sm"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Document
          </Button>
        </div>
        <this.renderCreateDocumentModal />
      </div>
    );
  }
}
