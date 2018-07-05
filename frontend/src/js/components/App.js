import React from "react";
import FileUpload from "./FileUpload"
import FileList from "./FileList"

import '../../styles/main.css';
import logo from '../../assets/logo.png';

const App = () => (
  <div className="wrapper">
    <div className="row">
      <div className="col header">
        <img src="/assets/logo.png" />
        <h1>Kraken Test - File Upload</h1>
      </div>
    </div>
    <FileUpload />
    <FileList />
  </div>
);

export default App;
