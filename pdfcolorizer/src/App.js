import React from 'react';
import axios from 'axios';
import './App.css';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import 'filepond/dist/filepond.min.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
'react-pdf/build/entry.noworker'
import { Document, Page } from 'react-pdf';

import { ClipLoader } from 'react-spinners';

import Button from '@material-ui/core/Button';

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      files: null,
      numPages: null,
      pageNumber: 1,
      startProcessing: false,
      finishProcessing: false,
      processedFile: null
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

  getProcessedFile = () => {
    axios.get('http://localhost:5000/processed')
      .then((response) => {
        this.setState({
          finishProcessing: true
        })
        console.log(response);
      })
  }

  onClickHandler = () => {
    const data = new FormData()
    this.setState({
      startProcessing: true,

    })

    data.append('file', this.state.files[0])
    axios.post("http://localhost:5000/upload", data, {
      // receive two    parameter endpoint url ,form data
    })
      .then(res => { // then print response status
        console.log(res.statusText)
        this.getProcessedFile()
      })
      .catch(error => {
        console.log(error)
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
        </header>
        <FilePond
          files={this.state.files}
          allowMultiple={false}
          acceptedFileTypes={['application/pdf', 'image/png', 'image/jpg', 'image/jpeg']}
          onupdatefiles={this.onUpdateFiles}
        />
        {(!this.state.startProcessing) ?
          <Button color='primary' variant="contained" onClick={this.onClickHandler}>Process</Button>
          :
          (!this.state.finishProcessing) ?
            <ClipLoader
              sizeUnit={"px"}
              size={100}
              color={'#123abc'}
              loading={this.state.processing} />
            :
            <div>
            <Document
              file={this.state.files[0]}
              onLoadSuccess={this.onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
            <p>Page {pageNumber} of {numPages}</p>
          </div>
        }
      </div>
    );
  }
}

export default App;
