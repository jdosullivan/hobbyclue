import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import underscore from 'lodash';

export default class DropZone extends Component {
  constructor(props) {
    super( props );
    this.state = {files: []};
    this._onOpenClick = () => {
      this.onOpenClick();
    };
    this._onDrop = (files) => {
      this.onDrop( files );
    };
  }

  onDrop(files) {
    this.setState( {
      files: [...this.state.files, ...files]
    } );
    console.log( 'Received files: ', files );
  }

  onOpenClick() {
    this.refs.dropzone.open();
  }

  onRemove(file) {
    const updatedFiles = underscore.remove(this.state.files, (currentFile) => { return currentFile.name !== file.name; } );
    this.setState( {
      files: updatedFiles
    } );
  }

  render() {
    const {files} = this.state;
    return (
      <div>
        <Dropzone ref="dropzone" onDrop={this._onDrop}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        <button type="button" onClick={this._onOpenClick}>
          Open Dropzone
        </button>
        {files && <div>
          <h2>Uploading {files.length} files...</h2>
          <div>{files.map( (file) => {
            return (<div key={`img.${file.preview}`}>
                      <img src={file.preview}/>
                      <a onClick={() => { this.onRemove(file); }}>Remove</a>
                    </div>);
          } )}</div>
        </div>}
      </div>
    );
  }
}
