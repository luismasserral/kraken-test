import fetch from 'isomorphic-fetch';
import {
  REQUEST_FILES,
  RECEIVE_FILES,
  UPLOAD_FILE,
  RECEIVE_UPLOADED_FILE,
  DELETE_FILE,
  RECEIVE_DELETED_FILE,
} from '../constants/action-types';

function requestFiles() {
  return {
    type: REQUEST_FILES,
  };
}

function receiveFiles(files) {
  return {
    type: RECEIVE_FILES,
    files,
  };
}

function uploadFile(file) {
  return {
    type: UPLOAD_FILE,
    file,
  };
}

function receiveUploadedFile(file) {
  return {
    type: RECEIVE_UPLOADED_FILE,
    file,
  };
}

function deleteFile(filename) {
  return {
    type: DELETE_FILE,
    filename,
  };
}

function receiveDeleteFile(filename) {
  return {
    type: RECEIVE_DELETED_FILE,
    filename,
  };
}

export function fetchFiles() {
  return (dispatch) => {
    dispatch(requestFiles());

    return fetch('http://localhost:8000/api/files')
      .then(response => response.json())
      .then(json => dispatch(receiveFiles(json)));
  };
}

export function sendFile(file) {
  return (dispatch) => {
    dispatch(uploadFile());

    const data = new FormData();
    data.append('file', file);

    return fetch('http://localhost:8000/api/files', {
      method: 'POST',
      body: data,
    })
      .then(response => response.json())
      .then(json => dispatch(receiveUploadedFile(json)));
  };
}

export function removeFile(filename) {
  return (dispatch) => {
    dispatch(deleteFile(filename));

    const queryString = `filename=${encodeURIComponent(filename)}`;

    return fetch(`http://localhost:8000/api/files?${queryString}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => dispatch(receiveDeleteFile(filename)));
  };
}
