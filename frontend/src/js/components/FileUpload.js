import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isFileValid } from '../helpers/file';
import { sendFile } from '../actions/index';

const mapDispatchToProps = dispatch => ({
  sendFile: file => dispatch(sendFile(file)),
});

class ConnectedFileUpload extends Component {
  constructor() {
    super();

    this.state = {
      file: '',
      inDropZone: false,
      uploading: false,
    };

    this.simulateFileClick = this.simulateFileClick.bind(this);
    this.handleFilesChange = this.handleFilesChange.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.validateFileBeforeUpload = this.validateFileBeforeUpload.bind(this);
  }

  simulateFileClick() {
    this.fileInput.click();
  }

  handleFilesChange(event) {
    event.preventDefault();

    this.validateFileBeforeUpload(event.target.files[0]);
  }

  handleDragOver(e) {
    e.preventDefault();

    if (this.state.inDropZone) {
      return;
    }

    this.setState({ inDropZone: true });
  }

  handleDragLeave() {
    if (!this.state.inDropZone) {
      return;
    }

    this.setState({ inDropZone: false });
  }

  handleDrop(event) {
    event.preventDefault();

    const { dataTransfer } = event;
    let file;

    if (dataTransfer.items) {
      file = dataTransfer.items[0].getAsFile();
    } else {
      ({ file } = dataTransfer.files);
    }

    this.validateFileBeforeUpload(file);
  }

  validateFileBeforeUpload(file) {
    if (isFileValid(file)) {
      this.setState(
        {
          file,
          uploading: true,
        },
        () => {
          this.props.sendFile(file);
        },
      );
    }
  }

  render() {
    const classes = classNames('upload-wrapper', {
      active: this.state.inDropZone,
      uploading: this.state.uploading,
    });

    const dropEvents = {
      onDrop: this.handleDrop,
      onDragOver: this.handleDragOver,
      onDragLeave: this.handleDragLeave,
      onClick: this.simulateFileClick,
    };

    const fileInputAttrs = {
      ref: (input) => {
        this.fileInput = input;
      },
      type: 'file',
      id: 'file',
      onChange: this.handleFilesChange,
      multiple: false,
    };

    return (
      <div className={classes} {...dropEvents}>
        <p>Drag&Drop or click to upload a file</p>
        <input {...fileInputAttrs} />
      </div>
    );
  }
}

const FileUpload = connect(
  null,
  mapDispatchToProps,
)(ConnectedFileUpload);

ConnectedFileUpload.propTypes = {
  sendFile: PropTypes.func.isRequired,
};

export default FileUpload;
