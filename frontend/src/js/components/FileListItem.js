import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getHumanFileSize } from "../helpers/file";
import { removeFile } from "../actions/index";

const mapDispatchToProps = dispatch => {
  return {
    removeFile: (file) => dispatch(removeFile(file.name))
  };
};

class ConnectedFileListItem extends Component {
  constructor(props) {
    super(props);

    this.doRemoveFile = this.doRemoveFile.bind(this);
  }

  doRemoveFile() {
    this.props.removeFile(this.props.file);
  }

  render() {
    const { doRemoveFile } = this;
    const { file, key } = this.props;

    return (
      <li key={key}>
        <div className="file-info">
          <span className="name" title={file.name}>{file.name}</span>
          <span className="size">{getHumanFileSize(file.size)}</span>
        </div>
        <a className="btn btn-default" onClick={doRemoveFile}>
          Delete
        </a>
      </li>
    );
  }
}

const FileListItem = connect(
  null,
  mapDispatchToProps
)(ConnectedFileListItem);

ConnectedFileListItem.propTypes = {
  file: PropTypes.object.isRequired,
  removeFile: PropTypes.func.isRequired
};

export default FileListItem;
