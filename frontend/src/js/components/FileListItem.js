import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getHumanFileSize } from '../helpers/file';
import { removeFile } from '../actions/index';

const mapDispatchToProps = dispatch => ({
  removeFile: file => dispatch(removeFile(file.name)),
});

class ConnectedFileListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };

    this.doRemoveFile = this.doRemoveFile.bind(this);
  }

  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.setState({ show: true });
    }, 10);
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  doRemoveFile() {
    this.props.removeFile(this.props.file);
  }

  render() {
    const { doRemoveFile } = this;
    const { file, filter, key } = this.props;

    const classes = classNames('', {
      show: this.state.show,
      hidden: file.name.indexOf(filter) === -1,
    });

    return (
      <li className={classes} key={key}>
        <div className="file-info">
          <span className="name" title={file.name}>
            {file.name}
          </span>
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
  mapDispatchToProps,
)(ConnectedFileListItem);

ConnectedFileListItem.propTypes = {
  file: PropTypes.object.isRequired,
  removeFile: PropTypes.func.isRequired,
};

export default FileListItem;
