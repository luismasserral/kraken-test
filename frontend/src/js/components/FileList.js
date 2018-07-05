import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { fetchFiles } from '../actions/index';
import FileListItem from './FileListItem';

const mapStateToProps = state => ({
  files: state.files,
});

const mapDispatchToProps = dispatch => ({
  fetchFiles: () => dispatch(fetchFiles()),
});

class ConnectedFileList extends Component {
  componentDidMount() {
    this.props.fetchFiles();
  }

  render() {
    const { props } = this;

    const classes = classNames('files-list', {
      hidden: !props.files.length,
    });

    return (
      <ul className={classes}>
        {props.files.map(el => <FileListItem file={el} key={el.name} />)}
      </ul>
    );
  }
}

const FileList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedFileList);

ConnectedFileList.propTypes = {
  files: PropTypes.array.isRequired,
  fetchFiles: PropTypes.func.isRequired,
};

export default FileList;
