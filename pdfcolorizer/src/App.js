import React from 'react';
import axios from 'axios';
import './App.css';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import 'filepond/dist/filepond.min.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { Document, Page } from 'react-pdf';
import PdfPreview from "react-pdf-preview";


registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      files: null,
      numPages: null,
      pageNumber: 1,
    }
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
    console.log(numPages);
  }

  onChangeHandler = event => {
    console.log(event.target.files[0])
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  onUpdateFiles = fileItems => {
    this.setState({
      files: fileItems.map(fileItem => fileItem.file)
    })
    console.log(this.state.files[0])
  }

  onClickHandler = () => {
    const data = new FormData()
    data.append('file', this.state.files[0])
    axios.post("http://localhost:5000/upload", data, {
      // receive two    parameter endpoint url ,form data
    })
      .then(res => { // then print response status
        console.log(res.statusText)
      })
  }

  render() {

    const { pageNumber, numPages } = this.state;
    return (
    
      <div className="App">
        <header className="App-header">
          <h1>PDFColorizer</h1>
          <p>
            Upload your file below
        </p>
        <div>
        <Document
          file="https://www.students.cs.ubc.ca/~cs-221/2019W1/lectures/slides/WE/lec16/lec16.pdf"
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
        </div>

        </header>
        <FilePond
          ref={ref => this.pond = ref}
          server='http://localhost:5000/upload'
          files={this.state.files}
          allowMultiple={false}
          acceptedFileTypes={['application/pdf', 'image/png', 'image/jpg', 'image/jpeg']}
          onupdatefiles={this.onUpdateFiles}
        />

        <button type="button" onClick={this.onClickHandler}>Upload</button> 

      </div>
    )
  }
}

export default App;
