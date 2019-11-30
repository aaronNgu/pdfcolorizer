import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FilePond ,registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import 'filepond/dist/filepond.min.css';
import { Document, Page } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css';


registerPlugin(FilePondPluginFileValidateType,FilePondPluginImagePreview);

function App() {


  return (
    <div className="App">
      <header className="App-header">
        <h1>PDFColorizer</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Upload your file below
        </p>
        
      </header>
        <FilePond acceptedFileTypes = {['application/pdf', 'image/png', 'image/jpg', 'image/jpeg']}>  
        </FilePond>
  </div>
  );
}

export default App;
