import React from 'react';
import axios from 'axios';
import './App.css';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import 'filepond/dist/filepond.min.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

import { ClipLoader } from 'react-spinners';

import Button from '@material-ui/core/Button';

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      files: null,
      processing: false
    }
  }

  onUpdateFiles = fileItems => {
    this.setState({
      files: fileItems.map(fileItem => fileItem.file)
    })
    console.log(this.state.files[0])
  }

  onClickHandler = () => {
    const data = new FormData()
    this.setState({
      processing: true
    })
    data.append('file', this.state.files[0])
    axios.post("http://localhost:5000/upload", data, {
      // receive two    parameter endpoint url ,form data
    })
      .then(res => { // then print response status
        console.log(res.statusText)
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
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
        {(!this.state.processing) ?
          <Button color='primary' variant="contained" onClick={this.onClickHandler}>Process</Button> 
          :
          <ClipLoader
          sizeUnit={"px"}
          size={150}
          color={'#123abc'}
          loading={this.state.processing}
        />
          }
  
      </div>
    )
  }
}

export default App;
