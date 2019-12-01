import React from 'react';
import axios from 'axios';
import './App.css';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import 'filepond/dist/filepond.min.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { Document, Page, pdfjs } from "react-pdf";

import { ClipLoader } from 'react-spinners';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


class App extends React.Component {

  constructor() {
    super();

    this.state = {
      files: null,
      numPages: null,
      pageNumber: 1,
      startProcessing: false,
      finishProcessing: false,
      procesedFilePath: ''
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
  }

  getProcessedFile = () => {
    axios.get('http://localhost:5000/processed')
      .then((response) => {
        const procesedFile = new FormData()
        this.setState({
          finishProcessing: true,
          procesedFilePath: '/processed/' + this.state.files[0].name
        })
      })
  }

  onClickHandler = () => {
    const data = new FormData()
    this.setState({
      startProcessing: true
    })

    data.append('file', this.state.files[0])
    axios.post("http://localhost:5000/upload", data, {
      // receive two    parameter endpoint url ,form data
    })
      .then(res => { // then print response status
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
                file={this.state.procesedFilePath}
                onLoadSuccess={this.onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} />
              </Document>
              <Fab color="secondary" aria-label="backArrow" onClick={() => (this.setState({ pageNumber: pageNumber - 1 }))}>
                <ArrowBackIosIcon />
              </Fab>
              <p>Page {pageNumber} of {numPages}</p>
              <Fab color="secondary" aria-label="forwardArrow" onClick={() => (this.setState({ pageNumber: pageNumber + 1 }))}>
                <ArrowForwardIosIcon />
              </Fab>

            </div>
        }
      </div>
    );
  }
}

export default App;
