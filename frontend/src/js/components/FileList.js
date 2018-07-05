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
  constructor(props) {
    super(props);

    this.state = {
      filter: '',
    };

    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchFiles();
  }

  handleFilterChange(event) {
    this.setState({ filter: event.target.value });
  }

  render() {
    const { handleFilterChange, props, state } = this;
    const emptyList = props.files.length === 0;

    const listClasses = classNames('files-list', {
      hidden: emptyList,
    });

    return (
      <div className="file-list-wrapper">
        <input
          className={emptyList ? 'hidden' : null}
          onChange={handleFilterChange}
          placeholder="Filter by name or extension..."
          type="text"
          value={state.filter}
        />
        <ul className={listClasses}>
          {props.files.map(el => <FileListItem file={el} key={el.name} filter={state.filter} />)}
        </ul>
      </div>
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
