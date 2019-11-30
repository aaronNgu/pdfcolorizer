import React from 'react';
import axios from 'axios';
import './App.css';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import 'filepond/dist/filepond.min.css';
import { Document, Page } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css';

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      selectedFile: null
    }
  }

  onChangeHandler = event => {
    console.log(event.target.files[0])
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  onClickHandler = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile)
    axios.post("http://localhost:5000/upload", data, {
      // receive two    parameter endpoint url ,form data
    })
      .then(res => { // then print response status
        console.log(res.statusText)
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>PDFColorizer</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Upload your file below
        </p>

        </header>
        <FilePond acceptedFileTypes={['application/pdf', 'image/png', 'image/jpg', 'image/jpeg']}>
        </FilePond>
      </div>
    )
  }

}

export default App;
